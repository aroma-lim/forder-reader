import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { TreeNode } from "../utils";

// Define a type for the slice state
interface ListState {
  lists: TreeNode[];
  json: JSON;
}

// Define the initial state using that type
const initialState: ListState = {
  lists: [],
  json: JSON,
};

export const listSlice = createSlice({
  name: "list",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    createLists: (state, action: PayloadAction<TreeNode[]>) => {
      state.lists = action.payload;
    },
    createJson: (state, action: PayloadAction<JSON>) => {
      state.json = action.payload;
    },
  },
});

export const { createLists, createJson } = listSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLists = (state: RootState) => state.list.lists;
export const selectJSON = (state: RootState) => state.list.json;

export default listSlice.reducer;
