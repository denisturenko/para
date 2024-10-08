process.env.TZ = 'UTC';

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  // verbose: true,
  // clearMocks: true,
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: 'jest-environment-jsdom',

  modulePaths: ['<rootDir>/src'],

  collectCoverage: false,
  // on node 14.x coverage provider v8 offers good speed and more or less good report
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/dist/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
  ],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    // '^.+\\.(css|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
    '(.*)\\.(css|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    // '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg|wav)$/i': '<rootDir>/src/__mocks__/fileMock.js',
    '(.*)\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg|wav)$': '<rootDir>/src/__mocks__/fileMock.js',

    'three/(.*)': '<rootDir>/node_modules/tree/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
};

module.exports = config;
