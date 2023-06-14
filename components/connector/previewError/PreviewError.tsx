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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewError = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var dto_1 = require("@syncwith/dto");
var common_utils_1 = require("@syncwith/common-utils");
var connection_1 = require("../../../utils/connection");
var ApiRequestError_1 = __importDefault(require("../../../api/ApiRequestError"));
var Frame_1 = __importDefault(require("../../ui/Frame"));
var usePaywall_1 = require("../../paywall/usePaywall");
var SimpleError_1 = require("./SimpleError");
var SourcePre_1 = require("../SourcePre");
var ShortErrorContent_1 = require("./ShortErrorContent");
var useWebAppUrl_1 = require("../../../hooks/useWebAppUrl");
/*
 * Handles rendering the error in both Preview/Source states
 */
var PreviewError = function (props) {
    var navKey = props.navKey, data = props.data, isBusiness = props.isBusiness;
    var displayPaywall = usePaywall_1.usePaywall().displayPaywall;
    var host = data.conn ? connection_1.getConnectionHost(data.conn) : undefined;
    var support = useWebAppUrl_1.useWebAppUrl('/gs/support?utm_source=sheets-addon&utm_medium=error&utm_campaign=connection-error');
    var error = data.error;
    // Render the original source of the error
    var renderSource = function (httpError) {
        var _a, _b;
        if (typeof httpError.content === 'string') {
            // If it's a single-line message, eg Facebook's responses like
            // (#3018) The start date of the time range cannot be beyond 37 months from the current date
            // then don't use a pre block.
            if (httpError.content.trim().indexOf('\n') < 0)
                return jsx_runtime_1.jsx(ShortErrorContent_1.ShortErrorContent, { content: httpError.content }, void 0);
            return jsx_runtime_1.jsx(SourcePre_1.SourcePre, { children: httpError.content }, void 0);
        }
        var friendlyError = common_utils_1.extractError({
            url: (_b = (_a = data.conn) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.endpoint,
            body: httpError.content,
        });
        if (friendlyError)
            return jsx_runtime_1.jsx(ShortErrorContent_1.ShortErrorContent, { content: friendlyError }, void 0);
        return jsx_runtime_1.jsx(SourcePre_1.SourcePre, { children: JSON.stringify(httpError.content, null, 2) }, void 0);
    };
    // Render a pretty version of the error content if we can
    var renderPreview = function (httpError) {
        if (httpError.contentType === 'text/html') {
            return jsx_runtime_1.jsx(Frame_1.default, { content: httpError.content }, void 0);
        }
        // Just render the source (again) in preview if we have nothing else
        return renderSource(httpError);
    };
    var getStatusText = function (httpError) {
        if (httpError.statusText.trim())
            return httpError.statusText;
        switch (httpError.statusCode) {
            case 401:
                return 'Unauthorized';
            case 404:
                return 'Not found';
            case 400:
                return 'Invalid request';
            default:
                return undefined;
        }
    };
    // Handle errors from the server
    if (dto_1.ConnectionError.guard(error)) {
        // Handle errors where the 3rd party api request failed with a failing HTTP response (eg 404, 500)
        if (dto_1.HttpRequestErrorDetails.guard(error.error)) {
            var httpError = error.error;
            var details = navKey === 'preview'
                ? renderPreview(error.error)
                : renderSource(error.error);
            if (httpError.code === 'unsupported-content') {
                return (jsx_runtime_1.jsxs(SimpleError_1.SimpleError, __assign({ details: details }, { children: ["It looks like your url is a website, not an API: ", httpError.message, ' ', "Please try googling for ", jsx_runtime_1.jsxs("b", { children: ['<app name>', " api"] }, void 0), " to find API documentation."] }), void 0));
            }
            var statusText = getStatusText(error.error);
            var badge = statusText
                ? httpError.statusCode + ": " + statusText
                : "" + httpError.statusCode;
            return (jsx_runtime_1.jsxs(SimpleError_1.SimpleError, __assign({ details: details, badge: badge }, { children: ["We received an error from ", jsx_runtime_1.jsxs("b", { children: [host, ":"] }, void 0)] }), void 0));
        }
        if (error.error.code === 'subscription-refresh-limit') {
            return (jsx_runtime_1.jsxs(SimpleError_1.SimpleError, { children: [error.error.message, ". Please", ' ', jsx_runtime_1.jsx("span", __assign({ className: "text-indigo-600 cursor-pointer", onClick: function () {
                            return displayPaywall({
                                plan: isBusiness ? 'business' : 'pro',
                                feature: 'refresh_limit',
                            });
                        } }, { children: "upgrade" }), void 0), "."] }, void 0));
        }
        if (error.error.code === 'request-failed') {
            return (jsx_runtime_1.jsxs(SimpleError_1.SimpleError, { children: ["We received an error trying to connect to ", jsx_runtime_1.jsxs("b", { children: [host, ":"] }, void 0), ' ', error.error.message] }, void 0));
        }
        // These errors are still 'expected' and have useful/good error messages
        return jsx_runtime_1.jsx(SimpleError_1.SimpleError, { children: error.error.message }, void 0);
    }
    // Handle errors that occurred talking to our server
    if (error instanceof ApiRequestError_1.default) {
        return (jsx_runtime_1.jsxs(SimpleError_1.SimpleError, __assign({ details: error.message }, { children: ["We're sorry, an unexpected problem occurred connecting to the SyncWith service, please try again or", ' ', jsx_runtime_1.jsx("a", __assign({ target: "_blank", rel: "noreferrer", onClick: support.consumeToken, href: support.url }, { children: "contact us for support" }), void 0), ' ', "or email us at", ' ', jsx_runtime_1.jsx("a", __assign({ href: "mailto:hello@syncwith.com" }, { children: "hello@syncwith.com" }), void 0)] }), void 0));
    }
    return (jsx_runtime_1.jsxs(SimpleError_1.SimpleError, __assign({ details: error.message }, { children: ["We're sorry, it looks like something went wrong with our service, please try again or", ' ', jsx_runtime_1.jsx("a", __assign({ rel: "noreferrer", target: "_blank", onClick: support.consumeToken, href: support.url }, { children: "contact us for support" }), void 0), ' ', "or email us at ", jsx_runtime_1.jsx("a", __assign({ href: "mailto:hello@syncwith.com" }, { children: "hello@syncwith.com" }), void 0)] }), void 0));
};
exports.PreviewError = PreviewError;
