import React, {FC} from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/login-page";
import RegistrationPage from "../pages/registration-page";
import TeamsPage from "../pages/teams-page";
import PlayersPage from "../pages/players-page";
import TeamCardPage from "../pages/team-card-page";
import PlayerCardPage from "../pages/player-card-page";
import AddTeamPage from "../pages/add-team-page";
import AddPlayerPage from "../pages/add-player-page";

import "./app.css";

const App: FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />

                <Route path="/teams" element={<TeamsPage />} />
                <Route path="/teams/team:id" element={<TeamCardPage />} />
                <Route path="/teams/addTeam" element={<AddTeamPage />} />

                <Route path="/players" element={<PlayersPage />} />
                <Route path="/players/player:id" element={<PlayerCardPage />} />
                <Route path="/players/addPlayer" element={<AddPlayerPage />} />
            </Routes>
        </div>
    );
};

export default App;
