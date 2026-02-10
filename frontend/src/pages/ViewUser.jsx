import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/userApi";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import UserDetails from "../components/users/UserDetails";

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await getUserById(id);
        console.log("API Response:", res.data);
        setUser(res.data);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "User not found or server error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  return (
    <div className="container mt-4">
      {loading ? (
        /* Loader stays centered in the content area, Navbar remains visible above */
        <Loader fullPage={false} />
      ) : error ? (
        <div className="mt-5">
          <ErrorMessage message={error} />
          <div className="text-center mt-3">
            <button onClick={() => window.history.back()} className="btn btn-primary rounded-pill">
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <UserDetails user={user} />
      )}
    </div>
  );
};

export default ViewUser;