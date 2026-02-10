import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center bg-white not-found-container">
      <div className="text-center animate-fade-in">
        
        {/* Visual Element */}
        <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-light rounded-circle not-found-icon-circle">
          <AlertCircle size={60} className="text-danger opacity-75" />
        </div>

        {/* Text Content */}
        <h1 className="display-1 fw-bold text-dark mb-2">404</h1>
        <h3 className="fw-bold text-secondary mb-4">Page Not Found</h3>
        <p className="text-muted mb-5 mx-auto not-found-description">
          Oops! The page you are looking for doesn't exist or has been moved. 
          Please check the URL or return to the dashboard.
        </p>

        {/* Navigation Action */}
        <Link 
          to="/" 
          className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm d-inline-flex align-items-center gap-2 btn-transition hover-scale"
        >
          <Home size={20} />
          <span>Go Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;