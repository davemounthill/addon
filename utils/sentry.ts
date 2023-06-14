"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSentry = exports.captureException = exports.setSentryContext = exports.getRootError = exports.getResponse = void 0;
var Sentry = __importStar(require("@sentry/react"));
var tracing_1 = require("@sentry/tracing");
var uuid_1 = require("uuid");
var HttpApiRequestError_1 = __importDefault(require("../api/HttpApiRequestError"));
var util_1 = require("../api/util");
var eventTracking_1 = require("./eventTracking");
var nested_error_1 = require("./nested-error");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var getResponse = function (error) {
    if (error instanceof HttpApiRequestError_1.default) {
        return error.content;
    }
    return util_1.isAxiosError(error) && error.response
        ? error.response.data
        : undefined;
};
exports.getResponse = getResponse;
var getRootError = function (error) {
    var nested = error.innerErrors.length > 0 ? error.innerErrors[0] : undefined;
    // Recurse if necessary
    if (nested instanceof nested_error_1.NestedError)
        return exports.getRootError(nested);
    // If there is a nested error return that, otherwise this is the root error
    return nested || error;
};
exports.getRootError = getRootError;
var setSentryContext = function (name, context) {
    Sentry.setContext(name, context);
};
exports.setSentryContext = setSentryContext;
function captureException(error, context, fingerprint) {
    if (context === void 0) { context = {}; }
    if (error === null)
        return;
    var contexts = Object.keys(context).length > 0
        ? {
            Error: context,
        }
        : undefined;
    Sentry.captureException(error, __assign({ contexts: contexts }, (fingerprint ? { fingerprint: fingerprint } : {})));
}
exports.captureException = captureException;
var initSentry = function () {
    Sentry.init({
        dsn: process.env.SENTRY_ADDON_DSN,
        integrations: [new tracing_1.Integrations.BrowserTracing()],
        normalizeDepth: 5,
        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
        denyUrls: [
            // Chrome extensions
            /extensions\//i,
            /^chrome:\/\//i,
            // Safari extensions
            /safari-extension\//i,
        ],
        beforeSend: function (event, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        hint) {
            var _a;
            var error = hint.originalException;
            var rootError = error instanceof nested_error_1.NestedError ? exports.getRootError(error) : error;
            var response = exports.getResponse(rootError);
            var id;
            try {
                var unhandled = (((_a = event.exception) === null || _a === void 0 ? void 0 : _a.values) || []).filter(function (v) { var _a; return ((_a = v.mechanism) === null || _a === void 0 ? void 0 : _a.handled) !== true; });
                if (unhandled.length > 0) {
                    id = uuid_1.v4();
                    if (error instanceof Error) {
                        eventTracking_1.trackErrFromError('unhandled', error, {}, 'sheets-addon', id);
                    }
                    else {
                        eventTracking_1.trackErr({
                            message: error || '',
                            class: unhandled[0].type,
                            action: 'unhandled',
                            source: 'sheets-addon',
                            id: id,
                        });
                    }
                }
            }
            catch (err) {
                // Swallow any exceptions from Amplitude so that we can still log to Sentry at the end.
                console.error(err);
            }
            return __assign(__assign({}, event), { tags: __assign(__assign({}, event.tags), (id && { error_id: id })), extra: __assign(__assign(__assign(__assign({}, event.extra), { 'Error-Full-Object': error }), (response && { 'HTTP-Response': response })), (rootError !== error && { 'Error-Root': rootError })) });
        },
    });
};
exports.initSentry = initSentry;
