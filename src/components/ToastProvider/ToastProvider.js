import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [collection, setCollection] = React.useState([]);

  function onClose(id) {
    setCollection(collection.filter((key) => key.id !== id));
  }

  function add(toast) {
    if (collection.find((key) => key.id === toast.id)) return;
    setCollection([
      ...collection,
      {
        message: toast.message,
        variant: toast.variant,
        id: toast.id,
      },
    ]);
  }
  return (
    <ToastContext.Provider value={{ onClose, add, collection }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
