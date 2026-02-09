'use client';

import { useApp } from '@/app/lib/context';

export default function AlertContainer() {
  const { alerts, removeAlert } = useApp();

  return (
    <div className="alert-container">
      {alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <span>{alert.message}</span>
          <button 
            className="alert-close"
            onClick={() => removeAlert(alert.id)}
            aria-label="Close alert"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
