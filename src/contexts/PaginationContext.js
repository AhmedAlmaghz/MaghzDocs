import React, { createContext, useState } from 'react';

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  return (
    <PaginationContext.Provider value={{ currentPage, setCurrentPage, previousPage, setPreviousPage, nextPage, setNextPage }}>
      {children}
    </PaginationContext.Provider>
  );
};