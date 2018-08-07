/// <reference path="../../../globals.d.ts"/>
/// <reference path="./eventtarget.d.ts"/>
/// <reference path="./eventhandler.d.ts"/>
/// <reference path="../async/conditionaldelay.d.ts"/>
/// <reference path="../log/log.d.ts"/>
/// <reference path="./browserevent.d.ts"/>

declare module 'goog:goog.events.PasteHandler' {
    import alias = goog.events.PasteHandler;
    export default alias;
}

declare module 'goog:goog.events.PasteHandler.State' {
    import alias = goog.events.PasteHandler.State;
    export default alias;
}

declare module 'goog:goog.events.PasteHandler.EventType' {
    import alias = goog.events.PasteHandler.EventType;
    export default alias;
}

declare namespace goog.events {
    /**
     * A paste event detector. Gets an `element` as parameter and fires
     * `goog.events.PasteHandler.EventType.PASTE` events when text is
     * pasted in the `element`. Uses heuristics to detect paste events in FF2.
     * See more details of the heuristic on {@link #handleEvent_}.
     *
     * @extends {goog.events.EventTarget}
     */
    class PasteHandler extends __PasteHandler {}
    abstract class __PasteHandler extends goog.events.__EventTarget {
        /**
         * @param {Element} element The textarea element we are listening on.
         */
        constructor(element: Element);

        /**
         * The element that you want to listen for paste events on.
         * @type {Element}
         * @private
         */
        private element_: Element;

        /**
         * The last known value of the element. Kept to check if things changed. See
         * more details on {@link #handleEvent_}.
         * @type {string}
         * @private
         */
        private oldValue_: string;

        /**
         * Handler for events.
         * @type {goog.events.EventHandler<!goog.events.PasteHandler>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.events.PasteHandler>;

        /**
         * The last time an event occurred on the element. Kept to check whether the
         * last event was generated by two input events or by multiple fast key events
         * that got swallowed. See more details on {@link #handleEvent_}.
         * @type {number}
         * @private
         */
        private lastTime_: number;

        /**
         * ConditionalDelay used to poll for changes in the text element once users
         * paste text. Browsers fire paste events BEFORE the text is actually present
         * in the element.value property.
         * @type {goog.async.ConditionalDelay}
         * @private
         */
        private delay_: goog.async.ConditionalDelay;

        /**
         * The initial state of the paste detection algorithm.
         * @type {goog.events.PasteHandler.State}
         * @private
         */
        private state_: goog.events.PasteHandler.State;

        /**
         * The previous event that caused us to be on the current state.
         * @type {?string}
         * @private
         */
        private previousEvent_: string|null;

        /**
         * A logger, used to help us debug the algorithm.
         * @type {goog.log.Logger}
         * @private
         */
        private logger_: goog.log.Logger;

        /**
         * Returns the current state of the paste detection algorithm. Used mostly for
         * testing.
         * @return {goog.events.PasteHandler.State} The current state of the class.
         */
        getState(): goog.events.PasteHandler.State;

        /**
         * Returns the event handler.
         * @return {goog.events.EventHandler<T>} The event handler.
         * @protected
         * @this {T}
         * @template T
         */
        protected getEventHandler(): goog.events.EventHandler<this>;

        /**
         * Checks whether the element.value property was updated, and if so, dispatches
         * the event that let clients know that the text is available.
         * @return {boolean} Whether the polling should stop or not, based on whether
         *     we found a text change or not.
         * @private
         */
        private checkUpdatedText_(): boolean;

        /**
         * Dispatches the paste event.
         * @param {goog.events.BrowserEvent} e The underlying browser event.
         * @private
         */
        private dispatch_(e: goog.events.BrowserEvent): void;

        /**
         * The main event handler which implements a state machine.
         *
         * To handle FF2, we enumerate and cover all the known ways a user can paste:
         *
         * 1) ctrl+v, shift+insert, cmd+v
         * 2) right click -> paste
         * 3) edit menu -> paste
         * 4) drag and drop
         * 5) middle click
         *
         * (1) is easy and can be detected by listening for key events and finding out
         * which keys are pressed. (2), (3), (4) and (5) do not generate a key event,
         * so we need to listen for more than that. (2-5) all generate 'input' events,
         * but so does key events. So we need to have some sort of 'how did the input
         * event was generated' history algorithm.
         *
         * (2) is an interesting case in Opera on a Mac: since Macs does not have two
         * buttons, right clicking involves pressing the CTRL key. Even more interesting
         * is the fact that opera does NOT set the e.ctrlKey bit. Instead, it sets
         * e.keyCode = 0.
         * {@link http://www.quirksmode.org/js/keys.html}
         *
         * (1) is also an interesting case in Opera on a Mac: Opera is the only browser
         * covered by this class that can detect the cmd key (FF2 can't apparently). And
         * it fires e.keyCode = 17, which is the CTRL key code.
         * {@link http://www.quirksmode.org/js/keys.html}
         *
         * NOTE(user, pbarry): There is an interesting thing about (5): on Linux, (5)
         * pastes the last thing that you highlighted, not the last thing that you
         * ctrl+c'ed. This code will still generate a `PASTE` event though.
         *
         * We enumerate all the possible steps a user can take to paste text and we
         * implemented the transition between the steps in a state machine. The
         * following is the design of the state machine:
         *
         * matching paths:
         *
         * (1) happens on INIT -> FOCUSED -> TYPING -> [e.ctrlKey & e.keyCode = 'v']
         * (2-3) happens on INIT -> FOCUSED -> [input event happened]
         * (4) happens on INIT -> [mouseover && text changed]
         *
         * non matching paths:
         *
         * user is typing normally
         * INIT -> FOCUS -> TYPING -> INPUT -> INIT
         *
         * @param {goog.events.BrowserEvent} e The underlying browser event.
         * @private
         */
        private handleEvent_(e: goog.events.BrowserEvent): void;

        /**
         * `goog.events.PasteHandler.EventType.INIT` is the first initial state
         * the textarea is found. You can only leave this state by setting focus on the
         * textarea, which is how users will input text. You can also paste things using
         * drag and drop, which will not generate a `goog.events.EventType.FOCUS`
         * event, but will generate a `goog.events.EventType.MOUSEOVER`.
         *
         * For browsers that support the 'paste' event, we match it and stay on the same
         * state.
         *
         * @param {goog.events.BrowserEvent} e The underlying browser event.
         * @private
         */
        private handleUnderInit_(e: goog.events.BrowserEvent): void;

        /**
         * `goog.events.PasteHandler.EventType.FOCUSED` is typically the second
         * state the textarea will be, which is followed by the `INIT` state. On
         * this state, users can paste in three different ways: edit -> paste,
         * right click -> paste and drag and drop.
         *
         * The latter will generate a `goog.events.EventType.MOUSEOVER` event,
         * which we match by making sure the textarea text changed. The first two will
         * generate an 'input', which we match by making sure it was NOT generated by a
         * key event (which also generates an 'input' event).
         *
         * Unfortunately, in Firefox, if you type fast, some KEYDOWN events are
         * swallowed but an INPUT event may still happen. That means we need to
         * differentiate between two consecutive INPUT events being generated either by
         * swallowed key events OR by a valid edit -> paste -> edit -> paste action. We
         * do this by checking a minimum time between the two events. This heuristic
         * seems to work well, but it is obviously a heuristic :).
         *
         * @param {goog.events.BrowserEvent} e The underlying browser event.
         * @private
         */
        private handleUnderFocused_(e: goog.events.BrowserEvent): void;

        /**
         * `goog.events.PasteHandler.EventType.TYPING` is the third state
         * this class can be. It exists because each KEYPRESS event will ALSO generate
         * an INPUT event (because the textarea value changes), and we need to
         * differentiate between an INPUT event generated by a key event and an INPUT
         * event generated by edit -> paste actions.
         *
         * This is the state that we match the ctrl+v pattern.
         *
         * @param {goog.events.BrowserEvent} e The underlying browser event.
         * @private
         */
        private handleUnderTyping_(e: goog.events.BrowserEvent): void;
    }
}

declare namespace goog.events.PasteHandler {
    /**
     * The types of events fired by this class.
     * @enum {string}
     */
    enum EventType { PASTE, AFTER_PASTE }

    /**
     * The mandatory delay we expect between two `input` events, used to
     * differentiated between non key paste events and key events.
     * @type {number}
     */
    let MANDATORY_MS_BETWEEN_INPUT_EVENTS_TIE_BREAKER: number;

    /**
     * Whether current UA supoprts the native "paste" event type.
     * @const {boolean}
     */
    const SUPPORTS_NATIVE_PASTE_EVENT: any /*missing*/;

    /**
     * The states that this class can be found, on the paste detection algorithm.
     * @enum {string}
     */
    enum State { INIT, FOCUSED, TYPING }
}
