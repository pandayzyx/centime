export const fetchInitialData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          ['Salary', 'Bills', 3000],
          ['Salary', 'Savings', 2000],
          ['Bills', 'Electric Bill', 1000],
          ['Bills', 'Mobile Bill', 2000],
        ]);
      }, 500); // Simulate API delay
    });
  };