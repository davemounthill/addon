"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineInput = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var InlineInput = function (props) {
    var size = props.size, className = props.className, value = props.value, onChange = props.onChange, onFinish = props.onFinish;
    var inputRef = react_1.useRef(null);
    var handleBlur = function () {
        onFinish(false);
    };
    var handleKeyPress = function (e) {
        if (e.key === 'Escape') {
            onFinish(true);
        }
        else if (e.key === 'Enter') {
            onFinish(false);
        }
    };
    react_1.useEffect(function () {
        var _a;
        if (!inputRef.current)
            console.warn('Expected inputRef');
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    return (jsx_runtime_1.jsx("input", { size: size, onKeyUp: handleKeyPress, onBlur: handleBlur, ref: inputRef, className: className, onChange: function (e) { return onChange(e.target.value); }, value: value }, void 0));
};
exports.InlineInput = InlineInput;
