import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Login, Registration } from "../../modules/authorization/components/AuthContent";

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
                <div className={s.image} />
            </div>
        </div>
    );
};