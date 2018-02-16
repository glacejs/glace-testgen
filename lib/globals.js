"use strict";

/**
 * `Glace testgen` globals.
 *
 * @module
 */

var path = require("path");

var CONF = require("./config");

/* Add module which generates autotests for glace runner */
if (CONF.gen.testsOnly) {
    CONF.testDirs = [path.resolve(__dirname, "autotests.js")];
} else {
    CONF.testDirs.push(path.resolve(__dirname, "autotests.js"));
};
