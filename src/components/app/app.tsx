import React, {FC} from "react";
import { Route, Routes } from "react-router-dom";
import {useAppSelector} from "../core/redux/redux";

import LoginPage from "../pages/login-page";
import RegistrationPage from "../pages/registration-page";
import TeamsPage from "../pages/teams-page";
import PlayersPage from "../pages/players-page";
import TeamCardPage from "../pages/team-card-page";
import PlayerCardPage from "../pages/player-card-page";
import AddTeamPage from "../pages/add-team-page";
import AddPlayerPage from "../pages/add-player-page";

import "./app.css";
import AuthRoute from "../common/components/auth-router";

const App: FC = () => {
    const { token } = useAppSelector( state => state.authorizationReducer);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />

                <Route path='/' element={<AuthRoute token={token} />}>
                    <Route path='/teams' element={<TeamsPage/>}/>
                </Route>
                <Route path='/' element={<AuthRoute token={token} />}>
                    <Route path='/teams/team:id' element={<TeamCardPage/>}/>
                </Route>
                <Route path='/' element={<AuthRoute token={token} />}>
                    <Route path="/teams/addTeam" element={<AddTeamPage/>}/>
                </Route>

                <Route path='/' element={<AuthRoute token={token} />}>
                    <Route path="/players" element={<PlayersPage/>}/>
                </Route>
                <Route path='/' element={<AuthRoute token={token} />}>
                    <Route path="/players/player:id" element={<PlayerCardPage/>}/>
                </Route>
                <Route path='/' element={<AuthRoute token={token} />}>
                    <Route path="/players/addPlayer" element={<AddPlayerPage/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default App;
