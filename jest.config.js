const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",   // ✅ THIS LINE FIXES EVERYTHING
  },

  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);