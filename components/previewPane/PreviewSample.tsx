"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var json2table_1 = require("@syncwith/json2table");
var transformTable_1 = require("../transformTable");
var PreviewSample = function () {
    var sampleData = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
    ];
    var sampleDataTransform = json2table_1.proposeInitialTableTransformMany(
    // eslint-disable-next-line @typescript-eslint/ban-types
    [sampleData], {
        timezone: 'UTC',
    });
    var res = json2table_1.json2table(
    // eslint-disable-next-line @typescript-eslint/ban-types
    sampleData, sampleDataTransform);
    // Be sure to generate proposals off the full data set, not `truncatedResult`
    var proposals = json2table_1.proposeTransformsForColumns(res.columns.map(function (col) { return col.name; }), res.result, {
        timezone: 'UTC',
    });
    return (jsx_runtime_1.jsx(transformTable_1.TransformTable
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    , { 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onTableTransformChanged: function () { }, disabled: true, tableClassName: "table table-striped transform-table", tableTransform: sampleDataTransform, data: res, proposals: proposals }, void 0));
};
exports.default = PreviewSample;
