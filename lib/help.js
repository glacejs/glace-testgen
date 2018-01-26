"use strict";
/**
 * Help description.
 *
 * @module
 */

require("colors");
var U = require("glace-utils");

var d = U.switchColor();

U.help(d)
    .usage("\ntest-gen path/to/steps/file [options]".white.bold)
    .options({
        "file <output>": {
            describe: d("Path to output file (yaml format)"),
            type: "string",
            alias: "f",
            group: "Test-gen:",
        },
        "usage <number>": {
            describe: d("Number of steps usage in test case"),
            type: "number",
            group: "Test-gen:",
        },
        "filter <chunk>": {
            describe: d("Chunk of step name to filter tests"),
            type: "string",
            group: "Test-gen:",
        },
    })
    .argv;
