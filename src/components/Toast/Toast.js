import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ children, variant, id, onClose = () => {} }) {
  let style;
  switch (variant) {
    case 'notice':
      style = styles.notice;
      break;
    case 'warning':
      style = styles.warning;
      break;
    case 'success':
      style = styles.success;
      break;
    case 'error':
      style = styles.error;
      break;
    default:
      throw new Error(`Unrecognized variant: ${variant}`);
  }

  return (
    <div className={`${styles.toast} ${style}`}>
      <div className={styles.iconContainer}>
        {React.createElement(ICONS_BY_VARIANT[variant], { size: 24 })}
      </div>
      <p className={styles.content}>{children}</p>
      <button className={styles.closeButton} onClick={() => onClose(id)}>
        <X size={24} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default Toast;
