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
var jsx_runtime_1 = require("react/jsx-runtime");
var dto_1 = require("@syncwith/dto");
var common_utils_1 = require("@syncwith/common-utils");
var connection_1 = require("../../utils/connection");
var ApiRequestError_1 = __importDefault(require("../../api/ApiRequestError"));
var Frame_1 = __importDefault(require("../ui/Frame"));
var Viewport_1 = __importDefault(require("./Viewport"));
var usePaywall_1 = require("../paywall/usePaywall");
var RenderHostedApiRequestError_1 = require("./RenderHostedApiRequestError");
var useWebAppUrl_1 = require("../../hooks/useWebAppUrl");
var SimpleConnectionError_1 = __importDefault(require("../../utils/SimpleConnectionError"));
var HttpApiRequestError_1 = __importDefault(require("../../api/HttpApiRequestError"));
var misc_1 = require("../../utils/misc");
/*
 * Handles rendering the error in both Preview/Source states
 */
var RenderConnectionError = function (props) {
    var data = props.data, isBusiness = props.isBusiness, navKey = props.navKey;
    var displayPaywall = usePaywall_1.usePaywall().displayPaywall;
    var support = useWebAppUrl_1.useWebAppUrl('/gs/support?utm_source=sheets-addon&utm_medium=error&utm_campaign=connection-error');
    var host = props.host || (data.conn ? connection_1.getConnectionHost(data.conn) : undefined);
    var error = data.error;
    // Render the original source of the error
    var renderSource = function (httpError) {
        var _a, _b;
        if (typeof httpError.content === 'string') {
            // If it's a single-line message, eg Facebook's responses like
            // (#3018) The start date of the time range cannot be beyond 37 months from the current date
            // then don't use a pre block.
            if (httpError.content.trim().indexOf('\n') < 0)
                return jsx_runtime_1.jsx("p", { children: httpError.content }, void 0);
            return jsx_runtime_1.jsx("pre", { children: httpError.content }, void 0);
        }
        var friendlyError = common_utils_1.extractError({
            url: (_b = (_a = data.conn) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.endpoint,
            body: httpError.content,
        });
        if (friendlyError)
            return jsx_runtime_1.jsx("p", { children: friendlyError }, void 0);
        return jsx_runtime_1.jsx("pre", { children: JSON.stringify(httpError.content, null, 2) }, void 0);
    };
    // Render a pretty version of the error content if we can
    var renderPreview = function (httpError) {
        if (httpError.contentType === 'text/html') {
            return jsx_runtime_1.jsx(Frame_1.default, { content: httpError.content }, void 0);
        }
        // Just render the source (again) in preview if we have nothing else
        return renderSource(httpError);
    };
    var renderHttpErrorSummary = function (httpError) {
        if (httpError.code === 'unsupported-content') {
            return (jsx_runtime_1.jsxs("div", __assign({ className: "error-summary" }, { children: [jsx_runtime_1.jsx("span", __assign({ className: "badge badge-danger" }, { children: "Error" }), void 0), jsx_runtime_1.jsxs("p", { children: ["It looks like your url is a website, not an API: ", httpError.message, ' ', "Please try googling for ", jsx_runtime_1.jsxs("b", { children: ['<app name>', " api"] }, void 0), " to find API documentation."] }, void 0)] }), void 0));
        }
        /*
        if (supportsOAuth && (httpError.statusCode === 401 || httpError.statusCode === 403)) {
          return (
            <div className="error-summary">
              <span className="badge badge-danger">Error</span>
              <p>
                The server denied access to this URL. Use the Authentication tab to configure your OAuth credentials for this connection.
              </p>
            </div>
          );
        }
         */
        var getStatusText = function () {
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
        var statusText = getStatusText();
        return (jsx_runtime_1.jsxs("div", __assign({ className: "error-summary" }, { children: [jsx_runtime_1.jsx("span", __assign({ className: "badge badge-danger" }, { children: statusText ? (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [httpError.statusCode, ": ", statusText] }, void 0)) : (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: httpError.statusCode }, void 0)) }), void 0), jsx_runtime_1.jsxs("p", { children: ["We received an error from ", jsx_runtime_1.jsxs("b", { children: [host, ":"] }, void 0)] }, void 0)] }), void 0));
    };
    var renderSimpleError = function (message) {
        return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsxs("div", __assign({ className: "error-summary" }, { children: [jsx_runtime_1.jsx("span", __assign({ className: "badge badge-danger" }, { children: "Error" }), void 0), jsx_runtime_1.jsx("p", { children: message }, void 0)] }), void 0), jsx_runtime_1.jsx(Viewport_1.default, {}, void 0)] }, void 0));
    };
    // Handle errors from the server
    if (dto_1.ConnectionError.guard(error)) {
        // Handle errors where the 3rd party api request failed with a failing HTTP response (eg 404, 500)
        if (dto_1.HttpRequestErrorDetails.guard(error.error)) {
            if (dto_1.HostedApiRequestError.guard(error.error.content)) {
                return jsx_runtime_1.jsx(RenderHostedApiRequestError_1.RenderHostedApiRequestError, { error: error.error.content }, void 0);
            }
            return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [renderHttpErrorSummary(error.error), jsx_runtime_1.jsx(Viewport_1.default, { children: navKey === 'preview'
                            ? renderPreview(error.error)
                            : renderSource(error.error) }, void 0)] }, void 0));
        }
        if (error.error.code === 'subscription-refresh-limit') {
            return (jsx_runtime_1.jsxs("div", __assign({ className: "error-summary" }, { children: [jsx_runtime_1.jsx("span", __assign({ className: "badge badge-danger" }, { children: "Error" }), void 0), jsx_runtime_1.jsxs("p", { children: [error.error.message, ". Please", ' ', jsx_runtime_1.jsx("span", __assign({ className: "text-indigo-600 cursor-pointer", onClick: function () {
                                    return displayPaywall({
                                        plan: isBusiness ? 'business' : 'pro',
                                        feature: 'refresh_limit',
                                    });
                                } }, { children: "upgrade" }), void 0), ".", ' '] }, void 0)] }), void 0));
        }
        if (error.error.code === 'request-failed') {
            return renderSimpleError(jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: ["We received an error trying to connect to ", jsx_runtime_1.jsxs("b", { children: [host, ":"] }, void 0), ' ', error.error.message] }, void 0));
        }
        // These errors are still 'expected' and have useful/good error messages
        return renderSimpleError(error.error.message);
    }
    // Handle errors that occurred talking to our server
    if (error instanceof ApiRequestError_1.default) {
        return renderSimpleError(jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: ["We're sorry, an unexpected problem occurred, please try again or", ' ', jsx_runtime_1.jsx("a", __assign({ target: "_blank", rel: "noreferrer", onClick: support.consumeToken, href: support.url }, { children: "contact support" }), void 0), ".", jsx_runtime_1.jsx("br", {}, void 0), jsx_runtime_1.jsx("br", {}, void 0), error.message, error instanceof HttpApiRequestError_1.default && error.content && (jsx_runtime_1.jsx("pre", __assign({ className: "mt-4" }, { children: misc_1.truncate(JSON.stringify(error.content, null, 2), 280) }), void 0))] }, void 0));
    }
    if (error instanceof SimpleConnectionError_1.default) {
        return renderSimpleError(error.message);
    }
    return renderSimpleError(jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: ["We're sorry, it looks like something went wrong with our service, please try again or", ' ', jsx_runtime_1.jsx("a", __assign({ rel: "noreferrer", target: "_blank", onClick: support.consumeToken, href: support.url }, { children: "contact us for support" }), void 0), ' ', "or email us at ", jsx_runtime_1.jsx("a", __assign({ href: "mailto:hello@syncwith.com" }, { children: "hello@syncwith.com" }), void 0), jsx_runtime_1.jsx("br", {}, void 0), jsx_runtime_1.jsx("br", {}, void 0), error.message] }, void 0));
};
exports.default = RenderConnectionError;
