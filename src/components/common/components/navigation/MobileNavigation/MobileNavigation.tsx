import React, {FC} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Drawer } from "antd";
import Types from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/redux";
import { authorizationSlice } from "../../../../modules/authorization/AuthorizationSlice";
import { playersSlice } from "../../../../modules/players/PlayersSlice";
import { teamsSlice } from "../../../../modules/teams/TeamsSlice";
import { imageSlice } from "../../../../api/images/ImagesApiService";
import teams from "../../../../assests/images/group-person-rounded.svg";
import teamsRed from "../../../../assests/images/teamsRed.svg";
import players from "../../../../assests/images/person_rounded.svg";
import playersRed from "../../../../assests/images/personRed.svg";
import signOutIcon from "../../../../assests/images/signOut.png";
import userPhoto from "../../../../assests/images/profile.png";
import StorageService from "../../../helpers/storageService/storage-service";

import "./MobileNavigation.scss";

const { routingMap, localStorage } = Types;

const { setUserData } = authorizationSlice.actions;
const { setCurrentTeam, setTeamId, setShowMobileMenu } = teamsSlice.actions;
const { setCurrentPlayer, setPlayerId } = playersSlice.actions;
const { setImage } = imageSlice.actions;

export const MobileNavigation: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { showMobileMenu } = useAppSelector(state => state.teamsReducer);
    const { name, avatarUrl } = useAppSelector(state => state.authorizationReducer);

    const isPlayersPage = location.pathname.includes(routingMap.get("players").value);
    const isTeamsPage = location.pathname.includes(routingMap.get("teams").value);

    const signOut = () => {
        StorageService.set(localStorage.token, "");
        dispatch(setUserData({name: "", avatarUrl: "", token: ""}));
        dispatch(setShowMobileMenu(false));
    };

    const goToTeamsPage = () => {
        dispatch(setCurrentTeam({
            name: "",
            foundationYear: null,
            division: "",
            conference: "",
            imageUrl: "",
            id: null,
        }));
        dispatch(setTeamId(null));
        dispatch(setImage(""));
        navigate("/teams");
    };

    const goToPlayersPage = () => {
        dispatch(setCurrentPlayer({
            id: null,
            name: "",
            birthday: "",
            avatarUrl: "",
            height: null,
            weight: null,
            number: null,
            position: "",
            team: null,
        }));
        dispatch(setPlayerId(null));
        dispatch(setImage(""));
        navigate("/players");
    };

    const renderUserInfo = () => (
        <div className="mobile-user-info-wrapper">
            <img alt="userPhoto" src={avatarUrl || userPhoto} />
            <span className="user-name">{name}</span>
        </div>
    );

    return (
        <div className="MobileNavigation">
            <Drawer
                placement="left"
                height={document.documentElement.clientHeight}
                visible={showMobileMenu}
                closable={false}
                className="MobileNavigation-wrapper"
                onClose={() => dispatch(setShowMobileMenu(false))}
                title={renderUserInfo()}
            >
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
            </Drawer>
        </div>
    );
};
