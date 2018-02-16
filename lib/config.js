"use strict";

/**
 * `GlaceJS` tests generator config.
 *
 * @namespace GlaceConfig
 * @prop {object} gen - Generator options.
 * @prop {string} gen.stepsFile - File path to load steps description. May be
 *  `json` or `yaml` format.
 * @prop {string} gen.outFile - File path to save generator output (`yaml` format).
 *  If file path doesn't have `yaml` extension it will be added.
 * @prop {number} gen.stepsUsage - Number of step usage in test case. Overrides
 *  the same value for individual steps.
 * @prop {string} gen.filter - Chunk of step name in order to choose tests
 *  which contain this step.
 * @prop {boolean} [gen.namesOnly=false] - Flag to print only step names without
 *  full info.
 * @prop {number} [gen.stepsUniq=0] - Amount of uniq sequences of steps in
 *  order to filter tests.
 * @prop {number} [gen.testsLimit=1000000] - Maximum amount of tests.
 * @prop {number} [gen.stepsLimit] - Maximum amount of steps per test.
 */

var U = require("glace-utils");

var config = U.config;
var args = config.args;

config.gen = U.defVal(config.gen, {});

if (args._ && args._[0]) {
    config.gen.stepsFile = args._[0];
};

config.gen.stepsFile = config.gen.stepsFile || args.genStepsFile;
config.gen.outFile = args.genOutputFile;
config.gen.filter = args.genFilter;
config.gen.stepsUsage = args.genStepsUsage;
config.gen.namesOnly = !!args.genNamesOnly;
config.gen.stepsUniq = +(args.genStepsUniq || 0);
config.gen.testsLimit = +(args.genLimitTests || 1000000);
config.gen.stepsLimit = +(args.genLimitSteps || Infinity);
config.gen.testsOnly = !!args.genTestsOnly;

if (config.gen.outFile &&
        !config.gen.outFile.endsWith(".yaml") &&
        !config.gen.outFile.endsWith(".yml")) {
    config.gen.outFile += ".yml";
};

module.exports = config;
