import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { savePortfolio, loadPortfolio } from '../api';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('default_user'); 

  // Group items by category for display
  const categorizedItems = portfolioItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const addMediaItem = useCallback((newItem) => {
    setPortfolioItems((prevItems) => [...prevItems, newItem]);
  }, []);

  const updateMediaItem = useCallback((id, updatedFields) => {
    setPortfolioItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  }, []);

  const removeMediaItem = useCallback((id) => {
    setPortfolioItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const handleSavePortfolio = useCallback(async () => {
    try {
      await savePortfolio(currentUserId, portfolioItems);
    } catch (error) {
      console.error('Error saving portfolio from context:', error);
    }
  }, [currentUserId, portfolioItems]);

  const handleLoadPortfolio = useCallback(async () => {
    try {
      const loadedItems = await loadPortfolio(currentUserId);
      setPortfolioItems(loadedItems);
    } catch (error) {
      console.error('Error loading portfolio from context:', error);
      // If loading fails, clear portfolio to avoid stale data
      setPortfolioItems([]);
    }
  }, [currentUserId]);

  // Load portfolio on initial mount
  useEffect(() => {
    handleLoadPortfolio();
  }, [handleLoadPortfolio]);


  const value = {
    portfolioItems,
    categorizedItems,
    addMediaItem,
    updateMediaItem,
    removeMediaItem,
    handleSavePortfolio,
    handleLoadPortfolio,
    currentUserId,
    setCurrentUserId,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};