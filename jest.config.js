module.exports = {
  setupFiles: [
    '<rootDir>/jest/setup.js',
  ],
  moduleDirectories: [
    'node_modules',
    '<rootDir>/src',
  ],
  // Don't transform 'node_modules' except 'antd', 'rc-utils' and 'rc-tabs' packages
  transformIgnorePatterns: [
    'node_modules/(?!rc-util)(?!antd)(?!rc-tabs).*',
  ],
  transform: {
    '^.+\\.(jsx|js)?$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/jest/fileTransform.js',
  },
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
};
