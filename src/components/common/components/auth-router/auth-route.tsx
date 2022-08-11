import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IAuthRoute {
    token: string;
    isAuth?: boolean;
}

const AuthRoute = ({ token, isAuth = false }: IAuthRoute) => {
    return !isAuth ? (
        token ? <Outlet /> : <Navigate to="/" />
    ) : (
        token ? <Navigate to="/teams" /> : <Outlet />
    );
};

export default AuthRoute;