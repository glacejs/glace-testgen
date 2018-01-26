"use strict";

var gen = require("../../lib/generator");

scope("generator", () => {
    var sandbox = sinon.createSandbox();

    afterChunk(() => {
        sandbox.restore();
    });

    test(".generate()", () => {

        beforeChunk(() => {
            sandbox.stub(gen, "__loadSteps");
            sandbox.stub(gen, "__generateTests");
            sandbox.stub(gen, "__getUnusedSteps");
            sandbox.stub(gen, "__filterTests");
        });

        chunk(() => {
            gen.generate();
            expect(gen.__loadSteps.calledOnce).to.be.true;
            expect(gen.__generateTests.calledOnce).to.be.true;
            expect(gen.__getUnusedSteps.calledOnce).to.be.true;
            expect(gen.__filterTests.calledOnce).to.be.true;
        });
    });
});
