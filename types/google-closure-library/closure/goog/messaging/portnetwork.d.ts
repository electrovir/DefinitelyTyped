/// <reference path="../../../globals.d.ts"/>
/// <reference path="./messagechannel.d.ts"/>

declare module 'goog:goog.messaging.PortNetwork' {
    import alias = goog.messaging.PortNetwork;
    export default alias;
}

declare namespace goog.messaging {
    interface PortNetwork {
        /**
         * Returns a message channel that communicates with the named context. If no
         * such port exists, an error will either be thrown immediately or after a round
         * trip with the operator, depending on whether this pool is the operator or a
         * caller.
         *
         * If context A calls dial('B') and context B calls dial('A'), the two
         * ports returned will be connected to one another.
         *
         * @param {string} name The name of the context to get.
         * @return {goog.messaging.MessageChannel} The channel communicating with the
         *     given context. This is either a {@link goog.messaging.PortChannel} or a
         *     decorator around a PortChannel, so it's safe to send {@link MessagePorts}
         *     across it. This will be disposed along with the PortNetwork.
         */
        dial(name: string): goog.messaging.MessageChannel;
    }
}

declare namespace goog.messaging.PortNetwork {
    /**
     * The name of the service exported by the operator for creating a connection
     * between two callers.
     *
     * @type {string}
     * @const
     */
    const REQUEST_CONNECTION_SERVICE: string;

    /**
     * The name of the service exported by the callers for adding a connection to
     * another context.
     *
     * @type {string}
     * @const
     */
    const GRANT_CONNECTION_SERVICE: string;
}
