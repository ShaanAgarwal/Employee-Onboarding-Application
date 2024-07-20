module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "controllers/**/*.js",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/test/"
  ]
};
