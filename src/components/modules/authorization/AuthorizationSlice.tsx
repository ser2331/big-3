import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "./interfaces/authorization-interfaces";

interface AuthorizationState {
    login: string;
    password: string;
    name: string;
    avatarUrl: string;
    token: string;
    error: boolean;
}

const initialState: AuthorizationState = {
    login: "",
    password: "",
    name: "",
    avatarUrl: "",
    token: "",
    error: false,
};

export const authorizationSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<IUserData>) {
            state.name = action.payload.name;
            state.avatarUrl = action.payload.avatarUrl;
            state.token = action.payload.token;
        },
        setErrorIndicator(state, action: PayloadAction<boolean>) {
            state.error = action.payload;
        }
    }
});

export default authorizationSlice.reducer;