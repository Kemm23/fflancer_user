import { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes, privateRoutes } from "~/routes";
import { DefaultLayout } from "~/layouts";
import storage from "~/untils/storage";
import { Login, Home, Register } from "~/pages";

function Main() {
  const isLogined = !Boolean(storage.getToken());
  return (
    <div className="container">
      <Routes>
        <Route path="/login" element={isLogined ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout title={route.title}>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </div>
  );
}

export default Main;
