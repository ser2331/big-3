import React, {FC} from "react";
import classNames from "classnames";
import teams from "../../../assests/images/group-person-rounded.svg";
import teamsRed from "../../../assests/images/teamsRed.svg";
import players from "../../../assests/images/person_rounded.svg";
import playersRed from "../../../assests/images/personRed.svg";
import signOutIcon from "../../../assests/images/signOut.png";

import s from "./Navigation.module.scss";

interface INavigation {
    signOut: () => void;
    goToTeamsPage: () => void;
    goToPlayersPage: () => void;
    isTeamsPage: boolean;
    isPlayersPage: boolean;
}

export const Navigation: FC<INavigation> = ({ signOut, goToTeamsPage, goToPlayersPage, isTeamsPage, isPlayersPage}) => {

    return (
        <div className={s.Navigation}>
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
    );
};
