import { createAsyncThunk } from "@reduxjs/toolkit";
import { Tproduct } from "../../../types/product";
import axios from "axios";


type TResponse = Tproduct[];
const actproducts = createAsyncThunk("products/actproducts",async(prefix:string ,thunkApi)=>{
    const{ rejectWithValue} =thunkApi;
    try{
       const response = await axios.get<TResponse>(`http://localhost:5005/products?cat_prefix=${prefix}`)
       return response.data;
    }
    catch(error){
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message || error.message);
          } else {
            return rejectWithValue("An unexpected error");
          }

    }

})
export default actproducts;