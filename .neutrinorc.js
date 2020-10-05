const airbnbBase = require('@neutrinojs/airbnb-base');
const library = require('@neutrinojs/library');
const karma = require('@neutrinojs/karma');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    airbnbBase(),
    library({
      name: 'cr-transclude'
    }),
    karma(),
  ],
};
