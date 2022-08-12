import React from "react";
import { useAppDispatch, useAppSelector } from "../../../core/redux/redux";
import { teamsSlice } from "../../../modules/teams/TeamsSlice";
import logo from "../../../assests/images/logo.png";
import userPhoto from "../../../assests/images/profile.png";
import mobileMenu from "../../../assests/images/mobile-menu.png";

import "./Header.scss";

export const Header = () => {
    const dispatch = useAppDispatch();
    const { name, avatarUrl } = useAppSelector(state => state.authorizationReducer);
    const { showMobileMenu } = useAppSelector(state => state.teamsReducer);
    const { setShowMobileMenu } = teamsSlice.actions;

    const showMenu = () => {
        dispatch(setShowMobileMenu(!showMobileMenu));
    };

    return (
        <div className="Header">
            <div className="Header__mobile-menu" onClick={showMenu}>
                <img alt="mobileMenu" src={mobileMenu}/>
            </div>
            <img className="Header__logo" alt="logo" src={logo}/>

            <div className="Header__user-info-wrapper">
                <span className="user-name">{name}</span>
                <img alt="userPhoto" src={avatarUrl || userPhoto} />
            </div>
        </div>
    );
};
