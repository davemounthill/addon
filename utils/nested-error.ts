"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toError = exports.NestedError = void 0;
/**
 * Subclass of standard `Error` that eagerly collects the callstack of the error
 * that caused it. This way you can investigate the core problem that happened
 * by looking at the callstack from up to bottom (from higher level errors to
 * lower level).
 */
var NestedError = /** @class */ (function (_super) {
    __extends(NestedError, _super);
    /**
     * Allocates an instance of `NestedError` with the given error `message` and
     * optional `innerError` (which will be automatically coerced using `toError()`).
     *
     * @param message     Laconic error message to attach to the created `NestedError`.
     * @param innerErrors Optional errors that will be wrapped by this higher level
     *                    error. This value will be automatically coerced using `toError()`.
     */
    function NestedError(message) {
        var innerErrors = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            innerErrors[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this, message) || this;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, NestedError.prototype);
        var thisErrorReport = NestedError.getErrorReport(_this);
        if (innerErrors.length === 1) {
            var innerError = toError(innerErrors[0]);
            _this.innerErrors = [innerError];
            var errReport = NestedError.getErrorReport(innerError);
            _this.stack = thisErrorReport + "\n\n======= INNER ERROR =======\n\n" + errReport;
            return _this;
        }
        _this.innerErrors = innerErrors.map(function (err) { return toError(err); });
        var innerErrorReports = _this.innerErrors
            .map(function (error, idx) {
            var errReport = NestedError.getErrorReport(error);
            return "======= INNER ERROR (" + (idx + 1) + " of " + innerErrors.length + ") =======\n\n" + errReport;
        })
            .join('\n\n');
        _this.stack = thisErrorReport + "\n\n" + innerErrorReports;
        return _this;
    }
    Object.defineProperty(NestedError.prototype, "innerError", {
        /**
         * Provides the first `Error` of the `innerErrors` (if it exists);
         * otherwise, `null`.
         *
         * @deprecated Please shift to using the `innerErrors` (with an 's') property.
         */
        get: function () {
            return this.innerErrors.length === 0 ? null : this.innerErrors[0];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the function that accepts any value that was thrown as the first argument and
     * throws it wrapped into `NestedError` or class derived from `NestedError` (provided
     * this method was called directly in the context of that dervied class constructor)
     * with the given `message`.
     * Returned function will pass accepted `Error` object directly to `NestedError`
     * as `innerErrors` by invoking `toError(err)` on it.
     *
     * You'll most likely want to use this method with promises:
     *
     * ```ts
     * userService.getPage().then(
     *     data => console.log(`Hooray! data: ${data}`),
     *     NestedError.rethrow('failed to fetch users page')
     * );
     * ```
     *
     * @param message Message to attach `NestedError` created by the returned function.
     */
    NestedError.rethrow = function (message) {
        var _this = this;
        return function () {
            var errs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                errs[_i] = arguments[_i];
            }
            throw new (_this.bind.apply(_this, __spreadArray([void 0, message], errs)))();
        };
    };
    NestedError.getErrorReport = typeof new Error().stack === 'string'
        ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            function (err) { return err.stack; }
        : function (err) { return err.name + ": " + err.message; };
    return NestedError;
}(Error));
exports.NestedError = NestedError;
function toError(err) {
    try {
        return err instanceof Error
            ? err
            : new Error("Value that is not an instance of Error was thrown: " + err);
    }
    catch (_a) {
        return new Error('Failed to stringify non-instance of Error that was thrown.' +
            'This is possibly due to the fact that toString() method of the value' +
            "doesn't return a primitive value.");
    }
}
exports.toError = toError;
