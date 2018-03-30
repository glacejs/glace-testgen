"use strict";

require("colors");
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
    var t, ss;
    for (t of tt) {
        ss = stepsString(t);
        if (testSteps.includes(ss)) continue;
        testSteps.push(ss);
        bucket.push(t);
    }
};

if (CONF.gen.testsFiles) {
    tests.forEach(t => testSteps.push(stepsString(t)));

    for (var testsFile of CONF.gen.testsFiles) {
        var tt = utils.loadFile(testsFile);
        merge(tests, tt);
    }
}

scope(`${tests.length} generated tests`, () => {
    var n = 0;

    for (var t of tests) {
        test(`Test case #${++n}`, () => {

            before(() => {
                SS.resetCtx();
            });

            t.steps.forEach(s => {

                chunk(s.name, async () => {
                    if (await SS.isTestFailed()) return false;
                    await SS[s.name]();
                });
            });
        });
    };
});
