"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
describe('EventBus', function () {
    it('should be defined', function () {
        expect(_1.EventBus).toBeDefined();
        expect(_1.EventBus.getEventBus).toBeInstanceOf(Function);
    });
    it('should create an event bus', function () {
        var bus = _1.EventBus.getEventBus('my-id');
        expect(bus).toBeDefined();
        expect(bus.on).toBeInstanceOf(Function);
        expect(bus.once).toBeInstanceOf(Function);
        expect(bus.off).toBeInstanceOf(Function);
        expect(bus.emit).toBeInstanceOf(Function);
    });
    describe('listeners', function () {
        var listener = jest.fn();
        beforeEach(function () {
            listener.mockClear();
        });
        it('should bind a listener and receive events', function () {
            var bus = _1.EventBus.getEventBus('test-events');
            bus.on('run-test', listener);
            bus.emit('run-test', 'foobar');
            bus.emit('run-test', { fizz: 'buzz' });
            // first call
            expect(listener).toHaveBeenCalledTimes(2);
            expect(listener.mock.calls[0][0].detail).toEqual('foobar');
            // second call
            var detail = listener.mock.calls[1][0].detail;
            expect(detail).toBeInstanceOf(Object);
            expect(detail.fizz).toEqual('buzz');
            // clean up
            bus.off('run-test', listener);
        });
        it('once() should unbind after first receipt', function () {
            var bus = _1.EventBus.getEventBus('test-events');
            bus.once('run-test', listener);
            bus.emit('run-test', 'one');
            bus.emit('run-test', 'two');
            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener.mock.calls[0][0].detail).toEqual('one');
        });
    });
});
