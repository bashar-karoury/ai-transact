// components/ErrorModalContext.js
"use client";

import React, { createContext, useContext, useState } from "react";
import Modal from "./modal";

const ErrorModalContext = createContext();

export function ErrorModalProvider({ children }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");

  const showErrorModal = (message) => {
    setErrorMessage(message);
    setIsModalOpen(true);
    setTitle("Error");
  };

  const showStatusModal = (message) => {
    setErrorMessage(message);
    setIsModalOpen(true);
    setTitle("");
    setTimeout(() => {
      closeModal();
    }, 1000);
  };

  const closeModal = () => {
    setErrorMessage("");
    setIsModalOpen(false);
  };

  return (
    <ErrorModalContext.Provider value={{ showErrorModal, showStatusModal }}>
      {children}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={title}
          message={errorMessage}
        />
      )}
    </ErrorModalContext.Provider>
  );
}

// Custom hook to use the context
export const useErrorModal = () => {
  return useContext(ErrorModalContext);
};
