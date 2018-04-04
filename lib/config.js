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

var path = require("path");

var _ = require("lodash");
var U = require("glace-utils");

var config = U.config;
var args = config.args;

config.gen = U.defVal(config.gen, {});

if (args._.length) {
    config.gen.stepsFiles = _.clone(args._);
}

if (args.genStepsFiles) {
    config.gen.stepsFiles = args.genStepsFiles.split(/ +/g).filter(o => o);
}

if (config.gen.stepsFiles) {
    config.gen.stepsFiles = config.gen.stepsFiles.map(f => path.resolve(U.cwd, f));
}

if (args.genTestsFiles) {
    config.gen.testsFiles = args.genTestsFiles.split(/ +/g).filter(o => o);
};

if (config.gen.testsFiles) {
    config.gen.testsFiles = config.gen.testsFiles.map(f => path.resolve(U.cwd, f));
};

config.gen.use = !!args.genStepsFiles || !!args.genTestsFiles;
config.gen.outFile = args.genOutputFile;
config.gen.filter = args.genStepsFilter;
config.gen.stepsUsage = args.genStepsUsage;
config.gen.namesOnly = !!args.genNamesOnly;
config.gen.stepsUniq = +(args.genStepsUniq || 0);
config.gen.testsMax = +args.genTestsMax;
config.gen.testsLimit = +(args.genTestsLimit || 1000000);
config.gen.stepsLimit = +(args.genStepsLimit || Infinity);
config.gen.testsOnly = !!args.genTestsOnly;
config.gen.testsShuffle = !!args.genTestsShuffle;
config.gen.trainResult = path.resolve(
    U.cwd, (args.genTrainResult || "train-result.json"));
if (args.genTrain) {
    config.gen.train = path.resolve(U.cwd, args.genTrain);
}
if (args.genLoadTrain) {
    config.gen.pretrain = path.resolve(U.cwd, args.genLoadTrain);
}
if (args.genTrainBefore) {
    config.gen.trainBefore = path.resolve(U.cwd, args.genTrainBefore);
}

if (config.gen.outFile &&
        !config.gen.outFile.endsWith(".yaml") &&
        !config.gen.outFile.endsWith(".yml")) {
    config.gen.outFile += ".yml";
};

module.exports = config;
