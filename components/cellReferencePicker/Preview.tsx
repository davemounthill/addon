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
exports.Preview = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
require("./Preview.css");
var Preview = function (_a) {
    var values = _a.values;
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx("p", __assign({ style: { marginTop: '1em', marginBottom: '0.25em' } }, { children: "Range value(s):" }), void 0), jsx_runtime_1.jsx("table", __assign({ className: "table table-striped table-bordered cellref-preview" }, { children: jsx_runtime_1.jsx("tbody", { children: values.map(function (value, rowIdx) {
                        return (jsx_runtime_1.jsx("tr", { children: jsx_runtime_1.jsx("td", { children: value || '\u00A0' }, void 0) }, rowIdx));
                    }) }, void 0) }), void 0)] }, void 0));
};
exports.Preview = Preview;
