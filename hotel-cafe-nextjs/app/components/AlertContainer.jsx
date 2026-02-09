'use client';

import { useApp } from '@/app/lib/context';

export default function AlertContainer() {
  const { alerts, removeAlert } = useApp();

  return (
    <>
      {alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <span>{alert.message}</span>
          <span className="modal-close" onClick={() => removeAlert(alert.id)}>×</span>
        </div>
      ))}
    </>
  );
}
