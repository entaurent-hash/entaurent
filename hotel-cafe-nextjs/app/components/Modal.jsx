'use client';

export default function Modal({ id, title, children, onClose }) {
  return (
    <div className="modal" id={id} onClick={(e) => {
      if (e.target.id === id) onClose();
    }}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>&times;</span>
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}
