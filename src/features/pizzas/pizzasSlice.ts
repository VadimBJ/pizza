import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PizzasState from "./types/pizzaState";
import { pizzasBase } from "./types/pizzasBase";
import * as api from "./api";

const initialState: PizzasState = {
  pizzas: [],
  error: undefined,
  isLoading: true,
  isChange: false,
};

export const loadPizzas = createAsyncThunk("pizzas/loadPizzas", () =>
  api.getAllPizzas()
);

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
    changeCount: (state) => {
      state.isChange = !state.isChange;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPizzas.fulfilled, (state, action) => {
        if (action.payload.length) {
          state.pizzas = action.payload;
        } else {
          state.pizzas = pizzasBase;
        }
        state.isLoading = false;
      })
      .addCase(loadPizzas.rejected, (state) => {
        state.error = "Error: pizzas fetch rejected";
      });
  },
});

export const { resetError, changeCount } = pizzasSlice.actions;
export default pizzasSlice.reducer;
