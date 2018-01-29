"use strict";

/**
 * `GlaceJS` tests generator.
 *
 * @module
 */

require("./help");

var fs = require("fs");

var U = require("glace-utils");

var CONF = require("./config");
var generate = require("./generator").generate;

var stream;
if (CONF.gen.outFile) {
    stream = fs.createWriteStream(CONF.gen.outFile, { flags: "w" });
};

/**
 * Runs tests generator.
 *
 * @function
 */
exports.run = () => {
    var [tests, unusedSteps] = generate({ filter: CONF.gen.filter });
    printTests(tests);
    printUnusedSteps(unusedSteps);
};

/**
 * @ignore
 * @function
 * @arg {Step[]} steps
 */
var printUnusedSteps = steps => {
    if (!steps.length) return;
    console.log("Unused steps detected!".red.bold);
    for (var s of steps) console.log(`  - ${s.name}`.red);
    console.log();
    console.log("Check steps income and outcome definitions".yellow);
    process.exit(1);
};

/**
 * @ignore
 * @function
 * @arg {Test[]} tests
 */
var printTests = tests => {
    var count = 0;

    for (var t of tests) {
        write(`Test case ${++count}:`, "yellow");

        for (var s of t.steps) {
            var name = `  - ${s.name}`;

            if (CONF.gen.namesOnly) {
                write(name, "green");
                continue;
            };

            if (s.actions.length) name += ":";
            write(name, "green");

            for (var act of s.actions) {
                write(`    - ${act}`, "blue");
            };

            if (s.expected.length) {
                write(`  - expected:`, "red");

                for (var e of s.expected) {
                    write(`    - ${e}`, "magenta");
                };
            };
        };
        write("");
    };
};

/**
 * @ignore
 * @function
 * @arg {string} string 
 * @arg {string} color 
 */
var write = (string, color) => {
    if (CONF.gen.outFile) {
        stream.write(string + "\n");
    } else {
        if (color) string = string[color];
        console.log(string);
    };
};

process.on("uncaughtException", U.exit("Uncaught Exception"));
process.on("unhandledRejection", U.exit("Unhandled Rejection"));
