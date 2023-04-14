class EventBus<DetailType = any> {
    protected eventTarget: EventTarget;

    constructor(description: string) {
        this.eventTarget = document.appendChild(
            document.createComment(description)
        );
    }

    on(type: string, listener: (event: CustomEvent<DetailType>) => void) {
        this.eventTarget.addEventListener(type, listener);
    }

    once(type: string, listener: (event: CustomEvent<DetailType>) => void) {
        this.eventTarget.addEventListener(type, listener, { once: true });
    }

    off(type: string, listener: (event: CustomEvent<DetailType>) => void) {
        this.eventTarget.removeEventListener(type, listener);
    }

    emit(type: string, detail?: DetailType) {
        return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
    }
}

class FrontendEventBus {
    protected busIds: string[];
    protected busRefs: EventBus[];

    constructor() {
        this.busIds = [];
        this.busRefs = [];
    }

    // returns an event bus with the given identifier
    getEventBus(id: string) {
        const index = this.busIds.indexOf(id);

        let bus;
        if (index < 0) {
            bus = new EventBus(`event-bus id: ${id}`);

            this.busIds.push(id);
            this.busRefs.push(bus);
        } else {
            bus = this.busRefs[index];
        }

        return bus;
    }
}

let instance = (window as any)?.EventBus;
if (!instance) {
    instance = new FrontendEventBus();
    (window as any).EventBus = instance;
}

export { instance as EventBus };
