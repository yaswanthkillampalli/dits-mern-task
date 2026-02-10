import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorMessage = ({ message = "Something went wrong. Please try again.", onRetry }) => {
  return (
    <div className="error-container animate-fade-in py-4">
      <div className="error-alert card shadow-sm rounded-4 d-flex flex-column align-items-center text-center">
        
        {/* Icon Section */}
        <div className="error-icon-wrapper mb-3">
          <AlertCircle size={32} strokeWidth={2.5} />
        </div>

        {/* Content Section */}
        <h5 className="fw-bold mb-2">Error Occurred</h5>
        <p className="error-text mb-4 text-secondary">
          {message}
        </p>

        {/* Action Section (Conditional) */}
        {onRetry && (
          <button 
            className="btn btn-danger rounded-pill px-4 d-flex align-items-center gap-2 btn-transition shadow-sm"
            onClick={onRetry}
          >
            <RefreshCw size={18} />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;