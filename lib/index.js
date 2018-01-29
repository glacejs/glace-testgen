"use strict";

/**
 * Tests generator package.
 *
 * @module
 */

var config, generate;

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
        generate: function () {
            generate = generate || require("./generator").generate;
            return generate;
        },
    },
});
