// frontend/src/api.js
import { notifications } from '@mantine/notifications';

const API_BASE_URL = 'http://localhost:8000'; 

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'File upload failed');
    }
    const data = await response.json();
    notifications.show({
      title: 'Upload Successful',
      message: `${data.original_filename} uploaded successfully!`,
      color: 'teal',
    });
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    notifications.show({
      title: 'Upload Failed',
      message: error.message || 'Failed to upload file.',
      color: 'red',
    });
    throw error;
  }
};

export const savePortfolio = async (userId, portfolioItems) => {
  try {
    const response = await fetch(`${API_BASE_URL}/save-portfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, items: portfolioItems }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save portfolio');
    }
    const data = await response.json();
    notifications.show({
      title: 'Portfolio Saved',
      message: data.message,
      color: 'green',
    });
    return data;
  } catch (error) {
    console.error('Error saving portfolio:', error);
    notifications.show({
      title: 'Save Failed',
      message: error.message || 'Failed to save portfolio.',
      color: 'red',
    });
    throw error;
  }
};

export const loadPortfolio = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/load-portfolio/${userId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to load portfolio');
    }
    const data = await response.json();
    notifications.show({
      title: 'Portfolio Loaded',
      message: data.message || 'Portfolio loaded successfully!',
      color: 'lime',
    });
    return data.items;
  } catch (error) {
    console.error('Error loading portfolio:', error);
    notifications.show({
      title: 'Load Failed',
      message: error.message || 'Failed to load portfolio.',
      color: 'red',
    });
    throw error;
  }
};