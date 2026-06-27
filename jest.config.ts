export default {
  testTimeout: 30000,
  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
      },
      transformIgnorePatterns: ['/node_modules/(?!(jose)/)'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
      testMatch: [
        '<rootDir>/tests/*.test.ts',
        '<rootDir>/tests/*.test.tsx',
      ],
    },
    {
      displayName: 'integration',
      testEnvironment: 'node',
      transform: {
        '^.+\\.ts$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
        // Transform ESM-only packages (jose ships webapi-only ESM in v6)
        '^.+\\.js$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' }, diagnostics: false }],
      },
      transformIgnorePatterns: ['/node_modules/(?!(jose)/)'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
      testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
      setupFiles: ['<rootDir>/tests/integration/setup.ts'],
      // Integration tests hit real DB — allow more time
      testTimeout: 30000,
    },
  ],
};
