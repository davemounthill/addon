"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var nested_error_1 = require("../../utils/nested-error");
var sentry_1 = require("../../utils/sentry");
/**
 * This is used to (safely?) embed 3rd party HTML we got from an API request and preview it for the user
 *
 * Challenge: Security - if we're not careful it seems that sites like yahoo finance and google.com can start responding to events in our UI (outside their iframe).
 * Solution: double iFrame! not exactly sure how/why this works
 *
 * Challenge: Inside the double (secured) iframe it seems like its not possible to dynamic set the height of the inner iFrame,
 * I get "iframe scrollheight Blocked a frame with origin "null" from accessing a cross-origin frame"
 * Solution: choose an arbitrary height, 1000px, and set both iFrames to that height
 */
var Frame = function (props) {
    var escape = function (s) {
        if (!s || typeof s !== 'string')
            return s;
        try {
            return s.replace(/"/g, '&quot;');
        }
        catch (err) {
            var nested = new nested_error_1.NestedError("Failed to call replace on string with value " + s + ": " + err.message, err);
            sentry_1.captureException(nested);
            return s;
        }
    };
    return (jsx_runtime_1.jsx("iframe", { width: "100%", height: "1000px", scrolling: "no", sandbox: "", frameBorder: "0", srcDoc: "\n      <iframe\n        sandbox='allow-scripts allow-same-origin'\n        width='100%'\n        height='1000px'\n        scrolling='no'\n        frameBorder='0'\n        srcDoc=\"" + escape(props.content) + "\"\n        allow=\"accelerometer 'none';ambient-light-sensor 'none';camera 'none';display-capture 'none';document-domain 'none';fullscreen 'none';geolocation 'none';gyroscope 'none';magnetometer 'none';microphone 'none';midi 'none';payment 'none';usb 'none';vibrate 'none';vr 'none';webauthn 'none'\"\n      />\n      " }, void 0));
};
exports.default = Frame;
