import React, {FC} from "react";
import classNames from "classnames";
import teams from "../../../../assests/images/group-person-rounded.svg";
import teamsRed from "../../../../assests/images/teamsRed.svg";
import players from "../../../../assests/images/person_rounded.svg";
import playersRed from "../../../../assests/images/personRed.svg";
import signOutIcon from "../../../../assests/images/signOut.png";
import userPhoto from "../../../../assests/images/profile.png";

import s from "./MobileNavigation.module.scss";

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
        <div className={s.MobileNavigationWrapper}>
            <div className={s.MobileNavigation}>
                <div className={s.MobileNavigation__header}>
                    <img alt="userPhoto" src={avatarUrl || userPhoto} />
                    <span className={s.userName}>{name}</span>
                </div>
                <div className={s.MobileNavigation__body}>
                    <div className={s.linksWrapper}>
                        <div
                            onClick={goToTeamsPage}
                            className={s.linkWrapper}
                        >
                            <img className={s.linkImage} alt="teams" src={isTeamsPage ? teamsRed : teams}/>

                            <label className={classNames(s.linkName, isTeamsPage && s.active)}>Teams</label>
                        </div>

                        <div
                            onClick={goToPlayersPage}
                            className={s.linkWrapper}
                        >
                            <img className={s.linkImage} alt="players" src={isPlayersPage ? playersRed : players }/>
                            <label className={classNames(s.linkName, isPlayersPage && s.active)}>Players</label>
                        </div>
                    </div>


                    <div className={s.signOutWrapper} onClick={signOut}>
                        <img className={s.signOutImage} alt="signOut" src={signOutIcon}/>
                        <span className={s.signOut}>Sign out</span>
                    </div>
                </div>
            </div>
            <div className={s.MobileNavigationWrapper__background} onClick={closeMobileMenu} />
        </div>
    );
};
