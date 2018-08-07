/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./topicid.d.ts"/>

declare module 'goog:goog.pubsub.TypedPubSub' {
    import alias = goog.pubsub.TypedPubSub;
    export default alias;
}

declare namespace goog.pubsub {
    /**
     * This object is a temporary shim that provides goog.pubsub.TopicId support
     * for goog.pubsub.PubSub.  See b/12477087 for more info.
     * @extends {goog.Disposable}
     */
    class TypedPubSub extends __TypedPubSub {}
    abstract class __TypedPubSub extends goog.__Disposable {
        /**
         * @param {boolean=} opt_async Enable asynchronous behavior.  Recommended for
         *     new code.  See notes on `goog.pubsub.PubSub.publish`.
         */
        constructor(opt_async?: boolean);

        /**
         * See `goog.pubsub.PubSub.subscribe`.
         * @param {!goog.pubsub.TopicId<PAYLOAD>} topic Topic to subscribe to.
         * @param {function(this:CONTEXT, PAYLOAD)} fn Function to be invoked when a
         *     message is published to the given topic.
         * @param {CONTEXT=} opt_context Object in whose context the function is to be
         *     called (the global scope if none).
         * @return {number} Subscription key.
         * @template PAYLOAD, CONTEXT
         */
        subscribe<PAYLOAD, CONTEXT>(
            topic: goog.pubsub.TopicId<PAYLOAD>, fn: (this: CONTEXT, _0: PAYLOAD) => void, opt_context?: CONTEXT
        ): number;

        /**
         * See `goog.pubsub.PubSub.subscribeOnce`.
         * @param {!goog.pubsub.TopicId<PAYLOAD>} topic Topic to subscribe to.
         * @param {function(this:CONTEXT, PAYLOAD)} fn Function to be invoked once and
         *     then unsubscribed when a message is published to the given topic.
         * @param {CONTEXT=} opt_context Object in whose context the function is to be
         *     called (the global scope if none).
         * @return {number} Subscription key.
         * @template PAYLOAD, CONTEXT
         */
        subscribeOnce<PAYLOAD, CONTEXT>(
            topic: goog.pubsub.TopicId<PAYLOAD>, fn: (this: CONTEXT, _0: PAYLOAD) => void, opt_context?: CONTEXT
        ): number;

        /**
         * See `goog.pubsub.PubSub.unsubscribe`.
         * @param {!goog.pubsub.TopicId<PAYLOAD>} topic Topic to unsubscribe from.
         * @param {function(this:CONTEXT, PAYLOAD)} fn Function to unsubscribe.
         * @param {CONTEXT=} opt_context Object in whose context the function was to be
         *     called (the global scope if none).
         * @return {boolean} Whether a matching subscription was removed.
         * @template PAYLOAD, CONTEXT
         */
        unsubscribe<PAYLOAD, CONTEXT>(
            topic: goog.pubsub.TopicId<PAYLOAD>, fn: (this: CONTEXT, _0: PAYLOAD) => void, opt_context?: CONTEXT
        ): boolean;

        /**
         * See `goog.pubsub.PubSub.unsubscribeByKey`.
         * @param {number} key Subscription key.
         * @return {boolean} Whether a matching subscription was removed.
         */
        unsubscribeByKey(key: number): boolean;

        /**
         * See `goog.pubsub.PubSub.publish`.
         * @param {!goog.pubsub.TopicId<PAYLOAD>} topic Topic to publish to.
         * @param {PAYLOAD} payload Payload passed to each subscription function.
         * @return {boolean} Whether any subscriptions were called.
         * @template PAYLOAD
         */
        publish<PAYLOAD>(topic: goog.pubsub.TopicId<PAYLOAD>, payload: PAYLOAD): boolean;

        /**
         * See `goog.pubsub.PubSub.clear`.
         * @param {!goog.pubsub.TopicId<PAYLOAD>=} opt_topic Topic to clear (all topics
         *     if unspecified).
         * @template PAYLOAD
         */
        clear<PAYLOAD>(opt_topic?: goog.pubsub.TopicId<PAYLOAD>): void;

        /**
         * See `goog.pubsub.PubSub.getCount`.
         * @param {!goog.pubsub.TopicId<PAYLOAD>=} opt_topic The topic (all topics if
         *     unspecified).
         * @return {number} Number of subscriptions to the topic.
         * @template PAYLOAD
         */
        getCount<PAYLOAD>(opt_topic?: goog.pubsub.TopicId<PAYLOAD>): number;
    }
}
