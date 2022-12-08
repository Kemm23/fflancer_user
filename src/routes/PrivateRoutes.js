import { Navigate, Outlet } from "react-router-dom";
import storage from "~/untils/storage";

function PrivateRoutes() {
  const isAuth = !Boolean(storage.getToken())
  return isAuth ? <Navigate to="/login" /> : <Outlet />;
}

export default PrivateRoutes;
