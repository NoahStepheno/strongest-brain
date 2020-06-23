const less = require('@remax/plugin-less');
const path = require('path')

module.exports = {
  one: true,
  output: 'dist/' + process.env.REMAX_PLATFORM,
  plugins: [
    less()
  ]
};
