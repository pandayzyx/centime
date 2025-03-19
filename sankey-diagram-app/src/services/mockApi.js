export const fetchInitialData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', from: 'Salary', to: 'Bills', amount: 3000 },
        { id: '2', from: 'Salary', to: 'Savings', amount: 2000 },
        { id: '3', from: 'Bills', to: 'Electric Bill', amount: 1000 },
        { id: '4', from: 'Bills', to: 'Mobile Bill', amount: 2000 },
      ]);
    }, 500); // Simulate API delay
  });
};