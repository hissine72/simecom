import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
;

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: TFormData, thunk) => {
    // const { rejectWithValue } = thunk;

    try {
      const res = await axios.post("http://localhost:5005/register", formData);
      return res.data;
    } catch (error) {
        console.log(error)
    }
  }
);
export default actAuthRegister;