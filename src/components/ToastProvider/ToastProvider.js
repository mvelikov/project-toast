import React from 'react';

const ToastContext = React.createContext();

function ToastProvider({ children }) {
  return <ToastContext.Provider value={{}}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
