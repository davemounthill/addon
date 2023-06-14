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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebounced = exports.CanceledError = void 0;
var react_1 = require("react");
var CanceledError = /** @class */ (function (_super) {
    __extends(CanceledError, _super);
    function CanceledError(message) {
        var _this = _super.call(this, message) || this;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, CanceledError.prototype);
        return _this;
    }
    return CanceledError;
}(Error));
exports.CanceledError = CanceledError;
/**
 * The idea here is you give us a function to make a Debouncable
 * and we'll run it when you want, debounced, ensuring only one runs at a time
 * 1. If there is one waiting to run, we stop it before it starts
 * 2. If there is one running, we request it to cancel, which should catch it before it finishes
 */
var useDebounced = function (debouncable, delay) {
    var _a = react_1.useState(null), running = _a[0], setRunning = _a[1];
    var debounced = function (options) { return __awaiter(void 0, void 0, void 0, function () {
        var debouncedOption;
        return __generator(this, function (_a) {
            debouncedOption = (options === null || options === void 0 ? void 0 : options.debounced) === true;
            // is there one in the queue? cancel it
            if (running) {
                console.log('cancel', running.timeoutId);
                if (running.timeoutId) {
                    clearTimeout(running.timeoutId);
                }
                else {
                    // never expect this to happen
                    throw new Error("Expected running.timeoutId");
                }
                // tell it to cancel if it can, it has a closure over this object
                running.cancelRequested = true;
                setRunning(null);
            }
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    // Figure out if we should delay or not
                    var timeoutDelay = debouncedOption ? delay : 0;
                    // This is a little awkard, we need to create the object ahead of time, so that we can close-over it
                    // to reference `cancelRequested`, but we don't yet have the timeoutId
                    var newRunning = {
                        cancelRequested: false,
                        timeoutId: null, // would prefer this not to be null, but I don't see a how, yet
                    };
                    setRunning(newRunning);
                    // Start a timer to run it
                    var timeoutId = setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log('start', timeoutId);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, 4, 5]);
                                    // Run it
                                    return [4 /*yield*/, debouncable(function () {
                                            // let the debouncable method query at any point to see if a cancel has been requested
                                            return newRunning.cancelRequested;
                                        })];
                                case 2:
                                    // Run it
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_1 = _a.sent();
                                    // console.error('error', timeoutId, (err as Error).message);
                                    if (err_1 instanceof CanceledError) {
                                        // swallow it
                                        console.log('Successfully canceled', timeoutId);
                                        resolve();
                                    }
                                    else {
                                        reject(err_1);
                                    }
                                    return [3 /*break*/, 5];
                                case 4:
                                    setRunning(null);
                                    return [7 /*endfinally*/];
                                case 5:
                                    console.log('finish', timeoutId);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, timeoutDelay);
                    newRunning.timeoutId = timeoutId;
                    console.log('enqueue', timeoutId, timeoutDelay + "ms");
                })];
        });
    }); };
    return {
        debounced: debounced,
    };
};
exports.useDebounced = useDebounced;
