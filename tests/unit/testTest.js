"use strict";

var Test = require("../../lib/test");

scope("test", () => {

    test("test instance", () => {
        var t;

        beforeChunk(() => {
            t = new Test();
        });

        chunk("created", () => {
            expect(t.isChanged).to.be.false;
            expect(t.state).to.be.null;
            expect(t.steps).to.be.empty;
        });

        scope(".mayAdd()", () => {

            chunk("returns true", () => {
                expect(t.mayAdd({ income: null })).to.be.true;
            });

            chunk("returns false", () => {
                expect(t.mayAdd({ income: { app: true }})).to.be.false;
            });
        });

        scope(".add()", () => {

            chunk("if no state", () => {
                t.add({ outcome: { app: true }});
                expect(t.state.app).to.be.true;
                expect(t.steps).has.length(1);
                expect(t.isChanged).to.be.true;
            });

            chunk("if state is", () => {
                t.state = { app: { loaded: true }};
                t.add({ outcome: { app: { opened: true }}});
                expect(t.state.app.loaded).to.be.true;
                expect(t.state.app.opened).to.be.true;
                expect(t.steps).has.length(1);
                expect(t.isChanged).to.be.true;
            });
        });

        chunk(".clone()", () => {
            t.state = { app: true };
            var clone = t.clone();
            expect(clone).to.not.be.equal(t);
            expect(clone.isChanged).to.be.equal(t.isChanged);
            expect(clone.state).to.not.be.equal(t.state);
            expect(clone.steps).to.not.be.equal(t.steps);
            expect(clone.steps).has.length(t.steps.length);
        });

        chunk(".commit()", () => {
            t.isChanged = true;
            t.commit();
            expect(t.isChanged).to.be.false;
        });

        chunk("._amount()", () => {
            var step = { name: "hello" }
            t.steps.push(step);
            expect(t._amount(step)).to.be.equal(1);
        });
    });
});
