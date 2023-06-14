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
exports.ConnectorContextProvider = exports.ConnectorContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
exports.ConnectorContext = react_1.createContext(undefined);
exports.ConnectorContext.displayName = 'ConnectorContext';
var ConnectorContextProvider = function (props) {
    var _a;
    var columnsMode = ((_a = props.suggestion.endpoint.connector) === null || _a === void 0 ? void 0 : _a.columnsInRequest) !== undefined
        ? 'columns-in-request'
        : 'columns-from-response';
    return (jsx_runtime_1.jsx(exports.ConnectorContext.Provider, __assign({ value: __assign(__assign({}, props), { columnsMode: columnsMode }) }, { children: props.children }), void 0));
};
exports.ConnectorContextProvider = ConnectorContextProvider;
