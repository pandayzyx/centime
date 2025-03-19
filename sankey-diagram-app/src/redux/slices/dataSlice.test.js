import dataReducer, { addFlow, editFlow, deleteFlow, fetchChartData } from './dataSlice';
import { fetchInitialData } from '../../services/mockApi';

// Mock API service
jest.mock('../../services/mockApi', () => ({
  fetchInitialData: jest.fn(),
}));

describe('dataSlice reducer', () => {
  const initialState = {
    flows: [],
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(dataReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle addFlow', () => {
    const action = addFlow({ from: 'A', to: 'B', amount: 100 });
    const newState = dataReducer(initialState, action);

    expect(newState.flows).toHaveLength(1);
    expect(newState.flows[0]).toMatchObject({
      from: 'A',
      to: 'B',
      amount: 100,
    });
    expect(newState.flows[0].id).toBeDefined(); // Ensure ID is generated
  });

  it('should handle editFlow', () => {
    const existingState = {
      ...initialState,
      flows: [{ id: 'flow123', from: 'A', to: 'B', amount: 100 }],
    };

    const action = editFlow({ id: 'flow123', newFlow: { amount: 200 } });
    const newState = dataReducer(existingState, action);

    expect(newState.flows[0].amount).toBe(200);
  });

  it('should handle deleteFlow', () => {
    const existingState = {
      ...initialState,
      flows: [{ id: 'flow123', from: 'A', to: 'B', amount: 100 }],
    };

    const action = deleteFlow('flow123');
    const newState = dataReducer(existingState, action);

    expect(newState.flows).toHaveLength(0);
  });

  describe('fetchChartData async thunk', () => {
    it('should handle fetchChartData.pending', () => {
      const action = { type: fetchChartData.pending.type };
      const newState = dataReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBe(null);
    });

    it('should handle fetchChartData.fulfilled', () => {
      const mockData = [{ id: 'flow1', from: 'X', to: 'Y', amount: 500 }];
      const action = { type: fetchChartData.fulfilled.type, payload: mockData };
      const newState = dataReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.flows).toEqual(mockData);
    });

    it('should handle fetchChartData.rejected', () => {
      const action = { type: fetchChartData.rejected.type, error: { message: 'Fetch error' } };
      const newState = dataReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('Fetch error');
    });
  });
});
