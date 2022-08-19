import React, {FC} from "react";
import classNames from "classnames";
import teams from "../../../assests/images/group-person-rounded.svg";
import teamsRed from "../../../assests/images/teamsRed.svg";
import players from "../../../assests/images/person_rounded.svg";
import playersRed from "../../../assests/images/personRed.svg";
import signOutIcon from "../../../assests/images/signOut.png";

import "./Navigation.scss";

interface INavigation {
    signOut: () => void;
    goToTeamsPage: () => void;
    goToPlayersPage: () => void;
    isTeamsPage: boolean;
    isPlayersPage: boolean;
}

export const Navigation: FC<INavigation> = ({ signOut, goToTeamsPage, goToPlayersPage, isTeamsPage, isPlayersPage}) => {

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
