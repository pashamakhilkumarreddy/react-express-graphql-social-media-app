import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Loader from "../components/common/Loader";
import ErrorBoundary from "../components/errors/ErrorBoundary";
import Home from "../pages/Home";

const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));

const Routes = () => (
  <ErrorBoundary>
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path={["/", "/home", "/index"]} exact>
          <Home />
        </Route>
        <Route path={"/register"} exact>
          <Register />
        </Route>
        <Route path={"/login"} exact>
          <Login />
        </Route>
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Suspense>
  </ErrorBoundary>
);

export default Routes;
