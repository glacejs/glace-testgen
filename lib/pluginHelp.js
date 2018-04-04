"use strict";

/**
 * `Glace testgen` plugin help.
 * 
 * @function
 */

module.exports = (args, d) => {
    return args
        .options({
            "gen-steps-filter <chunk>": {
                describe: d("Chunk of step name to filter tests."),
                type: "string",
                group: "Test-gen:",
            },
            "gen-steps-uniq [number]": {
                describe: d("Number of steps in unique sequence to filter tests.",
                    "Default is unlimited."),
                type: "number",
                group: "Test-gen:",
            },
            "gen-tests-limit [number]": {
                describe: d("Maximum amount of generated tests.",
                    "Default is 1000000."),
                type: "number",
                group: "Test-gen:",
            },
            "gen-steps-limit [number]": {
                describe: d("Maximum amount of steps per test.",
                    "Default is unlimited."),
                type: "number",
                group: "Test-gen:",
            },
            "gen-names-only": {
                describe: d("Flag to print only step names."),
                type: "boolean",
                group: "Test-gen:",
            },
            "gen-steps-usage <number>": {
                describe: d("Number of steps usage in test case."),
                type: "number",
                group: "Test-gen:",
            },
            "gen-steps-files <sequence>": {
                describe: d("Space-separated sequence of paths to steps file (yaml or json format).",
                    "As alternate to specify path to steps file in plugin mode."),
                type: "string",
                group: "Test-gen:",
            },
            "gen-tests-files <sequence>": {
                describe: d("Space-separated sequence of paths to files with",
                    "pregenerated tests (yaml or json format)."),
                type: "string",
                group: "Test-gen:",
            },
            "gen-tests-only": {
                describe: d("Flag to exclude other found tests and launch",
                    "only generated tests in plugin mode."),
                type: "boolean",
                group: "Test-gen:",
            },
            "gen-tests-shuffle": {
                describe: d("Shuffle tests during generating.",
                    "Provides more steps sequence randomization,",
                    "but tests will be different in generating runs."),
                type: "boolean",
                group: "Test-gen:",
            },
            "gen-load-train <path>": {
                describe: d("Path to file with pretrained model,",
                    "which will be before generating."),
                type: "string",
                group: "Test-gen:",
            },
            "gen-train-before <path>": {
                describe: d("Path to file with tests for training before generating."),
                type: "string",
                group: "Test-gen:",
            },
        });
};
