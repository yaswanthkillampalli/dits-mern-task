import { Link, useLocation } from "react-router-dom";
import { Users, UserPlus } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 sticky-top">
      <div className="container">
        {/* Brand - Added flex-shrink-0 to prevent text squashing */}
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2 flex-shrink-0" to="/">
          <Users size={24} strokeWidth={2.5} className="text-primary" />
          <span className="lh-1">User Management</span>
        </Link>

        {/* Toggler */}
        <button 
          className="navbar-toggler border-0 shadow-none p-2" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Added mt-3 for mobile to give space below the brand, mt-lg-0 for desktop */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3 mt-3 mt-lg-0">
            <li className="nav-item">
              <Link 
                className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-3 transition-all ${isActive("/")}`} 
                to="/"
              >
                <Users size={18} />
                <span className="lh-1">Users List</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-3 transition-all ${isActive("/users/add")}`} 
                to="/users/add"
              >
                <UserPlus size={18} />
                <span className="lh-1">Add User</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;