import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../api/authService/authService";

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