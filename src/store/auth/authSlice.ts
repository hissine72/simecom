import {  createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";

 interface IauthState{
    loading:"idle" | "succeeded" | "failed" | "pending"
    error: null | string,
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
      } | null ;
    accessToken: string | null ;
 }
 const initialState : IauthState = {
    loading: "idle",
    error : null,
    user: null,
    accessToken: null, 


 }

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        authLogout: (state) => {
            state.user = null;
            state.accessToken = null;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(actAuthRegister.pending, (state) => {
            state.error = null;
            state.loading = "idle";
        })
        builder.addCase(actAuthRegister.fulfilled, (state) => { 
            state.loading =  "succeeded"
        })
        builder.addCase(actAuthRegister.rejected, (state) => {
            state.loading = "failed" ;
            // if (action.payload && typeof action.payload === "string") {
            //     state.error = action.payload;
            //   }

        })

        builder.addCase(actAuthLogin.pending, (state) => {
            state.loading = "pending";
            state.error = null;
          });
          builder.addCase(actAuthLogin.fulfilled, (state , action) => {
            state.loading = "succeeded";
            state.accessToken = action.payload?.accessToken ?? "";
            state.user =  action.payload?.user ?? null;
          });
          builder.addCase(actAuthLogin.rejected , (state ) => {
            state.loading = "failed";
           
          });




   




    },
})
export { actAuthRegister ,actAuthLogin }
export const {  authLogout } = authSlice.actions;
export default authSlice.reducer;