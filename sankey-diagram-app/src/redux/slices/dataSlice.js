import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInitialData } from '../../services/mockApi';

// Async thunk to fetch initial data from mock API
export const fetchChartData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetchInitialData(); // Calls mock API
  return response;
});

const initialState = {
  flows: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addFlow(state, action) {
      state.flows.push(action.payload);
    },
    editFlow(state, action) {
      const { index, newFlow } = action.payload;
      state.flows[index] = newFlow;
    },
    deleteFlow(state, action) {
      state.flows.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.flows = action.payload; // Populates flows with mock API data
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addFlow, editFlow, deleteFlow } = dataSlice.actions;
export default dataSlice.reducer;