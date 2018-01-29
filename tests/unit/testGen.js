"use strict";

var gen = rewire("../../lib/generator");

scope("generator", () => {
    var sandbox = sinon.createSandbox();

    afterChunk(() => {
        sandbox.restore();
        gen.__reset__();
    });

    test(".generate()", () => {
        var loadSteps, generateTests, getUnusedSteps, filterTests, filterByUniqSteps;

        beforeChunk(() => {
            loadSteps = sandbox.stub();
            generateTests = sandbox.stub();
            getUnusedSteps = sandbox.stub();
            filterTests = sandbox.stub();
            filterByUniqSteps = sandbox.stub();
            gen.__set__("loadSteps", loadSteps);
            gen.__set__("generateTests", generateTests);
            gen.__set__("getUnusedSteps", getUnusedSteps);
            gen.__set__("filterTests", filterTests);
            gen.__set__("filterByUniqSteps", filterByUniqSteps);
        });

        chunk(() => {
            gen.generate();
            expect(loadSteps).to.be.calledOnce;
            expect(generateTests).to.be.calledOnce;
            expect(getUnusedSteps).to.be.calledOnce;
            expect(filterTests).to.be.calledOnce;
            expect(filterByUniqSteps).to.be.calledOnce;
        });
    });
});
