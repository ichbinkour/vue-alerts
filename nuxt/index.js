/*
Nuxt.js module for vue-alerts
Usage:
    - Install vue-alerts package
    - Add this into your nuxt.config.js file:
    {
        modules: [
            // Simple usage
            'vue-alerts/nuxt'
            // Optionally passing options in module configuration
            ['vue-alerts/nuxt', { ...options }]
        ],
        // Optionally passing options in module top level configuration
        VueAlerts: { ...options }
    }
*/

const { resolve } = require('path');

module.exports = function nuxtVueWaitModule(moduleOptions) {
  const options = Object.assign({}, this.options.VueAlerts, moduleOptions);

  // Register plugin
  this.addPlugin({
    src: resolve(__dirname, 'vue-alerts-plugin.template.js.tpl'),
    fileName: 'vue-alerts-plugin.js',
    options: options
  });
};

// required by nuxt
module.exports.meta = require('../package.json');
