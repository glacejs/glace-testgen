"use strict";

var CONF = require("../../lib/config");
var cli = rewire("../../lib/cli");

scope("cli", () => {
    var sandbox = sinon.createSandbox();

    afterChunk(() => {
        sandbox.restore();
        cli.__reset__();
    });

    test(".run()", () => {
        var generate, printTests, printUnusedSteps;

        beforeChunk(() => {
            generate = sandbox.stub().returns([1, 2]);
            cli.__set__("generate", generate);
            printTests = sandbox.spy()
            cli.__set__("printTests", printTests);
            printUnusedSteps = sandbox.spy();
            cli.__set__("printUnusedSteps", printUnusedSteps);
        });

        chunk(() => {
            cli.run();
            expect(generate).to.be.calledOnce;
            expect(generate.args[0][0]).has.property("filter");
            expect(printTests).to.be.calledOnce;
            expect(printTests.args[0][0]).to.be.equal(1);
            expect(printUnusedSteps).to.be.calledOnce;
            expect(printUnusedSteps.args[0][0]).to.be.equal(2);
        });
    });

    test(".printUnusedSteps()", () => {

        beforeChunk(() => {
            sandbox.stub(console, "log");
            sandbox.stub(process, "exit");
        });

        chunk("prints if steps are", () => {
            cli.__get__("printUnusedSteps")([{ name: "" }]);
            expect(console.log).to.have.callCount(4);
            expect(process.exit).to.be.calledOnce;
            console.log.restore();
        });

        chunk("doesn't print if no steps", () => {
            cli.__get__("printUnusedSteps")([]);
            expect(console.log).to.not.be.called;
            expect(process.exit).to.not.be.called;
            console.log.restore();
        });
    });

    test(".write()", () => {
        var write, stream;

        beforeChunk(() => {
            write = cli.__get__("write");
            stream = { write: sinon.spy() };
            cli.__set__("stream", stream);
        });

        chunk("to stdout", () => {
            sandbox.stub(console, "log");
            CONF.gen.outFile = null;
            write("");
            expect(console.log).to.be.calledOnce;
            console.log.restore();
        });

        chunk("to file", () => {
            CONF.gen.outFile = "/path/to/file.yml";
            write("");
            expect(stream.write).to.be.calledOnce;
        });
    });

    test(".printTests()", () => {
        var printTests, write;

        beforeChunk(() => {
            printTests = cli.__get__("printTests");
            write = sandbox.stub();
            cli.__set__("write", write);
        });

        chunk("doesn't print if no tests", () => {
            printTests([]);
            expect(write).to.not.be.called;
        });

        chunk("prints only step names", () => {
            CONF.gen.namesOnly = true;
            printTests([{ steps: [{ name: "" }] }]);
            expect(write).to.have.callCount(3);
        });

        chunk("prints full steps info", () => {
            CONF.gen.namesOnly = false;
            printTests([{ steps: [{ name: "", actions: [""], expected: [""] }] }]);
            expect(write).to.have.callCount(6);
        });
    });
});
