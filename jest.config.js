export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  setupFiles: ['./js/test/setup.js'],
  testMatch: ['**/*.test.js'],
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.pnp\\.[^\\/]+$'
  ]
}; 