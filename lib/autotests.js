"use strict";

require("colors");
var prettyms = require("pretty-ms");
var U = require("glace-utils");

var CONF = require("./config");
var generate = require("./generator").generate;
var utils = require("./utils");

var tests = [], testSteps = [], unusedSteps;

if (CONF.gen.stepsFiles) {
    [tests, unusedSteps] = generate();
    if (unusedSteps.length) {
        var errmsg = "Unused steps detected!\n".red.bold;
        for (var s of unusedSteps) {
            errmsg += `  - ${s.name}\n`.red;
        };
        errmsg += "\nCheck steps income and outcome definitions".yellow;
        U.exit("Tests generator")(errmsg);
    }
}

var stepsString = t => t.steps.map(s => s.name).join(" ");

var merge = (bucket, tt) => {
    for (var [, steps] of Object.entries(tt)) {
        var ss = steps.join(" ");
        if (testSteps.includes(ss)) continue;
        testSteps.push(ss);

        var t = { steps: [] };
        for (var step of steps) {
            t.steps.push({ name: step });
        }
        bucket.push(t);
    }
};

if (CONF.gen.testsFiles) {

    var startTime = new Date();
    console.log("Loading pregenerated tests...".yellow);

    tests.forEach(t => testSteps.push(stepsString(t)));

    for (var testsFile of CONF.gen.testsFiles) {
        var tt = utils.loadFile(testsFile);
        merge(tests, tt);
    }

    console.log(`Pregenerated tests are loaded during ${prettyms(new Date() - startTime)}`.yellow);
}

suite(`${tests.length} generated tests`, () => {
    var n = 0;

    for (var t of tests) {
        test(`Test case #${++n}`, () => {

            before(() => {
                $.resetCtx();
            });

            t.steps.forEach(s => {

                chunk(s.name, async () => {
                    if (await $.isTestFailed()) return false;
                    await $[s.name]();
                });
            });
        });
    };
});
