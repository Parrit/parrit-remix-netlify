// jest.config.js
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/app/$1",
  },
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],
};
