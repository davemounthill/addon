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
exports.PreviewTable = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ColumnHeader_1 = require("./ColumnHeader");
var PreviewTable = function (props) {
    var data = props.data, disabled = props.disabled, onRename = props.onRename, onDelete = props.onDelete;
    var handleRename = function (column, newLabel) {
        if (onRename) {
            onRename(column, newLabel);
        }
    };
    var handleDelete = function (column) {
        if (onDelete) {
            onDelete(column);
        }
    };
    return (jsx_runtime_1.jsx("div", __assign({ className: "w-full h-full" }, { children: jsx_runtime_1.jsxs("table", __assign({ className: "divide-y divide-gray-300 w-full border-b border-gray-200" }, { children: [jsx_runtime_1.jsx("thead", __assign({ className: "bg-gray-100" }, { children: jsx_runtime_1.jsx("tr", __assign({ className: "divide-x divide-gray-200" }, { children: data.columns.map(function (col) { return (jsx_runtime_1.jsx(ColumnHeader_1.ColumnHeader, { disabled: disabled, className: "py-1 pl-3 pr-2 whitespace-nowrap text-left text-xs font-semibold text-gray-700 ", onRename: function (newLabel) {
                                handleRename(col, newLabel);
                            }, onDelete: function () {
                                handleDelete(col);
                            }, column: col }, col.name)); }) }), void 0) }), void 0), jsx_runtime_1.jsx("tbody", __assign({ className: "divide-y divide-gray-200 bg-white" }, { children: data.result.map(function (row, rowIdx) {
                        return (jsx_runtime_1.jsx("tr", __assign({ className: "divide-x divide-gray-200" }, { children: data.columns.map(function (col) {
                                var value = row[col.name];
                                var valueStr = value !== undefined && value !== null // be careful, we want to show boolean false not ignore it
                                    ? value.toString()
                                    : '';
                                return (jsx_runtime_1.jsx("td", __assign({ className: "whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6" }, { children: valueStr || jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: "\u00A0" }, void 0) }), col.name));
                            }) }), rowIdx));
                    }) }), void 0)] }), void 0) }), void 0));
};
exports.PreviewTable = PreviewTable;
