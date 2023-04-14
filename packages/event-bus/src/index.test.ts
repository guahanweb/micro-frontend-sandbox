import { EventBus } from ".";

describe ('EventBus', () => {
    it ('should be defined', () => {
        expect(EventBus).toBeDefined();
        expect(EventBus.getEventBus).toBeInstanceOf(Function);
    });

    it ('should create an event bus', () => {
        const bus = EventBus.getEventBus('my-id');
        expect(bus).toBeDefined();
        expect(bus.on).toBeInstanceOf(Function);
        expect(bus.once).toBeInstanceOf(Function);
        expect(bus.off).toBeInstanceOf(Function);
        expect(bus.emit).toBeInstanceOf(Function);
    });

    describe ('listeners', () => {
        const listener = jest.fn();

        beforeEach(() => {
            listener.mockClear();
        });

        it ('should bind a listener and receive events', () => {
            const bus = EventBus.getEventBus('test-events');
            bus.on('run-test', listener);
            bus.emit('run-test', 'foobar');
            bus.emit('run-test', { fizz: 'buzz' });

            // first call
            expect(listener).toHaveBeenCalledTimes(2);
            expect(listener.mock.calls[0][0].detail).toEqual('foobar');

            // second call
            const { detail } = listener.mock.calls[1][0];
            expect(detail).toBeInstanceOf(Object);
            expect(detail.fizz).toEqual('buzz');

            // clean up
            bus.off('run-test', listener);
        });

        it ('once() should unbind after first receipt', () => {
            const bus = EventBus.getEventBus('test-events');
            bus.once('run-test', listener);
            bus.emit('run-test', 'one');
            bus.emit('run-test', 'two');

            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener.mock.calls[0][0].detail).toEqual('one');
        });
    });
});
