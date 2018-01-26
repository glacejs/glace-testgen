"use strict";

var loader = require("../../lib/loader");
var Step = require("../../lib/step");

scope("loader", () => {
    var sandbox = sinon.createSandbox();

    afterChunk(() => {
        sandbox.restore();
    });

    test(".loadSteps()", () => {

        beforeChunk(() => {
            sandbox.stub(loader, "__loadFile");
            sandbox.stub(loader, "__getSteps");
        });

        chunk(() => {
            loader.loadSteps();
            expect(loader.__loadFile.calledOnce).to.be.true;
            expect(loader.__getSteps.calledOnce).to.be.true;
        });
    });

    test(".__loadFile()", () => {

        beforeChunk(() => {
            sandbox.stub(loader.__fs, "readFileSync");
            sandbox.stub(loader.__yaml, "safeLoad");
            sandbox.stub(loader.__U, "loadJson");
        });

        [
            "/path/to/steps.yml",
            "/path/to/steps.yaml",
        ].forEach(filePath => {
            chunk(`loads yaml ${filePath}`, () => {
                loader.__loadFile(filePath);
                expect(loader.__fs.readFileSync.calledOnce).to.be.true;
                expect(loader.__yaml.safeLoad.calledOnce).to.be.true;
                expect(loader.__U.loadJson.called).to.be.false;
            });
        });

        chunk("loads json", () => {
            loader.__loadFile("/path/to/steps");
            expect(loader.__fs.readFileSync.calledOnce).to.be.false;
            expect(loader.__yaml.safeLoad.calledOnce).to.be.false;
            expect(loader.__U.loadJson.called).to.be.true;
        });
    });

    test(".__getSteps()", () => {
        chunk(() => {
            var res = loader.__getSteps([{ name: "step",
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
