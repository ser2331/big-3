import React, { useEffect } from "react";
import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/redux/redux";
import StorageService from "../../common/helpers/storageService/storage-service";
import { authorizationSlice } from "../../modules/authorization/AuthorizationSlice";
import { teamsSlice } from "../../modules/teams/TeamsSlice";
import { Navigation } from "../../common/components/navigation/Navigation";
import { AddTeamContainer } from "../../modules/teams/components/AddTeamContainer/AddTeamContainer";
import { TeamsContainer } from "../../modules/teams/components/TeamsContainer/TeamsContainer";
import { TeamCard } from "../../modules/teams/components/TeamCard/TeamCard";
import { AddPlayerContainer } from "../../modules/players/components/AddPlayerContainer/AddPlayerContainer";
import { PlayerCard } from "../../modules/players/components/PlayerCard/PlayerCard";
import { PlayersContainer } from "../../modules/players/components/PlayersContainer/PlayersContainer";
import { MobileNavigation } from "../../common/components/navigation/MobileNavigation/MobileNavigation";
import { Header } from "../../common/components/Header/Header";
import Types from "../../types";

import "./ProtectedPages.scss";

const { routingMap, localStorage } = Types;

const { setUserData } = authorizationSlice.actions;
const { setShowMobileMenu } = teamsSlice.actions;

export const ProtectedPages = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { showMobileMenu, isMobile } = useAppSelector(state => state.teamsReducer);
    const { name, avatarUrl } = useAppSelector(state => state.authorizationReducer);

    const isPlayersPage = location.pathname.includes(routingMap.get("players").value);
    const isTeamsPage = location.pathname.includes(routingMap.get("teams").value);

    const signOut = () => {
        StorageService.set(localStorage.token, "");
        dispatch(setUserData({name: "", avatarUrl: "", token: ""}));
        dispatch(setShowMobileMenu(false));
    };

    const closeMobileMenu = () => {
        dispatch(setShowMobileMenu(false));
    };

    const goToTeamsPage = () => {
        navigate("/teams");
    };

    const goToPlayersPage = () => {
        navigate("/players");
    };

    useEffect(() => {
        if (location.pathname === (routingMap.get("initial").value)) {
            navigate("/teams");
        }
    }, [location, navigate]);

    return (
        <div className="ProtectedPages">
            <Header/>

            <div className="ProtectedPages__content">

                {(isMobile && showMobileMenu) ? (
                    <MobileNavigation
                        goToPlayersPage={goToPlayersPage}
                        goToTeamsPage={goToTeamsPage}
                        signOut={signOut}
                        closeMobileMenu={closeMobileMenu}
                        isTeamsPage={isTeamsPage}
                        isPlayersPage={isPlayersPage}
                        name={name}
                        avatarUrl={avatarUrl}
                    />
                ) : ""}

                {!isMobile ? (
                    <Navigation
                        goToPlayersPage={goToPlayersPage}
                        goToTeamsPage={goToTeamsPage}
                        signOut={signOut}
                        isTeamsPage={isTeamsPage}
                        isPlayersPage={isPlayersPage}
                    />
                ) : ""}


                <Routes>
                    <Route path="/" element={<Outlet/>}>
                        <Route path='teams' element={<TeamsContainer/>}/>
                    </Route>
                    <Route path='teams/team:id' element={<TeamCard/>}/>
                    <Route path="teams/addTeam" element={<AddTeamContainer/>}/>
                    <Route path="players" element={<PlayersContainer/>}/>
                    <Route path="players/player:id" element={<PlayerCard/>}/>
                    <Route path="players/addPlayer" element={<AddPlayerContainer/>}/>
                </Routes>
            </div>
        </div>
    );
};