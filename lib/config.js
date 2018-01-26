"use strict";

/**
 * `GlaceJS` tests generator config.
 *
 * @namespace GlaceConfig
 * @prop {object} gen - Generator options.
 * @prop {string} gen.outFile - File path to save generator output (`yaml` format).
 *  If file path doesn't have `yaml` extension it will be added.
 * @prop {string} gen.stepsFile - File path to load steps description. May be
 *  `json` or `yaml` format.
 * @prop {number} gen.stepsUsage - Number of step usage in test case. Overrides
 *  the same value for individual steps.
 */

var U = require("glace-utils");

var config = U.config;
var args = config.args;

config.gen = U.defVal(config.gen, {});
config.gen.outFile = args.f || args.file;
config.gen.filter = args.filter;
config.gen.stepsUsage = args.usage;

if (args._ && args._[0]) {
    config.gen.stepsFile = args._[0];
};

if (config.gen.outFile &&
        !config.gen.outFile.endsWith(".yaml") &&
        !config.gen.outFile.endsWith(".yml")) {
    config.gen.outFile += ".yml";
};

module.exports = config;
