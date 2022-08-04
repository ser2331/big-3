import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch } from "../../../core/redux/redux";
import { authorizationSlice } from "../../../modules/authorization/AuthorizationSlice";
import Types from "../../../types";
import teams from "../../../assests/images/group-person-rounded.svg";
import teamsRed from "../../../assests/images/teamsRed.svg";
import players from "../../../assests/images/person_rounded.svg";
import playersRed from "../../../assests/images/personRed.svg";
import signOutIcon from "../../../assests/images/signOut.png";

import "./navigation.scss";
import {teamsSlice} from "../../../modules/teams/TeamsSlice";

const { routingMap } = Types;

const Navigation = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { setUserData } = authorizationSlice.actions;
    const { setCurrentTeam, setTeamId } = teamsSlice.actions;

    const isPlayersPage = location.pathname.includes(routingMap.get("players").value);
    const isTeamsPage = location.pathname.includes(routingMap.get("teams").value);

    const signOut = () => {
        dispatch(setUserData({name: "", avatarUrl: "", token: ""}));
    };

    const goHome = () => {
        dispatch(setCurrentTeam({
            name: "",
            foundationYear: null,
            division: "",
            conference: "",
            imageUrl: "",
            id: null,
        }));
        dispatch(setTeamId(null));
        navigate("/teams");
    };

    return (
        <div className="Navigation">
            <div className="links-wrapper">
                <div
                    onClick={goHome}
                    className= "link-wrapper"
                >
                    <img className="link-image" alt="teams" src={isTeamsPage ? teamsRed : teams}/>

                    <label className={classNames("link-name", {"active": isTeamsPage})}>Teams</label>
                </div>

                <Link
                    to="/players"
                    className="link-wrapper"
                >
                    <img className="link-image" alt="players" src={isPlayersPage ? playersRed : players }/>
                    <label className={classNames("link-name", {"active": isPlayersPage})}>Players</label>
                </Link>
            </div>


            <div className="sign-out-wrapper" onClick={signOut}>
                <img className="sign-out-image" alt="signOut" src={signOutIcon}/>
                <span className="sign-out">Sign out</span>
            </div>
        </div>
    );
};

export default Navigation;
