import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Login, Registration } from "../../modules/authorization/components/AuthContent";
import authImage from "../../assests/images/auth.png";

import s from "./UnprotectedPages.module.scss";

export const UnprotectedPages = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, []);

    return (
        <div className={s.UnprotectedPages}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
            </Routes>

            <div className={s.UnprotectedPages__imageWrapper}>
                <img className={s.authImage} alt="auth-image" src={authImage}/>
            </div>
        </div>
    );
};