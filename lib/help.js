"use strict";

/**
 * Help description.
 *
 * @module
 */

require("colors");
var U = require("glace-utils");

var help = require("./pluginHelp");

var d = U.switchColor();

help(U.help(d)
    .usage("\ntest-gen sequence-of-files [options]".white.bold),
d).argv;
