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
exports.json2TableTransform = void 0;
var json2table_1 = require("@syncwith/json2table");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var json2TableTransform = function (data, columns, allTransforms) {
    // next steps
    // 1. Take the list of columns the user chose, generate the json2table transform(s) needed
    // 2. apply that transform to the connstate, update the preview from that
    // 3. Read the list of columns out of the transform
    var tableTransform = allTransforms.tableTransform, output = allTransforms.output;
    // Find the transform columns for the user's columns
    var transformCols = columns.map(function (c1) {
        var col = output.columns.find(function (c2) { return c1.id === c2.name; });
        if (!col)
            throw new Error("Failed to find col " + c1);
        return col;
    });
    // Find the transforms we need
    var requiredTransforms = new Set(transformCols.flatMap(function (c) { return c.transforms; }));
    var transforms = tableTransform.transforms.filter(function (transform, idx) {
        return requiredTransforms.has(idx);
    });
    var newTableTransform = __assign(__assign({}, tableTransform), { transforms: transforms });
    // generate new temp output
    // eslint-disable-next-line @typescript-eslint/ban-types
    var tempOutput = json2table_1.json2table(data, newTableTransform);
    // generate list of columns to remove
    var columnsToRemove = tempOutput.columns
        .filter(function (c1) { return !columns.find(function (c2) { return c2.id === c1.name; }); })
        .filter(function (c) { return c.transforms.length > 0; });
    // Remove columns we don't want
    for (var _i = 0, columnsToRemove_1 = columnsToRemove; _i < columnsToRemove_1.length; _i++) {
        var columnToRemove = columnsToRemove_1[_i];
        var without = json2table_1.withoutColumn(newTableTransform, columnToRemove.name);
        if (without === null)
            throw new Error("Failed to remove column " + columnToRemove.name);
        newTableTransform = without;
    }
    return newTableTransform;
};
exports.json2TableTransform = json2TableTransform;
