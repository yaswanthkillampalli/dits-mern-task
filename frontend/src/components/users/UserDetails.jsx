import { useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Mail, 
  User as UserIcon, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Pencil,
  Hash
} from "lucide-react";

const UserDetails = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="row justify-content-center animate-fade-in">
      <div className="col-md-10 col-lg-8 col-xl-7">
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          
          {/* Top Decorative Header */}
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3 px-4">
            <div className="d-flex align-items-center gap-2">
              <Hash size={18} className="text-muted" />
              <span className="small text-uppercase tracking-wider opacity-75">
                User ID: {user._id.slice(-6)}
              </span>
            </div>
            <button 
              className="btn btn-sm btn-outline-light rounded-pill px-3 d-flex align-items-center gap-1" 
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={14} /> <span>Back to List</span>
            </button>
          </div>

          <div className="card-body p-0">
            <div className="row g-0">
              
              {/* Profile Side (Left) */}
              <div className="col-md-5 bg-light d-flex flex-column align-items-center justify-content-center py-5 border-end">
                <div className="position-relative mb-3">
                  <img
                    src={user.profile || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=150`}
                    alt={user.name}
                    className="rounded-circle shadow border border-4 border-white transition-all hover-scale user-details-avatar"
                  />
                </div>
                
                <h3 className="fw-bold text-dark mb-1 text-center px-2">{user.name}</h3>
                
                <span className={`badge rounded-pill mb-4 px-3 py-2 d-flex align-items-center gap-1 ${
                  user.status === "Active" 
                    ? "bg-success-subtle text-success border border-success" 
                    : "bg-secondary-subtle text-secondary border border-secondary"
                }`}>
                  {user.status === "Active" ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  {user.status}
                </span>

                <Link 
                  to={`/users/edit/${user._id}`} 
                  className="btn btn-primary btn-sm rounded-pill px-4 d-flex align-items-center gap-2 shadow-sm"
                >
                  <Pencil size={14} /> Edit Profile
                </Link>
              </div>

              {/* Data Side (Right) */}
              <div className="col-md-7 p-4 p-lg-5">
                <h5 className="text-muted small text-uppercase fw-bold mb-4 tracking-widest">Account Details</h5>
                
                <div className="d-flex flex-column gap-4">
                  
                  {/* Email Field */}
                  <div className="d-flex align-items-start gap-3">
                    <div className="p-2 bg-primary-subtle rounded-3 text-primary">
                      <Mail size={20} />
                    </div>
                    <div>
                      <label className="text-muted small d-block mb-1">Email Address</label>
                      <span className="fw-semibold text-dark break-all">{user.email}</span>
                    </div>
                  </div>

                  {/* Gender Field */}
                  <div className="d-flex align-items-start gap-3">
                    <div className={`p-2 rounded-3 ${
                      user.gender === 'female' ? 'bg-danger-subtle text-danger' : 'bg-info-subtle text-info'
                    }`}>
                      <UserIcon size={20} />
                    </div>
                    <div>
                      <label className="text-muted small d-block mb-1">Gender</label>
                      <span className="fw-semibold text-dark text-capitalize">
                        {user.gender === 'male' ? '♂ Male' : user.gender === 'female' ? '♀ Female' : '⚧ Other'}
                      </span>
                    </div>
                  </div>

                  {/* Joined Date Field */}
                  <div className="d-flex align-items-start gap-3">
                    <div className="p-2 bg-warning-subtle text-warning rounded-3">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <label className="text-muted small d-block mb-1">Member Since</label>
                      <span className="fw-semibold text-dark">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;