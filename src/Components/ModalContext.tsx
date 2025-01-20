// components/ErrorModalContext.js
"use client";

import React, { createContext, useContext, useState } from "react";
import Modal from "./modal";

const ErrorModalContext = createContext();

export const ErrorModalProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showErrorModal = (message) => {
    setErrorMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setErrorMessage("");
    setIsModalOpen(false);
  };

  return (
    <ErrorModalContext.Provider value={{ showErrorModal }}>
      {children}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Error"
          message={errorMessage}
        />
      )}
    </ErrorModalContext.Provider>
  );
};

// Custom hook to use the context
export const useErrorModal = () => {
  return useContext(ErrorModalContext);
};
