/// <reference path="../../../globals.d.ts"/>
/// <reference path="./logger.d.ts"/>

declare module 'goog:goog.debug.LogRecord' {
    import alias = goog.debug.LogRecord;
    export default alias;
}

declare namespace goog.debug {
    /**
     * LogRecord objects are used to pass logging requests between
     * the logging framework and individual log Handlers.
     */
    class LogRecord extends __LogRecord {}
    abstract class __LogRecord {
        /**
         * @param {goog.debug.Logger.Level} level One of the level identifiers.
         * @param {string} msg The string message.
         * @param {string} loggerName The name of the source logger.
         * @param {number=} opt_time Time this log record was created if other than now.
         *     If 0, we use #goog.now.
         * @param {number=} opt_sequenceNumber Sequence number of this log record. This
         *     should only be passed in when restoring a log record from persistence.
         */
        constructor(
            level: goog.debug.Logger.Level,
            msg: string,
            loggerName: string,
            opt_time?: number,
            opt_sequenceNumber?: number
        );

        /**
         * Time the LogRecord was created.
         * @type {number}
         * @private
         */
        private time_: number;

        /**
         * Level of the LogRecord
         * @type {goog.debug.Logger.Level}
         * @private
         */
        private level_: goog.debug.Logger.Level;

        /**
         * Message associated with the record
         * @type {string}
         * @private
         */
        private msg_: string;

        /**
         * Name of the logger that created the record.
         * @type {string}
         * @private
         */
        private loggerName_: string;

        /**
         * Sequence number for the LogRecord. Each record has a unique sequence number
         * that is greater than all log records created before it.
         * @type {number}
         * @private
         */
        private sequenceNumber_: number;

        /**
         * Exception associated with the record
         * @type {Object}
         * @private
         */
        private exception_: Object;

        /**
         * Sets all fields of the log record.
         * @param {goog.debug.Logger.Level} level One of the level identifiers.
         * @param {string} msg The string message.
         * @param {string} loggerName The name of the source logger.
         * @param {number=} opt_time Time this log record was created if other than now.
         *     If 0, we use #goog.now.
         * @param {number=} opt_sequenceNumber Sequence number of this log record. This
         *     should only be passed in when restoring a log record from persistence.
         */
        reset(
            level: goog.debug.Logger.Level,
            msg: string,
            loggerName: string,
            opt_time?: number,
            opt_sequenceNumber?: number
        ): void;

        /**
         * Get the source Logger's name.
         *
         * @return {string} source logger name (may be null).
         */
        getLoggerName(): string;

        /**
         * Get the exception that is part of the log record.
         *
         * @return {Object} the exception.
         */
        getException(): Object;

        /**
         * Set the exception that is part of the log record.
         *
         * @param {Object} exception the exception.
         */
        setException(exception: Object): void;

        /**
         * Get the source Logger's name.
         *
         * @param {string} loggerName source logger name (may be null).
         */
        setLoggerName(loggerName: string): void;

        /**
         * Get the logging message level, for example Level.SEVERE.
         * @return {goog.debug.Logger.Level} the logging message level.
         */
        getLevel(): goog.debug.Logger.Level;

        /**
         * Set the logging message level, for example Level.SEVERE.
         * @param {goog.debug.Logger.Level} level the logging message level.
         */
        setLevel(level: goog.debug.Logger.Level): void;

        /**
         * Get the "raw" log message, before localization or formatting.
         *
         * @return {string} the raw message string.
         */
        getMessage(): string;

        /**
         * Set the "raw" log message, before localization or formatting.
         *
         * @param {string} msg the raw message string.
         */
        setMessage(msg: string): void;

        /**
         * Get event time in milliseconds since 1970.
         *
         * @return {number} event time in millis since 1970.
         */
        getMillis(): number;

        /**
         * Set event time in milliseconds since 1970.
         *
         * @param {number} time event time in millis since 1970.
         */
        setMillis(time: number): void;

        /**
         * Get the sequence number.
         * <p>
         * Sequence numbers are normally assigned in the LogRecord
         * constructor, which assigns unique sequence numbers to
         * each new LogRecord in increasing order.
         * @return {number} the sequence number.
         */
        getSequenceNumber(): number;
    }
}

declare namespace goog.debug.LogRecord {
}
