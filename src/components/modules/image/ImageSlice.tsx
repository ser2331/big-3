import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setImageToServer } from "./ActionCreators";

interface ImageState {
    image: string;
    isLoading: boolean;
    error: string;
}

const initialState: ImageState = {
    isLoading: false,
    image: "",
    error: ""
};

export const imageSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        setImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
    },
    extraReducers: {
        [setImageToServer.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.image = action.payload;
            state.error = "";
        },
        [setImageToServer.pending.type]:  (state) => {
            state.isLoading = true;
        },
        [setImageToServer.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export default imageSlice.reducer;
