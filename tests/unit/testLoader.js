"use strict";

var loader = rewire("../../lib/loader");
var Step = require("../../lib/step");

scope("loader", () => {
    var sandbox = sinon.createSandbox();

    afterChunk(() => {
        sandbox.restore();
        loader.__reset__();
    });

    test(".__getSteps()", () => {
        chunk(() => {
            var res = loader.__get__("getSteps")([{ name: "step",
                income: "income",
                outcome: "outcome",
                usage: 2 }]);
            expect(res).has.length(1);
            expect(res[0] instanceof Step).to.be.true;
            expect(res[0].name).to.be.equal("step");
            expect(res[0].income).to.be.equal("income");
            expect(res[0].outcome).to.be.equal("outcome");
            expect(res[0].usage).to.be.equal(2);
        });
    });
});
