import React, { createContext, useState } from 'react';

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [currentPageTitle, setCurrentPageTitle] = useState(null);
  const [previousPageTitle, setPreviousPageTitle] = useState(null);
  const [nextPageTitle, setNextPageTitle] = useState(null);

  return (
    <PaginationContext.Provider value={{ currentPage, setCurrentPage, previousPage, setPreviousPage, nextPage, setNextPage,currentPageTitle, setCurrentPageTitle,previousPageTitle, setPreviousPageTitle, nextPageTitle, setNextPageTitle }}>
      {children}
    </PaginationContext.Provider>
  );
};