"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Source = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var SourceViewer_1 = __importDefault(require("./SourceViewer"));
var Viewport_1 = require("./ui/Viewport");
var Source = function (props) {
    var data = props.data;
    return (jsx_runtime_1.jsx(Viewport_1.Viewport, { children: data.value.results.map(function (result, index) {
            return jsx_runtime_1.jsx(SourceViewer_1.default, { data: result.json }, index);
        }) }, void 0));
};
exports.Source = Source;
