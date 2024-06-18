import { createSlice } from "@reduxjs/toolkit";
import { Tproduct } from "../../types/product";
import actproducts from "./act/actproduct";
interface Iproduct {
    records:Tproduct[]
    loading: "idle" | "succeeded" | "failed" | "pending";
    error :null | string;
}

const initialState:Iproduct  = {
    records:[],
    loading: "idle",
    error: null,
}

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        productsCleanUp: (state) => {
            state.records = [];
          },
    },
    extraReducers:(builder)=>{
        builder.addCase(actproducts.pending , (state) =>{
            state.error = null
            state.loading = "pending";
        } )
        builder.addCase(actproducts.fulfilled, (state,action) => {
            state.loading = "succeeded";
            state.records = action.payload;
        })
        builder.addCase(actproducts.rejected, (state, action) => {
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") {
              state.error = action.payload;
            }
          });
    }

})
export {actproducts}
export const { productsCleanUp } = productSlice.actions;
export default productSlice.reducer;