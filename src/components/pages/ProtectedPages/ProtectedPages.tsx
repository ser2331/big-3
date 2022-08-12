import {Route, Routes, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
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

export const ProtectedPages = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/teams");
    }, []);

    return (
        <div className="ProtectedPages">
            <Header />

            <div className="ProtectedPages__content">
                <Navigation />
                <Routes>
                    <Route path='/teams' element={<TeamsContainer/>}/>
                    <Route path='/teams/team:id' element={<TeamCard/>}/>
                    <Route path="/teams/addTeam" element={<AddTeamContainer/>}/>
                    <Route path="/players" element={<PlayersContainer/>}/>
                    <Route path="/players/player:id" element={<PlayerCard/>}/>
                    <Route path="/players/addPlayer" element={<AddPlayerContainer/>}/>
                </Routes>
                <MobileNavigation />
            </div>
        </div>
    );
};