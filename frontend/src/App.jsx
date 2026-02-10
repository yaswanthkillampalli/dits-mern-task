import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/layouts/Layout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
