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
exports.TransformTable = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var shared_ui_1 = require("@syncwith/shared-ui");
var CellPreviewer_1 = require("./CellPreviewer");
var ExpandButton_1 = require("./ExpandButton");
var TransformTableCellError_1 = require("./TransformTableCellError");
require("./TransformTable.css");
var TransformTable = function (props) {
    var tableTransform = props.tableTransform, onTableTransformChanged = props.onTableTransformChanged;
    var ctx = shared_ui_1.useTransformTable({ tableTransform: tableTransform, onTableTransformChanged: onTableTransformChanged });
    return (jsx_runtime_1.jsx(shared_ui_1.TransformTableUI, __assign({ ExpandButton: ExpandButton_1.ExpandButton, CellPreviewer: CellPreviewer_1.CellPreviewer, CellError: TransformTableCellError_1.TransformTableCellError }, props, { ctx: ctx }), void 0));
};
exports.TransformTable = TransformTable;
