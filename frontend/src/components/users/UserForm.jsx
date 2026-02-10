import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UploadCloud, Save, XCircle } from "lucide-react";
import ConfirmModal from "../common/ConfirmModal";

const UserForm = ({ onSubmit, defaultValues = {}, isEdit }) => {
  const [preview, setPreview] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({ defaultValues });

  const profileFile = watch("profile");

  useEffect(() => {
    if (profileFile && profileFile[0] instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(profileFile[0]);
    } 
    else if (defaultValues.profile && !preview) {
      setPreview(defaultValues.profile);
    }
  }, [profileFile, defaultValues.profile]);

  const handleCancelClick = () => {
    if (isDirty) {
      setShowCancelModal(true);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container mt-4 mb-5 animate-fade-in">
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div className="card-header bg-dark text-white d-flex align-items-center p-3 border-0">
          <button 
            type="button"
            className="btn btn-link text-white p-0 me-3 btn-transition shadow-none" 
            onClick={handleCancelClick}
          >
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>
          <h5 className="mb-0 fw-bold">{isEdit ? "Update User Details" : "Create New User"}</h5>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="row g-4">
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label fw-bold text-secondary small text-uppercase tracking-wider">Full Name</label>
                  <input
                    placeholder="Enter full name"
                    className={`form-control shadow-none ${errors.name ? "is-invalid" : ""}`}
                    {...register("name", { required: "Name is required", minLength: { value: 3, message: "Min 3 characters" } })}
                  />
                  {errors.name && <div className="invalid-feedback small">{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-secondary small text-uppercase tracking-wider">Email Address</label>
                  <input
                    placeholder="example@mail.com"
                    className={`form-control shadow-none ${errors.email ? "is-invalid" : ""}`}
                    {...register("email", { 
                      required: "Email is required", 
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } 
                    })}
                  />
                  {errors.email && <div className="invalid-feedback small">{errors.email.message}</div>}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-secondary small text-uppercase tracking-wider">Gender</label>
                    <select
                      className={`form-select shadow-none ${errors.gender ? "is-invalid" : ""}`}
                      {...register("gender", { required: "Select gender" })}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <div className="invalid-feedback small">{errors.gender.message}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-secondary small text-uppercase tracking-wider">Status</label>
                    <select className="form-select shadow-none" {...register("status")}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-md-4 text-center d-flex flex-column align-items-center justify-content-center border-start">
                <label className="form-label fw-bold text-secondary small text-uppercase tracking-wider d-block mb-3">Profile Picture</label>
                <div className="mb-3">
                  <img
                    src={preview || "https://res.cloudinary.com/dz7moyhci/image/upload/v1766250161/default-icon_cekay6.jpg"}
                    alt="Preview"
                    className="rounded-circle border border-3 border-white shadow-sm form-profile-preview"
                  />
                </div>
                
                <div className="px-3 w-100">
                  <div className="input-group input-group-sm">
                    <span className="input-group-text bg-light border-end-0">
                      <UploadCloud size={16} />
                    </span>
                    <input
                      type="file"
                      className="form-control shadow-none border-start-0"
                      accept="image/*"
                      {...register("profile")}
                    />
                  </div>
                  <small className="text-muted mt-2 d-block">Recommended: Square JPG/PNG</small>
                </div>
              </div>
            </div>

            <hr className="form-hr" />

            <div className="d-flex justify-content-end gap-3">
              <button 
                type="button" 
                className="btn btn-outline-danger px-4 rounded-3 d-flex align-items-center gap-2 btn-transition" 
                onClick={handleCancelClick}
              >
                <XCircle size={18} />
                <span>Cancel</span>
              </button>

              <button 
                type="submit" 
                className="btn btn-success px-4 rounded-3 d-flex align-items-center gap-2 shadow-sm btn-transition" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                ) : (
                  <Save size={18} />
                )}
                <span>{isEdit ? "Update User" : "Create User"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmModal 
        show={showCancelModal}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to discard them and go back?"
        onConfirm={() => navigate("/")}
        onCancel={() => setShowCancelModal(false)}
        confirmText="Discard Changes"
        variant="warning" 
      />
    </div>
  );
};

export default UserForm;