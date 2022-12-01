import { Navigate, Outlet } from "react-router-dom";
import storage from "~/until/storage";

function PrivateRoutes() {
  const isAuth = Array.isArray(storage.get());
  return isAuth ? <Navigate to="/login" /> : <Outlet />;
  
}

export default PrivateRoutes;
