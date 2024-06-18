import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../index"
const getcarttotalquatntityselector = createSelector((state: RootState)=>state.cart.items, (items)=>{
  const totalquantity =   Object.values(items).reduce((acc,curentvalue)=>{
        return acc + curentvalue;
    
       },0)
       return totalquantity;
})

export {getcarttotalquatntityselector};