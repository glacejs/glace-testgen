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

var s, d;

if (CONF.gen.outFile) {
    s = fs.createWriteStream(CONF.gen.outFile, { flags: "w" });
} else {
    d = U.switchColor();
};

exports.run = () => {
    var [tests, unusedSteps] = generate({ filter: CONF.gen.filter });
    self.__printTests(tests);
    self.__printUnusedSteps(unusedSteps);
};

exports.__printUnusedSteps = steps => {
    if (!steps.length) return;
    console.log("Unused steps detected!".red.bold);
    for (var s of steps) {
        console.log(`  - ${s.name}`.red);
    };
    console.log();
    console.log("Check steps income and outcome definitions".yellow);
    process.exit(1);
};

exports.__printTests = tests => {
    var count = 0;
    for (var t of tests) {
        self.__write(`Test case ${++count}:`, "yellow");
        for (var s of t.steps) self.__write(`  - ${s.name}`);
        self.__write("");
    };
};

exports.__write = (string, color) => {
    if (CONF.gen.outFile) {
        s.write(string + "\n");
    } else {
        if (color) {
            string = string[color];
        } else {
            string = d(string);
        };
        console.log(string);
    };
};

var self = exports;

process.on("uncaughtException", U.exit("Uncaught Exception"));
process.on("unhandledRejection", U.exit("Unhandled Rejection"));
