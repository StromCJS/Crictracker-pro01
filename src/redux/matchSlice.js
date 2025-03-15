import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matches: [],
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    setMatches: (state, action) => {
      state.matches = action.payload;
    },
  },
});

export const { setMatches } = matchSlice.actions;
export default matchSlice.reducer;
