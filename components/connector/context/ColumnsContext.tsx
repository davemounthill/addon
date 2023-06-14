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
exports.ColumnsContextProvider = exports.ColumnsContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useStrictContext_1 = require("../../../hooks/useStrictContext");
var PreviewContext_1 = require("./PreviewContext");
var useAutoColumns_1 = require("../hooks/useAutoColumns");
var useColumns_1 = require("../hooks/useColumns");
exports.ColumnsContext = react_1.createContext(undefined);
exports.ColumnsContext.displayName = 'ColumnsContext';
var ColumnsContextProvider = function (props) {
    var preview = useStrictContext_1.useStrictContext(PreviewContext_1.PreviewContext);
    var data = preview.data.status === 'loaded'
        ? preview.data.value.results[0].json
        : null;
    var columns = useColumns_1.useColumns({ data: data });
    var newAvailableColumns = useAutoColumns_1.useAutoColumns(columns).newAvailableColumns;
    var value = __assign(__assign({}, columns), { newAvailableColumns: newAvailableColumns });
    return (jsx_runtime_1.jsx(exports.ColumnsContext.Provider, __assign({ value: value }, { children: props.children }), void 0));
};
exports.ColumnsContextProvider = ColumnsContextProvider;
