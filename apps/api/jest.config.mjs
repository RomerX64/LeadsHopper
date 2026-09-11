export default {
  displayName: "api",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
  transform: {
    "^.+\\.[jt]sx?$": [
      "@swc/jest",
      {
        module: { type: "es6" },
        jsc: {
          parser: { syntax: "typescript", decorators: true },
          transform: { decoratorMetadata: true },
        },
      },
    ],
  },
};
