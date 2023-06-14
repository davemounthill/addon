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
exports.ExpandButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_bootstrap_1 = require("react-bootstrap");
var misc_1 = require("../../utils/misc");
var ColumnHeaderOverlay_1 = require("./ColumnHeaderOverlay");
var ExpandButton = function (props) {
    var column = props.column, onClick = props.onClick;
    return (jsx_runtime_1.jsx(ColumnHeaderOverlay_1.ColumnHeaderOverlay, __assign({ id: "overlay-" + misc_1.makeId(column.name), title: "Expand \"" + column.displayName + "\"", content: "Click to expand this nested data, adding more rows or columns to your table, you can undo easily" }, { children: jsx_runtime_1.jsx(react_bootstrap_1.Button, __assign({ variant: "outline-primary", onClick: onClick, size: "sm" }, { children: "+ expand" }), void 0) }), void 0));
};
exports.ExpandButton = ExpandButton;
