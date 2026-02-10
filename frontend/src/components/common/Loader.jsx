import { PuffLoader } from "react-spinners";

const Loader = ({ loading = true, fullPage = false }) => {
  if (!loading) return null;

  return (
    <div className={`loader-wrapper ${fullPage ? 'loader-full-page' : 'loader-contained'}`}>
      <PuffLoader color="#0d6efd" size={60} />
      <p className="mt-4 fw-bold text-dark loader-text">
        Loading your data...
      </p>
    </div>
  );
};

export default Loader;