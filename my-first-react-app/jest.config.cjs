/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  setupFiles: ['./jest.polyfills.js'],
  testRegex: '((\\.|/*.)(test))\\.tsx?$',
  moduleNameMapper: {
    '^.+\\.(css|scss|png)$': 'babel-jest',
  },
  globals: {
    fetch,
    Headers,
    Request,
    Response,
    FormData,
    Blob,
  },
};
