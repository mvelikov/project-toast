import React from 'react';

import Button from '../Button';
import { ToastContext } from '../ToastProvider';
import ToastShelf from '../ToastShelf/ToastShelf';
import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  function initToast() {
    return {
      id: '',
      message: '',
      variant: 'notice',
    };
  }
  const [state, setState] = React.useState(initToast());
  const toaster = React.useContext(ToastContext);
  function create(message) {
    setState({
      ...state,
      id: Math.random().toString(36).slice(2),
      message: message,
    });
  }
  function setVariant(variant) {
    setState({ ...state, variant });
  }

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        toaster.dismissAll();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toaster]);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf />
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
              onChange={(e) => create(e.target.value)}
              required
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
                  onChange={() => setVariant(variant)}
                />
                {variant}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button
              onClick={() => {
                toaster.add(state);
                setState(initToast());
              }}
              disabled={!state.message}
            >
              Pop Toast!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
