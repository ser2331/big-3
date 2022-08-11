import React, {FC, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../core/redux/redux";
import { teamsSlice } from "../modules/teams/TeamsSlice";
import LoginPage from "../pages/login-page";
import RegistrationPage from "../pages/registration-page";
import TeamsPage from "../pages/teams-page";
import PlayersPage from "../pages/players-page";
import TeamCardPage from "../pages/team-card-page";
import PlayerCardPage from "../pages/player-card-page";
import AddTeamPage from "../pages/add-team-page";
import AddPlayerPage from "../pages/add-player-page";
import AuthRoute from "../common/components/auth-router";
import MobileNavigation from "../common/components/navigation/mobile-naavigation";
import Types from "../types";

import "./app.css";

const { appSizesMap } = Types;

const App: FC = () => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector( state => state.authorizationReducer);
    const { showMobileMenu } = useAppSelector(state => state.teamsReducer);
    const { setIsMobile } = teamsSlice.actions;

    useEffect(() => {
        document.body.style.overflow = showMobileMenu ? "hidden" : "visible";
    }, [showMobileMenu]);

    useEffect(() => {
        const getSizeKey = () => {
            const size = document.documentElement.clientWidth;
            if (size >= appSizesMap.get("desktop").size) return appSizesMap.get("desktop").value;
            if (size <= appSizesMap.get("desktop").size) return appSizesMap.get("mobile").value;
            return appSizesMap.get("desktop").value;
        };

        const onResize = () => {
            const sizeKey = getSizeKey();
            dispatch(setIsMobile(sizeKey));
        };

        onResize();
        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, [dispatch]);

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<AuthRoute token={token} isAuth={true} />}>
                    <Route path="/" element={<LoginPage />} />
                </Route>
                <Route path='/' element={<AuthRoute token={token} isAuth={true} />}>
                    <Route path="/registration" element={<RegistrationPage />} />
                </Route>

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

            <MobileNavigation />
        </div>
    );
};

export default App;
