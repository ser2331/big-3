import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { appSlice } from "../../AppSlice";
import { ProtectedPages } from "../../../../pages/ProtectedPages/ProtectedPages";
import { UnprotectedPages } from "../../../../pages/UnprotectedPages/UnprotectedPages";
import Types from "../../../../types";

import s from "./App.module.scss";

const { appSizesMap } = Types;

const { setIsMobile } = appSlice.actions;

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector( state => state.authorizationReducer);
    const { showMobileMenu } = useAppSelector(state => state.appReducer);

    useEffect(() => {
        document.body.style.overflow = showMobileMenu ? "hidden" : "visible";
    }, [showMobileMenu]);

    useEffect(() => {
        const getSizeKey = () => {
            const size = document.documentElement.clientWidth;
            if (size >= appSizesMap.get("desktop").size) return appSizesMap.get("desktop").value;
            if (size <= appSizesMap.get("desktop").size) return appSizesMap.get("mobile").value;
            return appSizesMap.get("desktop").value;
        };

        const onResize = () => {
            const sizeKey = getSizeKey();
            dispatch(setIsMobile(sizeKey));
        };

        onResize();
        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, [dispatch]);

    return (
        <div className={s.App}>
            {token ? (<ProtectedPages />) : (<UnprotectedPages />)}
        </div>
    );
};
