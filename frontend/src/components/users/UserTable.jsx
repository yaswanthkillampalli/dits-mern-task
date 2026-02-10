import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2, MoreVertical, Users } from "lucide-react";

// Helper for Gender Icons
const GENDER_MAP = {
  male: { icon: "♂", color: "text-primary" },
  female: { icon: "♀", color: "text-danger" },
  other: { icon: "⚧", color: "text-muted" },
};

const UserTable = ({ users = [], onDelete }) => {
  return (
    <div className="table-responsive shadow-sm rounded border">
      <table className="table table-hover align-middle mb-0 bg-white">
        <thead className="table-light sticky-top z-index-10 top-0">
          <tr>
            <th className="ps-4 table-header-width-small bg-light">Profile</th>
            <th className="bg-light">Name</th>
            <th className="bg-light">Email</th>
            <th className="bg-light">Gender</th>
            <th className="bg-light">Status</th>
            <th className="text-center table-header-width-action bg-light">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-5">
                <div className="text-muted d-flex flex-column align-items-center">
                  <Users size={48} strokeWidth={1.5} className="mb-2 opacity-50" />
                  <p className="mb-0">No users found in the system.</p>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user) => {
              const genderData = GENDER_MAP[user.gender?.toLowerCase()] || GENDER_MAP.other;

              return (
                <tr key={user._id} className="animate-fade-in">
                  <td className="ps-4">
                    <img
                      src={user.profile || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                      alt={user.name}
                      className="rounded-circle border shadow-sm table-avatar hover-scale"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/45?text=User";
                      }}
                    />
                  </td>

                  <td>
                    <span className="fw-semibold text-dark">{user.name}</span>
                  </td>

                  <td className="text-muted small">{user.email}</td>

                  <td className="text-capitalize">
                    <span className={`me-2 fw-bold ${genderData.color}`}>
                      {genderData.icon}
                    </span>
                    {user.gender}
                  </td>

                  <td>
                    <span
                      className={`badge rounded-pill d-inline-flex align-items-center status-badge-pill ${
                        user.status === "Active"
                          ? "bg-success-subtle text-success border border-success"
                          : "bg-secondary-subtle text-secondary border border-secondary"
                      }`}
                    >
                      <span className="status-dot-indicator me-1">●</span> {user.status}
                    </span>
                  </td>

                  <td className="text-center">
                    <div className="dropdown">
                      <button 
                        className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center mx-auto action-menu-btn" 
                        data-bs-toggle="dropdown"
                      >
                        <MoreVertical size={16} className="text-muted" />
                      </button>

                      <ul className="dropdown-menu shadow border-0">
                        <li>
                          <Link className="dropdown-item d-flex align-items-center py-2" to={`/users/view/${user._id}`}>
                            <Eye size={16} className="me-2 text-info" /> 
                            <span>View</span>
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item d-flex align-items-center py-2" to={`/users/edit/${user._id}`}>
                            <Pencil size={16} className="me-2 text-primary" /> 
                            <span>Edit</span>
                          </Link>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                          <button 
                            className="dropdown-item d-flex align-items-center py-2 text-danger" 
                            onClick={() => onDelete(user._id)}
                          >
                            <Trash2 size={16} className="me-2" /> 
                            <span>Delete</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;