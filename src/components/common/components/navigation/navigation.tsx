import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import Types from "../../../types";
import teams from "../../../assests/images/group-person-rounded.svg";
import teamsRed from "../../../assests/images/teamsRed.svg";
import players from "../../../assests/images/person_rounded.svg";
import playersRed from "../../../assests/images/personRed.svg";

import "./navigation.scss";

const { routingMap } = Types;

const Navigation = () => {

    const location = useLocation();

    const isPlayersPage = location.pathname === routingMap.get("players").value;
    const isTeamsPage = location.pathname === routingMap.get("teams").value;

    return (
        <div className="Navigation">
            <Link
                to="/teams"
                className= "link-wrapper"
            >
                <img className="link-image" alt="teams" src={isTeamsPage ? teamsRed : teams}/>

                <label className={classNames("link-name", {"active": isTeamsPage})}>Teams</label>
            </Link>

            <Link
                to="/players"
                className="link-wrapper"
            >
                <img className="link-image" alt="players" src={isPlayersPage ? playersRed : players }/>
                <label className={classNames("link-name", {"active": isPlayersPage})}>Players</label>
            </Link>
        </div>
    );
};

export default Navigation;
