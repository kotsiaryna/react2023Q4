import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testRegex: '((\\.|/*.)(test))\\.tsx?$',
};

export default createJestConfig(config);
