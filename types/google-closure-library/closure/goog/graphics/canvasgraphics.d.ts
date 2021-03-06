/// <reference path="../../../globals.d.ts"/>
/// <reference path="./abstractgraphics.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./element.d.ts"/>
/// <reference path="./canvaselement.d.ts"/>
/// <reference path="./groupelement.d.ts"/>
/// <reference path="./imageelement.d.ts"/>

declare module 'goog:goog.graphics.CanvasGraphics' {
    import alias = goog.graphics.CanvasGraphics;
    export default alias;
}

declare namespace goog.graphics {
    /**
     * A Graphics implementation for drawing using canvas.
     * @extends {goog.graphics.AbstractGraphics}
     * @deprecated goog.graphics is deprecated. It existed to abstract over browser
     *     differences before the canvas tag was widely supported.  See
     *     http://en.wikipedia.org/wiki/Canvas_element for details.
     */
    class CanvasGraphics extends __CanvasGraphics {}
    abstract class __CanvasGraphics extends goog.graphics.__AbstractGraphics {
        /**
         * @param {string|number} width The (non-zero) width in pixels.  Strings
         *     expressing percentages of parent with (e.g. '80%') are also accepted.
         * @param {string|number} height The (non-zero) height in pixels.  Strings
         *     expressing percentages of parent with (e.g. '80%') are also accepted.
         * @param {?number=} opt_coordWidth The coordinate width - if
         *     omitted or null, defaults to same as width.
         * @param {?number=} opt_coordHeight The coordinate height - if
         *     omitted or null, defaults to same as height.
         * @param {goog.dom.DomHelper=} opt_domHelper The DOM helper object for the
         *     document we want to render in.
         */
        constructor(
            width: string|number,
            height: string|number,
            opt_coordWidth?: number|null,
            opt_coordHeight?: number|null,
            opt_domHelper?: goog.dom.DomHelper
        );

        /**
         * Push an element transform on to the transform stack.
         * @param {goog.graphics.Element} element The transformed element.
         */
        pushElementTransform(element: goog.graphics.Element): void;

        /**
         * Pop an element transform off of the transform stack.
         */
        popElementTransform(): void;

        /**
         * The main canvas element.
         * @type {goog.graphics.CanvasGroupElement}
         */
        canvasElement: goog.graphics.CanvasGroupElement;

        /**
         * Clears the drawing context object in response to actions that make the old
         * context invalid - namely resize of the canvas element.
         * @private
         */
        private clearContext_(): void;

        /**
         * Returns the drawing context.
         * @return {Object} The canvas element rendering context.
         */
        getContext(): Object;

        /**
         * Update the size of the canvas.
         */
        updateSize(): void;

        /**
         * Reset the canvas.
         */
        reset(): void;

        /**
         * Redraw the entire canvas.
         */
        redraw(): void;

        /**
         * Draw an element, including any stroke or fill.
         * @param {goog.graphics.Element} element The element to draw.
         */
        drawElement(element: goog.graphics.Element): void;

        /**
         * Append an element.
         *
         * @param {goog.graphics.Element} element The element to draw.
         * @param {goog.graphics.GroupElement|undefined} group The group to draw
         *     it in. If null or undefined, defaults to the root group.
         * @protected
         */
        protected append(element: goog.graphics.Element, group: goog.graphics.GroupElement|undefined): void;

        /**
         * Draw an image.
         *
         * @param {number} x X coordinate (left).
         * @param {number} y Y coordinate (top).
         * @param {number} width Width of image.
         * @param {number} height Height of image.
         * @param {string} src Source of the image.
         * @param {goog.graphics.GroupElement=} opt_group The group wrapper
         *     element to append to. If not specified, appends to the main canvas.
         *
         * @return {!goog.graphics.ImageElement} The newly created element.
         */
        drawImage(
            x: number, y: number, width: number, height: number, src: string, opt_group?: goog.graphics.GroupElement
        ): goog.graphics.ImageElement;

        /**
         * @param {goog.graphics.GroupElement} group The group to possibly
         *     draw to.
         * @return {boolean} Whether drawing can occur now.
         */
        isDrawable(group: goog.graphics.GroupElement): boolean;

        /**
         * Returns true if drawing to the given group means a redraw is required.
         * @param {goog.graphics.GroupElement} group The group to draw to.
         * @return {boolean} Whether drawing to this group should force a redraw.
         */
        isRedrawRequired(group: goog.graphics.GroupElement): boolean;
    }
}
