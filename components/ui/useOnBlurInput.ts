"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnBlurInput = void 0;
var react_1 = require("react");
/** Use this to convert your <input/> element to fire change events when it loses focus to changing live on every keystroke  */
var useOnBlurInput = function (props) {
    var inputRef = props.inputRef, value = props.value, onChange = props.onChange, onPaste = props.onPaste;
    var _a = react_1.useState({ status: 'default' }), state = _a[0], setState = _a[1];
    var liveValue = state.status === 'user-typing' ? state.liveValue : value;
    /* console.log(
      `useOnBlurInput.render value=${value}, state=${JSON.stringify(state)}`
    ); */
    // setup event listeners
    react_1.useEffect(function () {
        var onFocus = function () {
            setState({ status: 'user-typing', liveValue: value });
        };
        var onBlur = function () {
            if (state.status === 'user-typing') {
                onChange(state.liveValue);
            }
            setState({ status: 'default' });
        };
        var handlePaste = function (e) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, selectionStart, selectionEnd;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!onPaste) return [3 /*break*/, 2];
                        if (!inputRef.current)
                            throw new Error("Expected inputRef.current");
                        _a = inputRef.current, selectionStart = _a.selectionStart, selectionEnd = _a.selectionEnd;
                        return [4 /*yield*/, onPaste({ liveValue: liveValue, e: e, selectionStart: selectionStart, selectionEnd: selectionEnd })];
                    case 1:
                        _b.sent();
                        if (e.defaultPrevented) {
                            setState({ status: 'user-pasted' });
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        if (inputRef.current) {
            var input_1 = inputRef.current;
            input_1.addEventListener('focus', onFocus);
            input_1.addEventListener('blur', onBlur);
            input_1.addEventListener('paste', handlePaste);
            // Cleanup event listeners
            return function () {
                input_1.removeEventListener('focus', onFocus);
                input_1.removeEventListener('blur', onBlur);
                input_1.removeEventListener('paste', handlePaste);
            };
        }
        return undefined;
    }, [inputRef, liveValue, onChange, onPaste, state, value]);
    // React to state.status changes
    react_1.useEffect(function () {
        if (state.status === 'user-pasted') {
            if (!inputRef.current)
                throw new Error("Expected inputRef.current");
            inputRef.current.blur();
            setState({ status: 'default' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.status]);
    var handleChange = function (newValue) {
        if (state.status !== 'user-typing') {
            throw new Error("Expected state user-type");
        }
        setState({ status: 'user-typing', liveValue: newValue });
    };
    return {
        handleChange: handleChange,
        liveValue: liveValue,
    };
};
exports.useOnBlurInput = useOnBlurInput;
