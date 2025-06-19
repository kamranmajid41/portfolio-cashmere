# backend/main.py
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles 
from pydantic import BaseModel
from typing import List, Dict
import os
import shutil
import uuid

app = FastAPI()

# Configure CORS to allow requests from your frontend development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "./uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount the uploads directory to serve static files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Simulated in-memory database for portfolios
# In a real application, this would be a database (PostgreSQL, MongoDB, etc.)
# We'll use a dictionary where key is user_id and value is a list of MediaItem
portfolio_db: Dict[str, List['MediaItem']] = {}

class MediaItem(BaseModel):
    id: str
    filename: str # The filename on the server (e.g., UUID.ext)
    original_filename: str # The filename from the user's computer
    media_type: str  # "image" or "video"
    title: str = "" # Added to allow empty string by default
    description: str = "" # Added to allow empty string by default
    category: str = "Uncategorized" # Default category

class Portfolio(BaseModel):
    user_id: str
    items: List[MediaItem]

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Handles file uploads, saves them, and returns metadata."""
    file_id = str(uuid.uuid4())
    file_extension = os.path.splitext(file.filename)[-1]
    new_filename = f"{file_id}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, new_filename)

    media_type = "other"
    if file.content_type.startswith("image/"):
        media_type = "image"
    elif file.content_type.startswith("video/"):
        media_type = "video"
    else:
        raise HTTPException(status_code=400, detail="Only image and video files are allowed.")

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not upload file: {e}")

    # Return the necessary information for the frontend to create a MediaItem
    return JSONResponse(content={
        "id": file_id,
        "filename": new_filename,
        "original_filename": file.filename,
        "media_type": media_type,
        "url": f"/uploads/{new_filename}" # Frontend will use this URL to display
    })

@app.post("/save-portfolio")
async def save_portfolio(data: Portfolio):
    """Saves the entire portfolio for a given user ID."""
    print(f"Saving portfolio for user: {data.user_id}")
    portfolio_db[data.user_id] = data.items
    return {"status": "success", "message": "Portfolio saved successfully!"}

@app.get("/load-portfolio/{user_id}")
async def load_portfolio(user_id: str):
    """Loads a previously saved portfolio for a given user ID."""
    print(f"Loading portfolio for user: {user_id}")
    items = portfolio_db.get(user_id, [])
    return {"items": items, "message": "Portfolio loaded successfully!"}

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Portfolio Backend API!"}