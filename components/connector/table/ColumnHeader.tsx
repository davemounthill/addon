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
exports.ColumnHeader = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var solid_1 = require("@heroicons/react/20/solid");
var InlineEdit_1 = require("./InlineEdit");
var ColumnHeader = function (props) {
    var disabled = props.disabled, className = props.className, column = props.column, onRename = props.onRename, onDelete = props.onDelete;
    var name = column.displayName;
    return (jsx_runtime_1.jsx("th", __assign({ className: className }, { children: jsx_runtime_1.jsxs("div", __assign({ className: "flex items-center space-x-3" }, { children: [jsx_runtime_1.jsx(InlineEdit_1.InlineEdit, { disabled: disabled, className: "w-full inline-block p-1 border-transparent " + (!disabled
                        ? 'hover:bg-white hover:border-gray-300 cursor-pointer'
                        : '') + " rounded-md border ", inputClassName: "w-full block p-1 rounded-md border border-bootstrap-light-blue outline-none ring-0", onChange: onRename, value: name }, void 0), !disabled && (jsx_runtime_1.jsx("div", __assign({ className: "cursor-pointer group", onClick: onDelete }, { children: jsx_runtime_1.jsx(solid_1.XCircleIcon, { className: "h-7 w-7 text-gray-400 group-hover:text-gray-600" }, void 0) }), void 0))] }), void 0) }), void 0));
};
exports.ColumnHeader = ColumnHeader;
