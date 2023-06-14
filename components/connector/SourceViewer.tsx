"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var SourcePre_1 = require("./SourcePre");
var SourceViewer = function (_a) {
    var data = _a.data;
    var getContent = function () {
        var start = new Date().valueOf();
        var content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
        console.log("JSON.stringify took " + (new Date().valueOf() - start) + "ms for SourceViewer");
        return content;
    };
    return jsx_runtime_1.jsx(SourcePre_1.SourcePre, { children: getContent() }, void 0);
};
// Wrap with React.memo so we don't re-render if props don't change, avoid taking say 200ms to stringify json
exports.default = react_1.default.memo(SourceViewer);
