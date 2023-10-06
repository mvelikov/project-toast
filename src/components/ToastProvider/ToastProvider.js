import React from 'react';
import { useEscapeKey } from '../../hooks';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [collection, setCollection] = React.useState([]);

  const dismissAll = React.useCallback(() => {
    setCollection([]);
  }, []);
  useEscapeKey(dismissAll);
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

  return (
    <ToastContext.Provider value={{ onClose, create, collection }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
