const { defineConfig } = require("cypress")  

module.exports = defineConfig({
  viewportHeight: 1024,
  viewportWidth: 1700,
  e2e: {
    fixturesFolder: false,
    retries: {
      runMode: 2,
      openMode: 0,
    }
  },
});
