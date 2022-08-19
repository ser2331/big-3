import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../core/redux/redux";
import { appSlice } from "../../../modules/App/AppSlice";
import logo from "../../../assests/images/logo.png";
import userPhoto from "../../../assests/images/profile.png";
import mobileMenu from "../../../assests/images/mobile-menu.png";

import s from "./Header.module.scss";

const { setShowMobileMenu } = appSlice.actions;

export const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { name, avatarUrl } = useAppSelector(state => state.authorizationReducer);
    const { showMobileMenu } = useAppSelector(state => state.appReducer);

    const showMenu = () => {
        dispatch(setShowMobileMenu(!showMobileMenu));
    };

    return (
        <div className={s.Header}>
            <div className={s.Header__mobileMenu} onClick={showMenu}>
                <img alt="mobileMenu" src={mobileMenu}/>
            </div>
            <img className={s.Header__logo} alt="logo" src={logo} onClick={() => navigate("/teams")}/>

            <div className={s.Header__userInfoWrapper}>
                <span className={s.userName}>{name}</span>
                <img alt="userPhoto" src={avatarUrl || userPhoto} />
            </div>
        </div>
    );
};
