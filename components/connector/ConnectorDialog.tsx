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
exports.ConnectorDialog = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ConnectorCommon_1 = require("./ConnectorCommon");
var ConnectorDialogLayout_1 = require("./ConnectorDialogLayout");
var ConnectorDialog = function (props) {
    return (jsx_runtime_1.jsx(ConnectorCommon_1.ConnectorCommon, __assign({ layout: "dialog" }, props, { children: jsx_runtime_1.jsx(ConnectorDialogLayout_1.ConnectorDialogLayout, {}, void 0) }), void 0));
};
exports.ConnectorDialog = ConnectorDialog;
