"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
var EventBus = /** @class */ (function () {
    function EventBus(description) {
        this.eventTarget = document.appendChild(document.createComment(description));
    }
    EventBus.prototype.on = function (type, listener) {
        this.eventTarget.addEventListener(type, listener);
    };
    EventBus.prototype.once = function (type, listener) {
        this.eventTarget.addEventListener(type, listener, { once: true });
    };
    EventBus.prototype.off = function (type, listener) {
        this.eventTarget.removeEventListener(type, listener);
    };
    EventBus.prototype.emit = function (type, detail) {
        return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail: detail }));
    };
    return EventBus;
}());
var FrontendEventBus = /** @class */ (function () {
    function FrontendEventBus() {
        this.busIds = [];
        this.busRefs = [];
    }
    // returns an event bus with the given identifier
    FrontendEventBus.prototype.getEventBus = function (id) {
        var index = this.busIds.indexOf(id);
        var bus;
        if (index < 0) {
            bus = new EventBus("event-bus id: ".concat(id));
            this.busIds.push(id);
            this.busRefs.push(bus);
        }
        else {
            bus = this.busRefs[index];
        }
        return bus;
    };
    return FrontendEventBus;
}());
var instance = window === null || window === void 0 ? void 0 : window.EventBus;
exports.EventBus = instance;
if (!instance) {
    exports.EventBus = instance = new FrontendEventBus();
    window.EventBus = instance;
}
