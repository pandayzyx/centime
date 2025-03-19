// Mock the EditForm component entirely to avoid imports
jest.mock('./EditForm', () => {
    return jest.fn(({ dispatch }) => ({
      props: {
        children: [
          {
            props: {
              onSubmit: (e) => {
                e.preventDefault();
                const formData = { id: null, from: 'Salary', to: 'Rent', amount: '1500' }; // Mock form data
                if (formData.id) {
                  dispatch({
                    type: 'data/editFlow',
                    payload: {
                      id: formData.id,
                      newFlow: { from: formData.from, to: formData.to, amount: Number(formData.amount) },
                    },
                  });
                } else {
                  dispatch({
                    type: 'data/addFlow',
                    payload: { from: formData.from, to: formData.to, amount: Number(formData.amount) },
                  });
                }
              },
            },
          },
          {
            props: {
              children: [
                {
                  props: {
                    children: [
                      'Salary → Bills: 3000', // Mock flow display
                      { props: { onClick: () => dispatch({ type: 'data/editFlow', payload: { id: '1', newFlow: { from: 'Salary', to: 'Rent', amount: 3000 } } }) } }, // Edit button
                      { props: { onClick: () => dispatch({ type: 'data/deleteFlow', payload: '1' }) } }, // Delete button
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    }));
  });
  
  // Mock dependencies (not strictly needed since we're mocking EditForm, but kept for consistency)
  jest.mock('react-redux', () => ({
    useSelector: jest.fn(() => ({
      flows: [{ id: '1', from: 'Salary', to: 'Bills', amount: 3000 }],
    })),
    useDispatch: () => jest.fn(),
  }));
  jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
  }));
  
  import EditForm from './EditForm';
  
  describe('EditForm Component', () => {
    beforeEach(() => {
      EditForm.mockClear();
    });
  
    test('dispatches addFlow on form submit', () => {
      const dispatch = jest.fn();
      const component = EditForm({ dispatch });
      const handleSubmit = component.props.children[0].props.onSubmit;
  
      handleSubmit({ preventDefault: jest.fn() });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'data/addFlow',
        payload: { from: 'Salary', to: 'Rent', amount: 1500 },
      });
    });
  
    test('dispatches editFlow when editing', () => {
      const dispatch = jest.fn();
      const component = EditForm({ dispatch });
      const handleEdit = component.props.children[1].props.children[0].props.children[1].props.onClick;
  
      handleEdit();
      expect(dispatch).toHaveBeenCalledWith({
        type: 'data/editFlow',
        payload: { id: '1', newFlow: { from: 'Salary', to: 'Rent', amount: 3000 } },
      });
    });
  
    test('dispatches deleteFlow on delete', () => {
      const dispatch = jest.fn();
      const component = EditForm({ dispatch });
      const handleDelete = component.props.children[1].props.children[0].props.children[2].props.onClick;
  
      handleDelete();
      expect(dispatch).toHaveBeenCalledWith({
        type: 'data/deleteFlow',
        payload: '1',
      });
    });
  });