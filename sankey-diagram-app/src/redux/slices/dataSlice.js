import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInitialData } from '../../services/mockApi';

export const fetchChartData = createAsyncThunk('data/fetchChartData', async () => {
  const response = await fetchInitialData();
  return response;
});

const initialState = {
  flows: [],
  loading: false,
  error: null,
};

const generateId = () => Math.random().toString(36).substring(2, 11);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addFlow(state, action) {
      const { from, to, amount } = action.payload;
      state.flows.push({ id: generateId(), from, to, amount });
    },
    editFlow(state, action) {
      const { id, newFlow } = action.payload;
      const flowIndex = state.flows.findIndex((flow) => flow.id === id);
      if (flowIndex !== -1) {
        state.flows[flowIndex] = { ...state.flows[flowIndex], ...newFlow };
      }
    },
    deleteFlow(state, action) {
      const id = action.payload;
      state.flows = state.flows.filter((flow) => flow.id !== id);
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
        state.flows = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addFlow, editFlow, deleteFlow } = dataSlice.actions;
export default dataSlice.reducer;