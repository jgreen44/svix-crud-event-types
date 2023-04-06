module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': 'babel-jest',
  },
  transformIgnorePattern: ['<rootDir>/node_modules/(?!axios)/'],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
  testPathIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'jsdom',
};
