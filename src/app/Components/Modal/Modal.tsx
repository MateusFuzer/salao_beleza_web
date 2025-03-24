import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-black opacity-50" 
        onClick={onClose} 
      />

      <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-300 text-black p-2 rounded-full"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
