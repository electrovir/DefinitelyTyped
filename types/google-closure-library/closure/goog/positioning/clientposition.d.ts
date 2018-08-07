/// <reference path="../../../globals.d.ts"/>
/// <reference path="./abstractposition.d.ts"/>
/// <reference path="../math/coordinate.d.ts"/>

declare module 'goog:goog.positioning.ClientPosition' {
    import alias = goog.positioning.ClientPosition;
    export default alias;
}

declare namespace goog.positioning {
    /**
     * Encapsulates a popup position where the popup is positioned relative to the
     * window (client) coordinates. This calculates the correct position to
     * use even if the element is relatively positioned to some other element. This
     * is for trying to position an element at the spot of the mouse cursor in
     * a MOUSEMOVE event. Just use the event.clientX and event.clientY as the
     * parameters.
     *
     * @extends {goog.positioning.AbstractPosition}
     */
    class ClientPosition extends __ClientPosition {}
    abstract class __ClientPosition extends goog.positioning.__AbstractPosition {
        /**
         * @param {number|goog.math.Coordinate} arg1 Left position or coordinate.
         * @param {number=} opt_arg2 Top position.
         */
        constructor(arg1: number|goog.math.Coordinate, opt_arg2?: number);

        /**
         * Coordinate to position popup at.
         * @type {goog.math.Coordinate}
         */
        coordinate: goog.math.Coordinate;
    }
}
