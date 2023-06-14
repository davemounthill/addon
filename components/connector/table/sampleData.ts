"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleData = void 0;
var json2table_1 = require("@syncwith/json2table");
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
exports.SampleData = json2table_1.json2table(
// eslint-disable-next-line @typescript-eslint/ban-types
sampleData, sampleDataTransform);
