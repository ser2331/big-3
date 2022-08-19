import React, {FC} from "react";
import classNames from "classnames";
import teams from "../../../../assests/images/group-person-rounded.svg";
import teamsRed from "../../../../assests/images/teamsRed.svg";
import players from "../../../../assests/images/person_rounded.svg";
import playersRed from "../../../../assests/images/personRed.svg";
import signOutIcon from "../../../../assests/images/signOut.png";
import userPhoto from "../../../../assests/images/profile.png";

import "./MobileNavigation.scss";

interface IMobileNavigation {
    signOut: () => void;
    goToTeamsPage: () => void;
    goToPlayersPage: () => void;
    closeMobileMenu: () => void;
    isTeamsPage: boolean;
    isPlayersPage: boolean;
    avatarUrl: string;
    name: string;
}

export const MobileNavigation: FC<IMobileNavigation> = ({ signOut, goToTeamsPage, goToPlayersPage, closeMobileMenu, isTeamsPage, isPlayersPage, avatarUrl, name}) => {

    return (
        <div className="MobileNavigation-wrapper">
            <div className="MobileNavigation">
                <div className="MobileNavigation__header">
                    <img alt="userPhoto" src={avatarUrl || userPhoto} />
                    <span className="user-name">{name}</span>
                </div>
                <div className="MobileNavigation__body">
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
            </div>
            <div className="MobileNavigation-wrapper__background" onClick={closeMobileMenu} />
        </div>
    );
};
