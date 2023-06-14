"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConnectionError = void 0;
var dto_1 = require("@syncwith/dto");
var json_stable_stringify_1 = __importDefault(require("json-stable-stringify"));
var lib_1 = require("../components/typedConnection/lib");
var connection_1 = require("./connection");
var eventTracking_1 = require("./eventTracking");
var eventTrackingUtil_1 = require("./eventTrackingUtil");
var runtypesRegistry_1 = require("./runtypesRegistry");
var sentry_1 = require("./sentry");
/** Carefully track all relevant details to Amplitude, GA, Sentry etc for a ConnectionError */
// eslint-disable-next-line import/prefer-default-export
var onConnectionError = function (action, connectionError, conn) {
    var _a;
    console.error(connectionError);
    var connProps = conn ? eventTrackingUtil_1.connToProps(conn) : undefined;
    // see if we can extract a structured error
    var type = (_a = conn === null || conn === void 0 ? void 0 : conn.data.blob) === null || _a === void 0 ? void 0 : _a.type;
    var api = type ? runtypesRegistry_1.RuntypesRegistry.findTypedAPI(type) : undefined;
    var extracted = api && dto_1.ConnectionError.guard(connectionError)
        ? lib_1.extractTypedAPIError(api, connectionError)
        : undefined;
    if (extracted) {
        eventTracking_1.trackErr({
            action: action,
            message: extracted.message,
            class: extracted.source,
            source: extracted.source,
            code: extracted.sourceCode,
            subcode: extracted.sourceSubcode,
            details: extracted.details,
        }, {
            conn: connProps,
        });
        return;
    }
    if (dto_1.ConnectionError.guard(connectionError)) {
        var error = connectionError.error;
        if (dto_1.HttpRequestErrorDetails.guard(error)) {
            var content = typeof error.content === 'string'
                ? error.content
                : json_stable_stringify_1.default(error.content);
            var contentSubset = content.length > 100 ? content.substr(0, 100) + "..." : content;
            eventTracking_1.trackErr({
                action: action,
                message: error.message,
                class: 'SyncWith.HttpRequestError',
                code: error.statusCode.toString(),
                source: (conn && connection_1.getConnectionHost(conn)) || 'unknown',
                details: error.statusText + ": " + contentSubset,
            }, {
                conn: connProps,
            });
        }
        else {
            // otherwise its RequestErrorDetails
            eventTracking_1.trackErr({
                action: action,
                message: error.message,
                class: 'SyncWith.RequestError',
                code: error.code,
                source: 'webbase',
                details: json_stable_stringify_1.default(error),
            }, {
                conn: connProps,
            });
        }
    }
    else {
        // it must be an Error
        // Since this is unexpected, and on our end, lets track this to sentry
        if (conn) {
            sentry_1.setSentryContext('Connection', conn);
        }
        // Capture the stack for GAS ScriptErrors, sentry seems to throw this away
        var errorStack = connectionError.name === 'ScriptError'
            ? connectionError.stack
            : undefined;
        // Fingerprint GAS ScriptErrors
        var fingerprint = errorStack
            ? [
                'ScriptError',
                (connectionError.message || '').split(' ').slice(0, 2).join(' '),
                errorStack,
            ]
            : undefined;
        sentry_1.captureException(connectionError, { action: action, errorStack: errorStack }, fingerprint);
        var source = conn ? connection_1.getConnectionHost(conn) : undefined;
        eventTracking_1.trackErrFromError(action, connectionError, { conn: connProps, errorStack: errorStack }, source);
    }
};
exports.onConnectionError = onConnectionError;
