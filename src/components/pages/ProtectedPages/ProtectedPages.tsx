import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Navigation } from "../../common/components/navigation/Navigation";
import { AddTeamContainer } from "../../modules/teams/components/AddTeamContainer/AddTeamContainer";
import { TeamsContainer } from "../../modules/teams/components/TeamsContainer/TeamsContainer";
import { TeamCard } from "../../modules/teams/components/TeamCard/TeamCard";
import { AddPlayerContainer } from "../../modules/players/components/AddPlayerContainer/AddPlayerContainer";
import { PlayerCard } from "../../modules/players/components/PlayerCard/PlayerCard";
import { PlayersContainer } from "../../modules/players/components/PlayersContainer/PlayersContainer";
import { MobileNavigation } from "../../common/components/navigation/MobileNavigation/MobileNavigation";
import { Header } from "../../common/components/Header/Header";

import "./ProtectedPages.scss";

export const ProtectedPages = () => (
    <div className="ProtectedPages">
        <Header />

        <div className="ProtectedPages__content">
            <Navigation />
            <Routes>
                <Route path="/" element={<Outlet />}>
                    <Route path='teams' element={<TeamsContainer/>}/>
                </Route>
                <Route path='teams/team:id' element={<TeamCard/>}/>
                <Route path="teams/addTeam" element={<AddTeamContainer/>}/>
                <Route path="players" element={<PlayersContainer/>}/>
                <Route path="players/player:id" element={<PlayerCard/>}/>
                <Route path="players/addPlayer" element={<AddPlayerContainer/>}/>
            </Routes>
            <MobileNavigation />
        </div>
    </div>
);