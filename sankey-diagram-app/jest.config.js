module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest', // Handle JS/JSX with Babel
    },
    moduleNameMapper: {
      '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image files
    },
  };