/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.json.hybrid' {
    export = goog.json.hybrid;
}

declare namespace goog.json.hybrid {
    /**
     * Attempts to serialize the JSON string natively, falling back to
     * `goog.json.serialize` if unsuccessful.
     * @param {!Object} obj JavaScript object to serialize to JSON.
     * @return {string} Resulting JSON string.
     */
    function stringify(obj: Object): string;

    /**
     * Attempts to parse the JSON string natively, falling back to
     * `goog.json.parse` if unsuccessful.
     * @param {string} jsonString JSON string to parse.
     * @return {?Object} Resulting JSON object.
     */
    function parse(jsonString: string): Object|null;
}
