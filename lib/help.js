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
    .usage("\ntest-gen sequence-of-files [options]".white.bold)
    .options({
        "gen-output-file <path>": {
            describe: d("Path to output file with generated tests (yaml format)."),
            type: "string",
            group: "Test-gen:",
        },
        "gen-train <path>": {
            describe: d("Path to file with tests for generator training."),
            type: "string",
            group: "Test-gen:",
        },
        "gen-train-result [path]": {
            describe: d("Path to file with training result. Default is 'cwd/train-result.json'."),
            type: "string",
            group: "Test-gen:",
        },
    }),
d).argv;
