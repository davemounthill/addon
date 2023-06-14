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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoSolid = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var LogoSolid = function (props) {
    var onClick = props.onClick, className = props.className, width = props.width, height = props.height;
    return (jsx_runtime_1.jsxs("svg", __assign({ onClick: onClick, className: className, width: "" + width, height: "" + height, viewBox: "0 0 92 92", xmlns: "http://www.w3.org/2000/svg" }, { children: [jsx_runtime_1.jsx("path", { d: "M91.2136 43.9516L63.615 13.2866C63.0263 12.6365 62.2045 12.2685 61.3336 12.2685H42.9346C41.7264 12.2685 40.6286 12.9799 40.1318 14.0839C39.6412 15.194 39.8435 16.488 40.6531 17.3834L66.4056 46L40.6531 74.6105C39.8435 75.512 39.635 76.8061 40.1318 77.91C40.6286 79.0201 41.7264 79.7315 42.9346 79.7315H61.3336C62.2045 79.7315 63.0263 79.3574 63.615 78.7196L91.2136 48.0546C92.2623 46.8893 92.2623 45.1107 91.2136 43.9516Z" }, void 0), jsx_runtime_1.jsx("path", { d: "M51.3489 43.9516L23.7504 13.2866C23.1617 12.6365 22.3398 12.2685 21.469 12.2685H3.06995C1.86175 12.2685 0.763941 12.9799 0.267167 14.0839C-0.223473 15.194 -0.0210836 16.488 0.788473 17.3834L26.5409 46L0.788473 74.6105C-0.0210836 75.512 -0.229606 76.8061 0.267167 77.91C0.763941 79.0201 1.86175 79.7315 3.06995 79.7315H21.469C22.3398 79.7315 23.1617 79.3574 23.7504 78.7196L51.3489 48.0546C52.3977 46.8893 52.3977 45.1107 51.3489 43.9516Z" }, void 0)] }), void 0));
};
exports.LogoSolid = LogoSolid;
