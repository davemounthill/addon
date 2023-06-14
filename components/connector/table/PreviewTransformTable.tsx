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
exports.PreviewTransformTable = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var json2table_1 = require("@syncwith/json2table");
var useStrictContext_1 = require("../../../hooks/useStrictContext");
var ConnStateContext_1 = require("../../editConnection/connState/ConnStateContext");
var PreviewContext_1 = require("../context/PreviewContext");
var ColumnsContext_1 = require("../context/ColumnsContext");
var PreviewTable_1 = require("./PreviewTable");
var sampleData_1 = require("./sampleData");
var PreviewTransformTable = function () {
    var connState = useStrictContext_1.useStrictContext(ConnStateContext_1.ConnStateContext);
    var data = useStrictContext_1.useStrictContext(PreviewContext_1.PreviewContext).data;
    var tableState = useStrictContext_1.useStrictContext(ColumnsContext_1.ColumnsContext);
    var output = sampleData_1.SampleData;
    var sampleData = true;
    if (tableState.selectedColumns.length > 0 &&
        connState.value.transform &&
        data.status === 'loaded') {
        output = json2table_1.json2table(
        // eslint-disable-next-line @typescript-eslint/ban-types
        data.value.results[0].json, connState.value.transform);
        sampleData = false;
    }
    var handleRename = function (column, newLabel) {
        if (!newLabel)
            return; // don't rename to an empty value
        var transform = connState.value.transform;
        if (!transform)
            throw new Error("Expected transform");
        // We can't find the transform by column id (name) since our column's name includes [rename] since
        // it was already renamed
        // we're not trying to add a *new* rename, but instead replace existing
        var renames = transform.transforms
            .filter(function (t, idx) { return column.transforms.find(function (x) { return x === idx; }); }) // filter to the transforms for *this* column
            .flatMap(function (t) { return (t.type === 'rename' ? [t] : []); }); // find the rename transform
        if (renames.length !== 1) {
            throw new Error("Expected to find 1 rename for column " + column.name + ", but found " + renames.length);
        }
        var rename = renames[0];
        var newRename = __assign(__assign({}, rename), { displayName: newLabel });
        connState.set(function (state) {
            return __assign(__assign({}, state), { transform: __assign(__assign({}, transform), { transforms: transform.transforms.map(function (t) {
                        return t === rename ? newRename : t;
                    }) }) });
        });
    };
    var handleDelete = function (column) {
        var transform = connState.value.transform;
        if (!transform)
            throw new Error("Expected transform");
        var selectedColumns = tableState.selectedColumns.filter(function (c) { return c.id !== column.name; });
        tableState.setSelectedColumns(selectedColumns);
    };
    return (jsx_runtime_1.jsx(PreviewTable_1.PreviewTable, { data: output, disabled: sampleData, onRename: handleRename, onDelete: handleDelete }, void 0));
};
exports.PreviewTransformTable = PreviewTransformTable;
