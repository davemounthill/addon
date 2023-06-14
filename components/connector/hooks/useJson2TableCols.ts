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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useJson2TableCols = void 0;
var json2table_1 = require("@syncwith/json2table");
var lib_1 = require("../lib");
var applyProposals = function (tableTransform, 
// eslint-disable-next-line @typescript-eslint/ban-types
data, output, timezone) {
    var proposals = json2table_1.proposeTransformsForColumns(output.columns.map(function (col) { return col.name; }), output.result, { timezone: timezone });
    var proposalsFlat = Object.values(proposals).flatMap(function (transformProposals) {
        return transformProposals.slice(0, 1);
    });
    if (proposalsFlat.length > 0) {
        var transforms = tableTransform.transforms;
        // Apply all proposals
        for (var _i = 0, proposalsFlat_1 = proposalsFlat; _i < proposalsFlat_1.length; _i++) {
            var proposal = proposalsFlat_1[_i];
            transforms = __spreadArray(__spreadArray([], transforms), proposal.transforms);
        }
        var nextTableTransform = __assign(__assign({}, tableTransform), { transforms: transforms });
        var nextOutput = json2table_1.json2table(data, nextTableTransform);
        return applyProposals(nextTableTransform, data, nextOutput, timezone);
    }
    return { tableTransform: tableTransform, output: output };
};
/**
 * Recursively apply all json2table transformations to produce the full set of possible columns
 */
var useJson2TableCols = function (props) {
    var data = props.data, timezone = props.timezone;
    var options = { timezone: timezone };
    var initialTableTransform = json2table_1.proposeInitialTableTransform(
    // eslint-disable-next-line @typescript-eslint/ban-types
    data, options);
    var initialOutput = json2table_1.json2table(
    // eslint-disable-next-line @typescript-eslint/ban-types
    data, initialTableTransform);
    var _a = applyProposals(initialTableTransform, 
    // eslint-disable-next-line @typescript-eslint/ban-types
    data, initialOutput, timezone), output = _a.output, tableTransform = _a.tableTransform;
    // rename all columns
    // apply renamings
    for (var _i = 0, _b = output.columns; _i < _b.length; _i++) {
        var column = _b[_i];
        // attempt to parse and regenerate json2table stuff
        var path = column.name.split('.');
        var label = lib_1.mkLabelFromValue(path[path.length - 1]);
        // don't rename if its already been renamed
        // Todo: improve renamings if they exist, eg capitalize say view -> View
        var renames = path.filter(function (p) { return p.indexOf('[renamed]') >= 0; });
        if (renames.length === 0) {
            var renameTransform = {
                type: 'rename',
                input: column.name,
                displayName: label,
            };
            tableTransform.transforms = __spreadArray(__spreadArray([], tableTransform.transforms), [
                renameTransform,
            ]);
        }
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    var finalOutput = json2table_1.json2table(data, tableTransform);
    return { output: finalOutput, tableTransform: tableTransform };
};
exports.useJson2TableCols = useJson2TableCols;
