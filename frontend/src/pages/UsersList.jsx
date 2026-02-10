import { useEffect, useState, useCallback, useRef } from "react";
import { getUsers, searchUsers, deleteUser, exportUsersToCSV } from "../api/userApi";
import { toast } from "react-toastify";
import { Users, Download, Search, ArrowUp } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';

// Components
import UserTable from "../components/users/UserTable";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import ConfirmModal from "../components/common/ConfirmModal";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const isLoadingMoreRef = useRef(false);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const openDeleteModal = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  // Monitors the scroll inside the div
  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    setShowBackToTop(scrollTop > 400);
  };

  const scrollToTop = () => {
    const container = document.getElementById("scrollableDiv");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const res = searchTerm ? await searchUsers(searchTerm) : await getUsers(1);
      const data = res.data.users || res.data;
      setUsers(data);
      setHasMore(res.data.hasMore ?? false);
      setPage(1);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  const fetchMoreData = async () => {
    if (searchTerm || !hasMore || isLoadingMoreRef.current) return;
    try {
      isLoadingMoreRef.current = true;
      const nextPage = page + 1;
      const res = await getUsers(nextPage);
      setUsers((prev) => [...prev, ...(res.data.users || [])]);
      setHasMore(res.data.hasMore);
      setPage(nextPage);
    } catch (err) {
      console.error("Error loading more users", err);
    } finally {
      isLoadingMoreRef.current = false;
    }
  };

  const handleExport = () => {
    exportUsersToCSV(searchTerm)
      .then((res) => {
        const blob = new Blob([res.data], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `users_export_${new Date().getTime()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(() => toast.error("Failed to export users"));
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userToDelete);
      toast.success("User deleted successfully");
      setShowDeleteModal(false);
      fetchInitialData();
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchInitialData();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchInitialData]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mt-4 pb-5">
      {/* Header Section */}
      <div className="row align-items-center mb-4 g-3">
        <div className="col-6 col-lg-3 d-flex align-items-center gap-2 order-1">
          <Users size={28} strokeWidth={2.5} className="text-primary" />
          <h2 className="mb-0 fw-bold lh-1 title-responsive">Users</h2>
        </div>

        <div className="col-6 col-lg-3 text-end order-2 order-lg-3">
          <button 
            className="btn btn-primary rounded-pill px-4 d-inline-flex align-items-center gap-2 shadow-sm" 
            onClick={handleExport}
            disabled={users.length === 0}
          >
            <Download size={18} /> 
            <span className="d-none d-sm-inline">Export CSV</span>
            <span className="d-inline d-sm-none">Export</span>
          </button>
        </div>

        <div className="col-12 col-lg-6 order-3 order-lg-2">
          <div className="input-group shadow-sm rounded-pill overflow-hidden border">
            <span className="input-group-text bg-white border-0 ps-3">
              <Search size={18} className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-0 shadow-none py-2 search-input"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* User Table Card */}
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
        <div 
          id="scrollableDiv" 
          onScroll={handleScroll}
          className="users-table-container"
        >
          {loading && users.length === 0 ? (
            <div className="py-5 text-center">
              <Loader fullPage={false} />
            </div>
          ) : (
            <InfiniteScroll
              dataLength={users.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                <div className="text-center py-4">
                  <Loader fullPage={false} />
                </div>
              }
              scrollableTarget="scrollableDiv"
              endMessage={
                users.length > 0 && (
                  <div className="text-center py-4">
                    <p className="text-muted small mb-3">
                      <Users size={16} className="me-2 opacity-50" />
                      <b>You have reached the end of the list</b>
                    </p>
                    {/* The Go To Top button now appears here at the end of the text */}
                    <button 
                      className={`btn btn-primary rounded-circle shadow-lg scroll-to-top-btn ${showBackToTop ? 'show' : ''}`}
                      onClick={scrollToTop}
                    >
                      <ArrowUp size={24} />
                    </button>
                  </div>
                )
              }
            >
              <UserTable users={users} onDelete={openDeleteModal} />
              
              {!loading && users.length === 0 && (
                <div className="text-center p-5 bg-light">
                  <Users size={48} className="text-muted mb-3 opacity-25" />
                  <p className="text-muted mb-0">No users found matching "{searchTerm}"</p>
                </div>
              )}
            </InfiniteScroll>
          )}
        </div>
      </div>

      <ConfirmModal 
        show={showDeleteModal}
        title="Confirm Deletion"
        message="Are you sure you want to permanently delete this user? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        confirmText="Delete User"
        variant="danger"
      />
    </div>
  );
};

export default UsersList;