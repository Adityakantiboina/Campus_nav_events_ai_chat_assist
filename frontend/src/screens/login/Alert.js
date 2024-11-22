// Alert.js
import React from 'react';

const Alert = ({ message, type }) => {
  const alertClasses = {
    error: "bg-red-100 border border-red-400 text-red-700",
    success: "bg-green-100 border border-green-400 text-green-700"
  };

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded text-xl shadow-md ${alertClasses[type]}`}>
      <strong className="font-semibold">{type === 'error' ? 'Error: ' : 'Success: '}</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default Alert;
