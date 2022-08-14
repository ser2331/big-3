import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../core/redux/redux";
import { authorizationSlice } from "../modules/authorization/AuthorizationSlice";
import { teamsSlice } from "../modules/teams/TeamsSlice";
import { ProtectedPages } from "../pages/ProtectedPages/ProtectedPages";
import { UnprotectedPages } from "../pages/UnprotectedPages/UnprotectedPages";
import StorageService from "../common/helpers/storageService/storage-service";
import Types from "../types";

import "./App.scss";

const { appSizesMap, localStorage } = Types;

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const { token, tokenError } = useAppSelector( state => state.authorizationReducer);
    const { showMobileMenu } = useAppSelector(state => state.teamsReducer);
    const { setIsMobile } = teamsSlice.actions;
    const { setUserData, setTokenError } = authorizationSlice.actions;

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (tokenError.status === "FETCH_ERROR") {
            StorageService.set(localStorage.token, "");
            dispatch(setUserData({name: "", avatarUrl: "", token: ""}));
            dispatch(setTokenError({status: 0, data: undefined}));
        }
    }, [dispatch, tokenError]);

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
        <div className="App">
            {token ? (<ProtectedPages />) : (<UnprotectedPages />)}
        </div>
    );
};
