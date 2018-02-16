"use strict";

require("colors");
var U = require("glace-utils");

var generate = require("./generator").generate;

var [tests, unusedSteps] = generate();

if (unusedSteps.length) {
    var errmsg = "Unused steps detected!\n".red.bold;
    for (var s of unusedSteps) {
        errmsg += `  - ${s.name}\n`.red;
    };
    errmsg += "\n\nCheck steps income and outcome definitions".yellow;
    U.exit("Tests generator")(errmsg);
};

scope("Generated tests", () => {
    var n = 0;

    for (var t of tests) {
        test(`Test case #${++n}`, () => {

            before(() => {
                SS.resetCtx();
            });

            t.steps.forEach(s => {

                chunk(s.name, async () => {
                    await SS[s.name]();
                });
            });
        });
    };
});
