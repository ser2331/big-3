import { combineReducers, configureStore } from "@reduxjs/toolkit";
import playersReducer from "../../modules/players/PlayersSlice";
import teamsReducer from "../../modules/teams/TeamsSlice";

const rootReducer = combineReducers({
    playersReducer,
    teamsReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

