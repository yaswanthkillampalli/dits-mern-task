import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({ show, title, message, onConfirm, onCancel, confirmText = "Confirm", variant = "danger" }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-custom animate-fade-in shadow-lg border-0 rounded-4">
        <div className="modal-header-custom border-bottom p-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
            <AlertTriangle className={`text-${variant}`} size={20} />
            {title}
          </h5>
          <button className="btn p-0 text-muted" onClick={onCancel}>
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body-custom p-4">
          <p className="text-secondary mb-0">{message}</p>
        </div>
        
        <div className="modal-footer-custom p-3 bg-light d-flex justify-content-end gap-2">
          <button className="btn btn-light border px-4 rounded-pill" onClick={onCancel}>
            Cancel
          </button>
          <button className={`btn btn-${variant} px-4 rounded-pill shadow-sm`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;