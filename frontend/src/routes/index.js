import { Route, Routes } from "react-router-dom";
import configureRoute from "./routes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const RoutesData = () => {
  return (
    <>
      <Routes>
        {configureRoute.map((item, key) =>
          item.private ? (
            <Route element={<PrivateRoute />}>
              <Route
                key={key}
                path={item.path}
                exact={item.exact}
                element={item.element}
              />
            </Route>
          ) : (
            <Route key={key} exact element={<PublicRoute />}>
              <Route
                key={key}
                exact={item.exact}
                path={item.path}
                name={item.name}
                element={item.element}
              />
            </Route>
          )
        )}
      </Routes>
    </>
  );
};

export default RoutesData;
