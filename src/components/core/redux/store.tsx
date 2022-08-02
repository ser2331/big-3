import { combineReducers, configureStore } from "@reduxjs/toolkit";
import playersReducer from "../../modules/players/PlayersSlice";
import teamsReducer from "../../modules/teams/TeamsSlice";
import authorizationReducer from "../../modules/authorization/AuthorizationSlice";
import { tokenAPI } from "../../api/apiService";

const rootReducer = combineReducers({
    playersReducer,
    teamsReducer,
    authorizationReducer,
    [tokenAPI.reducerPath]: tokenAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenAPI.middleware)
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

