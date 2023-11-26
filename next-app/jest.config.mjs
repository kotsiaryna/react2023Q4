import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  setupFiles: ['./jest.polyfills.js'],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  testRegex: '((\\.|/*.)(test))\\.tsx?$',
};

export default createJestConfig(config);
