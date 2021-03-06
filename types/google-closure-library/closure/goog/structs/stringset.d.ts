/// <reference path="../../../globals.d.ts"/>
/// <reference path="../iter/iter.d.ts"/>

declare module 'goog:goog.structs.StringSet' {
    import alias = goog.structs.StringSet;
    export default alias;
}

declare namespace goog.structs {
    /**
     * Creates a set of strings.
     * @final
     */
    class StringSet extends __StringSet {}
    abstract class __StringSet {
        /**
         * @param {!Array<?>=} opt_elements Elements to add to the set. The non-string
         *     items will be converted to strings, so 15 and '15' will mean the same.
         */
        constructor(opt_elements?: any[]);

        /**
         * An object storing the escaped elements of the set in its keys.
         * @type {!Object}
         * @private
         */
        private elements_: Object;

        /**
         * Adds a single element to the set.
         * @param {*} element The element to add. It will be converted to string.
         */
        add(element: any): void;

        /**
         * Adds a the elements of an array to this set.
         * @param {!Array<?>} arr The array to add the elements of.
         */
        addArray(arr: any[]): void;

        /**
         * Adds the elements which are in `set1` but not in `set2` to this
         * set.
         * @param {!goog.structs.StringSet} set1 First set.
         * @param {!goog.structs.StringSet} set2 Second set.
         * @private
         */
        private addDifference_(set1: goog.structs.StringSet, set2: goog.structs.StringSet): void;

        /**
         * Adds a the elements of a set to this set.
         * @param {!goog.structs.StringSet} stringSet The set to add the elements of.
         */
        addSet(stringSet: goog.structs.StringSet): void;

        /**
         * Removes all elements of the set.
         */
        clear(): void;

        /**
         * @return {!goog.structs.StringSet} Clone of the set.
         */
        clone(): goog.structs.StringSet;

        /**
         * Tells if the set contains the given element.
         * @param {*} element The element to check.
         * @return {boolean} Whether it is in the set.
         */
        contains(element: any): boolean;

        /**
         * Tells if the set contains all elements of the array.
         * @param {!Array<?>} arr The elements to check.
         * @return {boolean} Whether they are in the set.
         */
        containsArray(arr: any[]): boolean;

        /**
         * Tells if this set has the same elements as the given set.
         * @param {!goog.structs.StringSet} stringSet The other set.
         * @return {boolean} Whether they have the same elements.
         */
        equals(stringSet: goog.structs.StringSet): boolean;

        /**
         * Calls a function for each element in the set.
         * @param {function(string, undefined, !goog.structs.StringSet)} f The function
         *     to call for every element. It takes the element, undefined (because sets
         *     have no notion of keys), and the set.
         * @param {Object=} opt_obj The object to be used as the value of 'this'
         *     within `f`.
         */
        forEach(f: (_0: string, _1: undefined, _2: goog.structs.StringSet) => void, opt_obj?: Object): void;

        /**
         * Counts the number of elements in the set in linear time.
         * NOTE: getCount is always called at most once per set instance in google3.
         * If this usage pattern won't change, the linear getCount implementation is
         * better, because
         * <li>populating a set and getting the number of elements in it takes the same
         * amount of time as keeping a count_ member up to date and getting its value;
         * <li>if getCount is not called, adding and removing elements have no overhead.
         * @return {number} The number of elements in the set.
         */
        getCount(): number;

        /**
         * Calculates the difference of two sets.
         * @param {!goog.structs.StringSet} stringSet The set to subtract from this set.
         * @return {!goog.structs.StringSet} `this` minus `stringSet`.
         */
        getDifference(stringSet: goog.structs.StringSet): goog.structs.StringSet;

        /**
         * Calculates the intersection of this set with another set.
         * @param {!goog.structs.StringSet} stringSet The set to take the intersection
         *     with.
         * @return {!goog.structs.StringSet} A new set with the common elements.
         */
        getIntersection(stringSet: goog.structs.StringSet): goog.structs.StringSet;

        /**
         * Calculates the symmetric difference of two sets.
         * @param {!goog.structs.StringSet} stringSet The other set.
         * @return {!goog.structs.StringSet} A new set with the elements in exactly one
         *     of `this` and `stringSet`.
         */
        getSymmetricDifference(stringSet: goog.structs.StringSet): goog.structs.StringSet;

        /**
         * Calculates the union of this set and another set.
         * @param {!goog.structs.StringSet} stringSet The set to take the union with.
         * @return {!goog.structs.StringSet} A new set with the union of elements.
         */
        getUnion(stringSet: goog.structs.StringSet): goog.structs.StringSet;

        /**
         * @return {!Array<string>} The elements of the set.
         */
        getValues(): string[];

        /**
         * Tells if this set and the given set are disjoint.
         * @param {!goog.structs.StringSet} stringSet The other set.
         * @return {boolean} True iff they don't have common elements.
         */
        isDisjoint(stringSet: goog.structs.StringSet): boolean;

        /**
         * @return {boolean} Whether the set is empty.
         */
        isEmpty(): boolean;

        /**
         * Tells if this set is the subset of the given set.
         * @param {!goog.structs.StringSet} stringSet The other set.
         * @return {boolean} Whether this set if the subset of that.
         */
        isSubsetOf(stringSet: goog.structs.StringSet): boolean;

        /**
         * Tells if this set is the superset of the given set.
         * @param {!goog.structs.StringSet} stringSet The other set.
         * @return {boolean} Whether this set if the superset of that.
         */
        isSupersetOf(stringSet: goog.structs.StringSet): boolean;

        /**
         * Removes a single element from the set.
         * @param {*} element The element to remove.
         * @return {boolean} Whether the element was in the set.
         */
        remove(element: any): boolean;

        /**
         * Removes all elements of the given array from this set.
         * @param {!Array<?>} arr The elements to remove.
         */
        removeArray(arr: any[]): void;

        /**
         * Removes all elements of the given set from this set.
         * @param {!goog.structs.StringSet} stringSet The set of elements to remove.
         */
        removeSet(stringSet: goog.structs.StringSet): void;

        /**
         * Returns an iterator that iterates over the elements in the set.
         * NOTE: creating the iterator copies the whole set so use {@link #forEach} when
         * possible.
         * @param {boolean=} opt_keys Ignored for sets.
         * @return {!goog.iter.Iterator} An iterator over the elements in the set.
         */
        __iterator__(opt_keys?: boolean): goog.iter.Iterator<any>;
    }
}

declare namespace goog.structs.StringSet {
}
