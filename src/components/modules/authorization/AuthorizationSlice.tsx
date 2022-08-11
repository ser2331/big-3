import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "./interfaces/authorization-interfaces";
import StorageService from "../../common/helpers/storageService/storage-service";
import Types from "../../types";

const { localStorage } = Types;

const token = StorageService.get(localStorage.token);
const userName = StorageService.get(localStorage.name);
const avatar = StorageService.get(localStorage.avatarUrl);

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
    name: userName || "",
    avatarUrl: avatar || "",
    token: token || "",
    error: false,
};

export const authorizationSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<IUserData>) {
            StorageService.set(localStorage.token, action.payload.token);
            StorageService.set(localStorage.name, action.payload.name);
            StorageService.set(localStorage.avatarUrl, action.payload.avatarUrl);

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