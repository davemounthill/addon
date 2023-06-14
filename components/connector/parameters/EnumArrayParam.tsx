"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumArrayParam = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var typed_apis_1 = require("@syncwith/typed-apis");
var common_utils_1 = require("@syncwith/common-utils");
var lib_1 = require("../lib");
var EnumArrayParam = function (props) {
    var _a;
    var suggestion = props.suggestion, param = props.param, onChange = props.onChange;
    if (((_a = suggestion.schema) === null || _a === void 0 ? void 0 : _a.type) !== 'array')
        throw new Error('Expected array type');
    var items = __spreadArray([], (common_utils_1.getNonRef(suggestion.schema.items).enum || []).map(function (v) {
        return {
            id: v,
            label: lib_1.mkLabelFromValue(v),
        };
    }));
    var selected = (param ? param.value.split(',') : []).flatMap(function (v) {
        var item = items.find(function (i) { return i.id === v; });
        return item ? [item] : [];
    });
    var handleSelectedChange = function (newSelected) {
        var newValue = newSelected.map(function (s) { return s.id; }).join(',');
        if (onChange)
            onChange(newValue);
    };
    return (jsx_runtime_1.jsx(typed_apis_1.MultiSelect, { selected: selected, onSelectedItemsChange: handleSelectedChange, themeType: lib_1.DefaultThemeType, items: items }, void 0));
};
exports.EnumArrayParam = EnumArrayParam;
