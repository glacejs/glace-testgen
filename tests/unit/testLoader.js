"use strict";

var loader = rewire("../../lib/loader");
var Step = require("../../lib/step");

scope("loader", () => {
    var sandbox = sinon.createSandbox();

    afterChunk(() => {
        sandbox.restore();
        loader.__reset__();
    });

    test(".loadSteps()", () => {
        var loadFile, getSteps;

        beforeChunk(() => {
            loadFile = sandbox.stub();
            loader.__set__("loadFile", loadFile);
            getSteps = sandbox.stub();
            loader.__set__("getSteps", getSteps);
        });

        chunk(() => {
            loader.loadSteps();
            expect(loadFile).to.be.calledOnce;
            expect(getSteps).to.be.calledOnce;
        });
    });

    test(".loadFile()", () => {
        var fs, yaml, U;

        beforeChunk(() => {
            fs = loader.__get__("fs");
            sandbox.stub(fs, "readFileSync");
            yaml = loader.__get__("yaml");
            sandbox.stub(yaml, "safeLoad");
            U = loader.__get__("U");
            sandbox.stub(U, "loadJson");
        });

        [
            "/path/to/steps.yml",
            "/path/to/steps.yaml",
        ].forEach(filePath => {
            chunk(`loads yaml ${filePath}`, () => {
                loader.__get__("loadFile")(filePath);
                expect(fs.readFileSync.calledOnce).to.be.true;
                expect(yaml.safeLoad.calledOnce).to.be.true;
                expect(U.loadJson.called).to.be.false;
            });
        });

        chunk("loads json", () => {
            loader.__get__("loadFile")("/path/to/steps");
            expect(fs.readFileSync.calledOnce).to.be.false;
            expect(yaml.safeLoad.calledOnce).to.be.false;
            expect(U.loadJson.called).to.be.true;
        });
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
