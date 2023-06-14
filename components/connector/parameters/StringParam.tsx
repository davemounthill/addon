"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringParam = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Input_1 = require("../ui/Input");
var StringParam = function (props) {
    var invalid = props.invalid, suggestion = props.suggestion, param = props.param, onChange = props.onChange;
    var placeholder = suggestion.placeholder, description = suggestion.description;
    var effPlaceholder = placeholder;
    if (!effPlaceholder && description && description.length <= 50) {
        // display short descriptions in the placeholder spot
        effPlaceholder = description;
    }
    return (jsx_runtime_1.jsx(Input_1.Input, { value: (param === null || param === void 0 ? void 0 : param.value) || '', placeholder: effPlaceholder, onChange: onChange, invalid: invalid }, void 0));
};
exports.StringParam = StringParam;
