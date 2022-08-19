import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Types from "../../types";

const  { appSizesMap } = Types;

export interface AppState {
    showMobileMenu: boolean;
    isMobile: boolean;
}

const initialState: AppState = {
    showMobileMenu: false,
    isMobile: appSizesMap.get("desktop").key,
};

export const appSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {
        setShowMobileMenu(state, action: PayloadAction<boolean>) {
            state.showMobileMenu = action.payload;
        },
        setIsMobile(state, action: PayloadAction<boolean>) {
            state.isMobile = action.payload;
        },
    }

});

export default appSlice.reducer;