"use strict";

/**
 * Tests generator package.
 *
 * @module
 */

var config, generate, globals, pluginHelp;

Object.defineProperties(exports, {
    /**
     * @type {GlaceConfig}
     */
    config: {
        get: function() {
            config = config || require("./config");
            return config;
        },
    },
    generate: {
        get: function () {
            generate = generate || require("./generator").generate;
            return generate;
        },
    },
    globals: {
        get: function () {
            globals = globals || require("./globals");
            return globals;
        },
    },
    /**
     * @type {pluginHelp}
     */
    pluginHelp: {
        get: function () {
            pluginHelp = pluginHelp || require("./pluginHelp");
            return pluginHelp;
        },
    },
});
