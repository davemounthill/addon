"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStrictContext = void 0;
var react_1 = __importDefault(require("react"));
// see https://juliangaramendy.dev/blog/strict-react-context
var useStrictContext = function (contextType) {
    var context = react_1.default.useContext(contextType);
    if (context === undefined) {
        throw new Error(contextType.displayName + " context provider is missing");
    }
    return context;
};
exports.useStrictContext = useStrictContext;
