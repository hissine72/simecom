import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TCategory } from "../../../types/catogry";
type TResponse = TCategory[];

const actcatogries = createAsyncThunk(
  "catogries/actcatogries",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        "http://localhost:5005/categories"
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actcatogries;