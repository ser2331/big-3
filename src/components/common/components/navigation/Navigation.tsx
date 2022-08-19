import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch } from "../../../core/redux/redux";
import { authorizationSlice } from "../../../modules/authorization/AuthorizationSlice";
import Types from "../../../types";
import teams from "../../../assests/images/group-person-rounded.svg";
import teamsRed from "../../../assests/images/teamsRed.svg";
import players from "../../../assests/images/person_rounded.svg";
import playersRed from "../../../assests/images/personRed.svg";
import signOutIcon from "../../../assests/images/signOut.png";
import StorageService from "../../helpers/storageService/storage-service";

import "./Navigation.scss";

const { routingMap, localStorage } = Types;

const { setUserData } = authorizationSlice.actions;

export const Navigation = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const isPlayersPage = location.pathname.includes(routingMap.get("players").value);
    const isTeamsPage = location.pathname.includes(routingMap.get("teams").value);

    const signOut = () => {
        StorageService.set(localStorage.token, "");
        dispatch(setUserData({name: "", avatarUrl: "", token: ""}));
    };

    const goToTeamsPage = () => {
        navigate("/teams");
    };
    
    const goToPlayersPage = () => {
        navigate("/players");
    };

    return (
        <div className="Navigation">
            <div className="links-wrapper">
                <div
                    onClick={goToTeamsPage}
                    className= "link-wrapper"
                >
                    <img className="link-image" alt="teams" src={isTeamsPage ? teamsRed : teams}/>

                    <label className={classNames("link-name", {"active": isTeamsPage})}>Teams</label>
                </div>

                <div
                    onClick={goToPlayersPage}
                    className="link-wrapper"
                >
                    <img className="link-image" alt="players" src={isPlayersPage ? playersRed : players }/>
                    <label className={classNames("link-name", {"active": isPlayersPage})}>Players</label>
                </div>
            </div>


            <div className="sign-out-wrapper" onClick={signOut}>
                <img className="sign-out-image" alt="signOut" src={signOutIcon}/>
                <span className="sign-out">Sign out</span>
            </div>
        </div>
    );
};
