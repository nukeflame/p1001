import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthService from "./auth";

let Auth = new AuthService();

export const PrivateRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (Auth.isLoggedIn()) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{ pathname: "/hospital-auth", state: { from: props.location } }}
          />
        );
      }
    }}
  />
);

export const PublicRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (Auth.isLoggedIn()) {
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }
      return <Component {...props} />;
    }}
  />
);
