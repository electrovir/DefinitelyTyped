/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./media.d.ts"/>
/// <reference path="./mediamodel.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>

declare module 'goog:goog.ui.media.Mp3' {
    import alias = goog.ui.media.Mp3;
    export default alias;
}

declare namespace goog.ui.media {
    /**
     * Subclasses a goog.ui.media.MediaRenderer to provide a Mp3 specific media
     * renderer.
     *
     * This class knows how to parse mp3 URLs, and render the DOM structure
     * of mp3 flash players. This class is meant to be used as a singleton static
     * stateless class, that takes `goog.ui.media.Media` instances and renders
     * it. It expects `goog.ui.media.Media.getModel` to return a well formed,
     * previously checked, mp3 URL {@see goog.ui.media.PicasaAlbum.parseUrl},
     * which is the data model this renderer will use to construct the DOM
     * structure. {@see goog.ui.media.PicasaAlbum.newControl} for an example of
     * constructing a control with this renderer.
     *
     * This design is patterned after http://go/closure_control_subclassing
     *
     * It uses {@link goog.ui.media.FlashObject} to embed the flash object.
     *
     * @extends {goog.ui.media.MediaRenderer}
     * @final
     */
    class Mp3 extends __Mp3 {}
    abstract class __Mp3 extends goog.ui.media.__MediaRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.media.Mp3 {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     *
     * @type {string}
     */
    let CSS_CLASS: string;

    /**
     * Regular expression to check if a given URL is a valid mp3 URL.
     *
     * Copied from http://go/markdownlite.js.

     *
     * NOTE(user): although it would be easier to use goog.string.endsWith('.mp3'),
     * in the future, we want to provide media inlining, which is basically getting
     * a text and replacing all mp3 references with an mp3 player, so it makes sense
     * to share the same regular expression to match everything.
     *
     * @type {RegExp}
     */
    let MATCHER: RegExp;

    /**
     * A static convenient method to construct a goog.ui.media.Media control out of
     * a mp3 URL. It checks the mp3 URL, sets it as the data model
     * goog.ui.media.Mp3 renderer uses, sets the states supported by the renderer,
     * and returns a Control that binds everything together. This is what you
     * should be using for constructing Mp3 videos, except if you need more fine
     * control over the configuration.
     *
     * @param {goog.ui.media.MediaModel} dataModel A media model that must contain
     *     an mp3 url on `dataModel.getUrl`.
     * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
     *     document interaction.
     * @return {!goog.ui.media.Media} A goog.ui.Control subclass with the mp3
     *     renderer.
     */
    function newControl(dataModel: goog.ui.media.MediaModel, opt_domHelper?: goog.dom.DomHelper): goog.ui.media.Media;

    /**
     * A static method that sets which flash URL this class should use. Use this if
     * you want to host your own flash mp3 player.
     *
     * @param {string} flashUrl The URL of the flash mp3 player.
     */
    function setFlashUrl(flashUrl: string): void;

    /**
     * A static method that builds a URL that will contain the flash player that
     * will play the `mp3Url`.
     *
     * @param {string} mp3Url The URL of the mp3 music.
     * @return {string} An URL of a flash player that will know how to play the
     *     given `mp3Url`.
     */
    function buildFlashUrl(mp3Url: string): string;
}
