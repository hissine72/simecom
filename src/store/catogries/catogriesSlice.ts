import { createSlice } from "@reduxjs/toolkit";
import actcatogries from "./act/actcatogries";
import { TCategory } from "../../types/catogry";
;
interface ICategoriesState {
  records: TCategory[];
  loading: "idle" | "succeeded" | "failed" | "pending";
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actcatogries.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actcatogries.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actcatogries.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export { actcatogries };
export default categoriesSlice.reducer;