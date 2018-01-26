"use strict";

var Step = require("../../lib/step");

scope("step", () => {

    var step = new Step("step", "income", "outcome");

    test("step instance", () => {
        expect(step.name).to.be.equal("step");
        expect(step.income).to.be.equal("income");
        expect(step.outcome).to.be.equal("outcome");
        expect(step.usage).to.be.equal(1);
    });

    test("step.clone()", () => {
        var clone = step.clone();
        expect(clone).to.not.be.equal(step);
        expect(step.name).to.be.equal("step");
        expect(step.income).to.be.equal("income");
        expect(step.outcome).to.be.equal("outcome");
        expect(step.usage).to.be.equal(1);
    });
});
