/// <reference path="../../../globals.d.ts"/>
/// <reference path="../string/typedstring.d.ts"/>
/// <reference path="../string/const.d.ts"/>
/// <reference path="./safeurl.d.ts"/>

declare module 'goog:goog.html.SafeStyle' {
    import alias = goog.html.SafeStyle;
    export default alias;
}

declare namespace goog.html {
    /**
     * A string-like object which represents a sequence of CSS declarations
     * ({@code propertyName1: propertyvalue1; propertyName2: propertyValue2; ...})
     * and that carries the security type contract that its value, as a string,
     * will not cause untrusted script execution (XSS) when evaluated as CSS in a
     * browser.
     *
     * Instances of this type must be created via the factory methods
     * (`goog.html.SafeStyle.create` or
     * `goog.html.SafeStyle.fromConstant`) and not by invoking its
     * constructor. The constructor intentionally takes no parameters and the type
     * is immutable; hence only a default instance corresponding to the empty string
     * can be obtained via constructor invocation.
     *
     * SafeStyle's string representation can safely be:
     * <ul>
     *   <li>Interpolated as the content of a *quoted* HTML style attribute.
     *       However, the SafeStyle string *must be HTML-attribute-escaped* before
     *       interpolation.
     *   <li>Interpolated as the content of a {}-wrapped block within a stylesheet.
     *       '<' characters in the SafeStyle string *must be CSS-escaped* before
     *       interpolation. The SafeStyle string is also guaranteed not to be able
     *       to introduce new properties or elide existing ones.
     *   <li>Interpolated as the content of a {}-wrapped block within an HTML
     *       &lt;style&gt; element. '<' characters in the SafeStyle string
     *       *must be CSS-escaped* before interpolation.
     *   <li>Assigned to the style property of a DOM node. The SafeStyle string
     *       should not be escaped before being assigned to the property.
     * </ul>
     *
     * A SafeStyle may never contain literal angle brackets. Otherwise, it could
     * be unsafe to place a SafeStyle into a &lt;style&gt; tag (where it can't
     * be HTML escaped). For example, if the SafeStyle containing
     * "{@code font: 'foo &lt;style/&gt;&lt;script&gt;evil&lt;/script&gt;'}" were
     * interpolated within a &lt;style&gt; tag, this would then break out of the
     * style context into HTML.
     *
     * A SafeStyle may contain literal single or double quotes, and as such the
     * entire style string must be escaped when used in a style attribute (if
     * this were not the case, the string could contain a matching quote that
     * would escape from the style attribute).
     *
     * Values of this type must be composable, i.e. for any two values
     * `style1` and `style2` of this type,
     * {@code goog.html.SafeStyle.unwrap(style1) +
     * goog.html.SafeStyle.unwrap(style2)} must itself be a value that satisfies
     * the SafeStyle type constraint. This requirement implies that for any value
     * `style` of this type, `goog.html.SafeStyle.unwrap(style)` must
     * not end in a "property value" or "property name" context. For example,
     * a value of {@code background:url("} or {@code font-} would not satisfy the
     * SafeStyle contract. This is because concatenating such strings with a
     * second value that itself does not contain unsafe CSS can result in an
     * overall string that does. For example, if {@code javascript:evil())"} is
     * appended to {@code background:url("}, the resulting string may result in
     * the execution of a malicious script.
     *
     * TODO(mlourenco): Consider whether we should implement UTF-8 interchange
     * validity checks and blacklisting of newlines (including Unicode ones) and
     * other whitespace characters (\t, \f). Document here if so and also update
     * SafeStyle.fromConstant().
     *
     * The following example values comply with this type's contract:
     * <ul>
     *   <li><pre>width: 1em;</pre>
     *   <li><pre>height:1em;</pre>
     *   <li><pre>width: 1em;height: 1em;</pre>
     *   <li><pre>background:url('http://url');</pre>
     * </ul>
     * In addition, the empty string is safe for use in a CSS attribute.
     *
     * The following example values do NOT comply with this type's contract:
     * <ul>
     *   <li><pre>background: red</pre> (missing a trailing semi-colon)
     *   <li><pre>background:</pre> (missing a value and a trailing semi-colon)
     *   <li><pre>1em</pre> (missing an attribute name, which provides context for
     *       the value)
     * </ul>
     *
     * @see goog.html.SafeStyle#create
     * @see goog.html.SafeStyle#fromConstant
     * @see http://www.w3.org/TR/css3-syntax/
     * @final
     * @struct
     * @implements {goog.string.TypedString}
     */
    class SafeStyle extends __SafeStyle {}
    abstract class __SafeStyle implements goog.string.TypedString {
        /**
         */
        constructor();

        /**
         * The contained value of this SafeStyle.  The field has a purposely
         * ugly name to make (non-compiled) code that attempts to directly access this
         * field stand out.
         * @private {string}
         */
        private privateDoNotAccessOrElseSafeStyleWrappedValue_: any /*missing*/;

        /**
         * A type marker used to implement additional run-time type checking.
         * @see goog.html.SafeStyle#unwrap
         * @const {!Object}
         * @private
         */
        private readonly SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_: any /*missing*/;

        /**
         * Called from createSafeStyleSecurityPrivateDoNotAccessOrElse(). This
         * method exists only so that the compiler can dead code eliminate static
         * fields (like EMPTY) when they're not accessed.
         * @param {string} style
         * @return {!goog.html.SafeStyle}
         * @private
         */
        private initSecurityPrivateDoNotAccessOrElse_(style: string): goog.html.SafeStyle;

        /**
         * Interface marker of the TypedString interface.
         *
         * This property can be used to determine at runtime whether or not an object
         * implements this interface.  All implementations of this interface set this
         * property to `true`.
         * @type {boolean}
         */
        implementsGoogStringTypedString: boolean;

        /**
         * Retrieves this wrapped string's value.
         * @return {string} The wrapped string's value.
         */
        getTypedStringValue(): string;
    }
}

declare namespace goog.html.SafeStyle {
    /**
     * Creates a SafeStyle object from a compile-time constant string.
     *
     * `style` should be in the format
     * {@code name: value; [name: value; ...]} and must not have any < or >
     * characters in it. This is so that SafeStyle's contract is preserved,
     * allowing the SafeStyle to correctly be interpreted as a sequence of CSS
     * declarations and without affecting the syntactic structure of any
     * surrounding CSS and HTML.
     *
     * This method performs basic sanity checks on the format of `style`
     * but does not constrain the format of `name` and `value`, except
     * for disallowing tag characters.
     *
     * @param {!goog.string.Const} style A compile-time-constant string from which
     *     to create a SafeStyle.
     * @return {!goog.html.SafeStyle} A SafeStyle object initialized to
     *     `style`.
     */
    function fromConstant(style: goog.string.Const): goog.html.SafeStyle;

    /**
     * Performs a runtime check that the provided object is indeed a
     * SafeStyle object, and returns its value.
     *
     * @param {!goog.html.SafeStyle} safeStyle The object to extract from.
     * @return {string} The safeStyle object's contained string, unless
     *     the run-time type check fails. In that case, `unwrap` returns an
     *     innocuous string, or, if assertions are enabled, throws
     *     `goog.asserts.AssertionError`.
     */
    function unwrap(safeStyle: goog.html.SafeStyle): string;

    /**
     * Package-internal utility method to create SafeStyle instances.
     *
     * @param {string} style The string to initialize the SafeStyle object with.
     * @return {!goog.html.SafeStyle} The initialized SafeStyle object.
     * @package
     */
    function createSafeStyleSecurityPrivateDoNotAccessOrElse(style: string): goog.html.SafeStyle;

    /**
     * A SafeStyle instance corresponding to the empty string.
     * @const {!goog.html.SafeStyle}
     */
    const EMPTY: any /*missing*/;

    /**
     * The innocuous string generated by goog.html.SafeStyle.create when passed
     * an unsafe value.
     * @const {string}
     */
    const INNOCUOUS_STRING: any /*missing*/;

    /**
     * A single property value.
     * @typedef {string|!goog.string.Const|!goog.html.SafeUrl}
     */
    type PropertyValue = string|goog.string.Const|goog.html.SafeUrl;

    /**
     * Mapping of property names to their values.
     * We don't support numbers even though some values might be numbers (e.g.
     * line-height or 0 for any length). The reason is that most numeric values need
     * units (e.g. '1px') and allowing numbers could cause users forgetting about
     * them.
     * @typedef {!Object<string, ?goog.html.SafeStyle.PropertyValue|
     *     ?Array<!goog.html.SafeStyle.PropertyValue>>}
     */
    type PropertyMap =
        {[key: string]: goog.html.SafeStyle.PropertyValue | null | goog.html.SafeStyle.PropertyValue[] | null};

    /**
     * Creates a new SafeStyle object from the properties specified in the map.
     * @param {goog.html.SafeStyle.PropertyMap} map Mapping of property names to
     *     their values, for example {'margin': '1px'}. Names must consist of
     *     [-_a-zA-Z0-9]. Values might be strings consisting of
     *     [-,.'"%_!# a-zA-Z0-9], where " and ' must be properly balanced. We also
     *     allow simple functions like rgb() and url() which sanitizes its contents.
     *     Other values must be wrapped in goog.string.Const. URLs might be passed
     *     as goog.html.SafeUrl which will be wrapped into url(""). We also support
     *     array whose elements are joined with ' '. Null value causes skipping the
     *     property.
     * @return {!goog.html.SafeStyle}
     * @throws {Error} If invalid name is provided.
     * @throws {goog.asserts.AssertionError} If invalid value is provided. With
     *     disabled assertions, invalid value is replaced by
     *     goog.html.SafeStyle.INNOCUOUS_STRING.
     */
    function create(map: goog.html.SafeStyle.PropertyMap): goog.html.SafeStyle;

    /**
     * Creates a new SafeStyle object by concatenating the values.
     * @param {...(!goog.html.SafeStyle|!Array<!goog.html.SafeStyle>)} var_args
     *     SafeStyles to concatenate.
     * @return {!goog.html.SafeStyle}
     */
    function concat(...var_args: (goog.html.SafeStyle|goog.html.SafeStyle[])[]): goog.html.SafeStyle;
}

declare namespace goog.html.SafeUrl {
}
