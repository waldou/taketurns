module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '<rootDir>/src/**/*.test.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  coverageDirectory: '<rootDir>/.coverage/',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.vue',
    '!<rootDir>/src/**/*.js',
    '!<rootDir>/src/App.vue',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  }
}