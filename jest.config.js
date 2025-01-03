// jest.config.js
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/app/$1",
  },
  testMatch: ["**/?(*.)+(test).+(ts|tsx|js)"],
};
