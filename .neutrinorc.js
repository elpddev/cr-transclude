const airbnbBase = require('@neutrinojs/airbnb-base');
const library = require('@neutrinojs/library');
const karma = require('@neutrinojs/karma');
const { join } = require('path');

const jqueryPath = require.resolve('jquery');
const angularPath = require.resolve('angular/angular.js');
const angularMockPath = require.resolve('angular-mocks/angular-mocks.js');

const tests = join(__dirname, 'test/**/*_test.js');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    airbnbBase(),
    library({
      name: 'cr-transclude'
    }),
    karma({
      files: [
        { pattern: jqueryPath, included: true, watched: false },
        { pattern: angularPath, included: true, watched: false },
        { pattern: angularMockPath, included: true, watched: false },
        {
          pattern: tests,
          watched: false,
          included: true,
          served: true,
        },
      ],
    }),
  ],
};
