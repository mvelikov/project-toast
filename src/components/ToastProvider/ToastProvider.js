import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [collection, setCollection] = React.useState([]);

  function onClose(id) {
    setCollection(collection.filter((key) => key.id !== id));
  }

  function create(message, variant) {
    setCollection([
      ...collection,
      {
        message: message,
        variant: variant,
        id: Math.random().toString(36).slice(2),
      },
    ]);
  }

  function dismissAll() {
    setCollection([]);
  }

  return (
    <ToastContext.Provider value={{ onClose, create, collection, dismissAll }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
