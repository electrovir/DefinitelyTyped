/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.crypt.Arc4' {
    import alias = goog.crypt.Arc4;
    export default alias;
}

declare namespace goog.crypt {
    /**
     * ARC4 streamcipher implementation.
     * @final
     * @struct
     */
    class Arc4 extends __Arc4 {}
    abstract class __Arc4 {
        /**
         */
        constructor();

        /**
         * A permutation of all 256 possible bytes.
         * @type {Array<number>}
         * @private
         */
        private state_: number[];

        /**
         * 8 bit index pointer into this.state_.
         * @type {number}
         * @private
         */
        private index1_: number;

        /**
         * 8 bit index pointer into this.state_.
         * @type {number}
         * @private
         */
        private index2_: number;

        /**
         * Initialize the cipher for use with new key.
         * @param {Array<number>} key A byte array containing the key.
         * @param {number=} opt_length Indicates # of bytes to take from the key.
         */
        setKey(key: number[], opt_length?: number): void;

        /**
         * Discards n bytes of the keystream.
         * These days 1536 is considered a decent amount to drop to get the key state
         * warmed-up enough for secure usage. This is not done in the constructor to
         * preserve efficiency for use cases that do not need this.
         * NOTE: Discard is identical to crypt without actually xoring any data. It's
         * unfortunate to have this code duplicated, but this was done for performance
         * reasons. Alternatives which were attempted:
         * 1. Create a temp array of the correct length and pass it to crypt. This
         *    works but needlessly allocates an array. But more importantly this
         *    requires choosing an array type (Array or Uint8Array) in discard, and
         *    choosing a different type than will be passed to crypt by the client
         *    code hurts the javascript engines ability to optimize crypt (7x hit in
         *    v8).
         * 2. Make data option in crypt so discard can pass null, this has a huge
         *    perf hit for crypt.
         * @param {number} length Number of bytes to disregard from the stream.
         */
        discard(length: number): void;

        /**
         * En- or decrypt (same operation for streamciphers like ARC4)
         * @param {Array<number>|Uint8Array} data The data to be xor-ed in place.
         * @param {number=} opt_length The number of bytes to crypt.
         */
        crypt(data: number[]|Uint8Array, opt_length?: number): void;
    }
}
