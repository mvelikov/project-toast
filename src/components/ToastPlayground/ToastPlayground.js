import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf/ToastShelf';
import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [state, setState] = React.useState({
    id: '',
    message: '',
    variant: 'notice',
  });
  const [collection, setCollection] = React.useState([]);

  function onClose(id) {
    setCollection(collection.filter((key) => key.id !== id));
  }
  function createToast(message) {
    setState({
      ...state,
      id: Math.random().toString(36).slice(2),
      message: message,
    });
  }
  function changeVariant(variant) {
    setState({ ...state, variant });
  }

  function showToast() {
    if (collection.find((key) => key.id === state.id)) return;
    setCollection([
      ...collection,
      {
        message: state.message,
        variant: state.variant,
        id: state.id,
      },
    ]);
  }
  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf collection={collection} onClose={onClose} />
      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={state.message}
              onChange={(e) => createToast(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variant) => (
              <label htmlFor={`variant-${variant}`} key={variant}>
                <input
                  id={`variant-${variant}`}
                  type="radio"
                  name="variant"
                  value={variant}
                  checked={state.variant === variant}
                  onChange={() => changeVariant(variant)}
                />
                {variant}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={() => showToast()}>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
