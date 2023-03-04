const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  // transform: {
  //   // Use babel-jest to transpile tests with the next/babel preset
  //   // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
  //   "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  // },
  // transformIgnorePatterns: [
  //   // '<rootDir>/bower_components/',
  //   "<rootDir>/node_modules/",
  // ],
  // transform: {},
};

module.exports = createJestConfig(customJestConfig);

// createJestConfig returns an async function that returns a jest config -
// so instead of doing this:
// module.exports = createJestConfig(customJestConfig)

// Take the returned async function...
// const asyncConfig = createJestConfig(customJestConfig);

// // and wrap it...
// module.exports = async () => {
//   const config = await asyncConfig();
//   config.transformIgnorePatterns = [
//     // ...your ignore patterns
//   ];
//   return config;
// };
