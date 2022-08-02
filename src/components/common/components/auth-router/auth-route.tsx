import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IAuthRoute {
    token: string;
}

const AuthRoute = ({ token }: IAuthRoute) => {
    return token ? <Outlet /> : <Navigate to="/" />;
};

export default AuthRoute;