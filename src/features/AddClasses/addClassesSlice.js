/* eslint-disable no-param-reassign */
// Import createSlice() from Redux toolkit:
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Initial state for Redux store:
const initialState = {
  classes: [],
  isLoading: true,
  status: 'idle',
  error: '',
};

export const fetchClasses = createAsyncThunk(
  'classes/fetchClasses',
  async () => {
    const response = await axios.get('items');
    return response.data;
  },
);

// Create Redux state slice
const addClassSlice = createSlice({
  name: 'classes',
  initialState, // Define initial state
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes = action.payload;
        state.status = 'succeeded';
        state.content = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default addClassSlice.reducer;
