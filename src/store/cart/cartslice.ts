 import {createSlice} from "@reduxjs/toolkit"
 import { Tproduct } from "../../types/product"
 import { getcarttotalquatntityselector } from "./selectors";
 import actgetproducts from "./act/actgetproducts";
  interface Iintial {
    productFullInfo : Tproduct[];
    items:{ [key: number] : number}
    loading:"idle" | "succeeded" | "failed" | "pending"
    error: null | string,


  }
 
  const initialState: Iintial = {
    items: {},
    productFullInfo: [],
    loading: "idle",
    error: null,
 }
 const cartslice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state,action) => {
            const id = action.payload;
            if(state.items[id]){
                state.items[id]++;
            }else{
                state.items[id] = 1;

            }



        },
        cartItemChangeQuantity: (state, action) => {
            state.items[action.payload.id] = action.payload.quantity;
          },
          cartItemRemove: (state, action) => {
            delete state.items[action.payload];
            state.productFullInfo = state.productFullInfo.filter(
              (el) => el.id !== action.payload
            );
          },
    } ,
    extraReducers: (builder) => {
        builder.addCase(actgetproducts.pending, (state) => {
          state.loading = "pending";
          state.error = null;
        });
        builder.addCase(actgetproducts.fulfilled, (state, action) => {
          state.loading = "succeeded";
          state.productFullInfo = action.payload;
        });
        builder.addCase(actgetproducts.rejected, (state, action) => {
          state.loading = "failed";
          if (action.payload && typeof action.payload === "string") {
            state.error = action.payload;
          }
        });
      },

 })
 export {getcarttotalquatntityselector,actgetproducts};
 export const {addToCart ,cartItemChangeQuantity, cartItemRemove } = cartslice.actions;
 export default cartslice.reducer;