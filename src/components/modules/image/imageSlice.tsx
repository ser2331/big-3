import { baseUrl } from "../../api/authService/authService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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

export const setImageToServer = createAsyncThunk(
    "images/setImages",
    async (params: {token: string, data: FormData}, thunkAPI) => {
        try {
            const res = await axios.post(baseUrl + "/api/Image/SaveImage", params.data, {
                headers: {
                    "Authorization": `Bearer ${params.token}`
                }
            });
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Зашрузка изображения не удалась...");
        }
    }
);

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
