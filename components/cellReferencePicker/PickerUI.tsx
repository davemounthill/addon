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
exports.PickerUI = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var common_utils_1 = require("@syncwith/common-utils");
var Layout_1 = require("../Layout");
var Preview_1 = require("./Preview");
var SheetSelect_1 = require("./SheetSelect");
require("./PickerUI.css");
var mkCellRefs = function (range) {
    return range.cellRefEnd
        ? range.cellRefStart + ":" + range.cellRefEnd
        : range.cellRefStart;
};
var PickerUI = function (props) {
    var submit = props.submit, validation = props.validation, validate = props.validate, resetValidation = props.resetValidation;
    // Split the original reference, eg Sheet1!A1:A10
    var maybeInitialRange = props.initialValue
        ? common_utils_1.parseRange(props.initialValue)
        : undefined;
    // Ignore named ranges (for now)
    var initialRange = (maybeInitialRange === null || maybeInitialRange === void 0 ? void 0 : maybeInitialRange.type) === 'cellref-range' ? maybeInitialRange : undefined;
    var _a = react_1.useState(false), loaded = _a[0], setLoaded = _a[1];
    var _b = react_1.useState({
        cellRefs: initialRange ? mkCellRefs(initialRange) : undefined,
        sheetName: initialRange === null || initialRange === void 0 ? void 0 : initialRange.sheetName,
    }), formState = _b[0], setFormStateRaw = _b[1];
    var setFormState = function (formStateDelta) {
        // Use a function to do a partial state update safely
        setFormStateRaw(function (currentFormState) {
            return __assign(__assign({}, currentFormState), formStateDelta);
        });
    };
    var sheetName = formState.sheetName, cellRefs = formState.cellRefs;
    var disabled = !loaded || (validation === null || validation === void 0 ? void 0 : validation.state) === 'validating';
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, ref;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = (validation === null || validation === void 0 ? void 0 : validation.state) === 'valid';
                    if (_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, validate(formState)];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    if (_a) {
                        ref = common_utils_1.mkCellReference(sheetName || '', cellRefs || '');
                        submit(ref);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleCancel = function () {
        submit(undefined);
    };
    var handleBlur = function () {
        validate(formState);
    };
    var handleFocus = function () {
        resetValidation();
    };
    var handleSheetsLoaded = function () {
        setLoaded(true);
    };
    var renderLoading = function (content) {
        return (jsx_runtime_1.jsxs("div", __assign({ style: { textAlign: 'center', marginTop: '1em' } }, { children: [jsx_runtime_1.jsx("div", __assign({ style: { fontSize: '10px', color: '#666', margin: '0.5em' } }, { children: content }), void 0), jsx_runtime_1.jsx(react_bootstrap_1.Spinner, { animation: "border", size: "sm" }, void 0)] }), void 0));
    };
    react_1.useEffect(function () {
        // Run an initial validation if we have values
        if (sheetName && cellRefs) {
            validate(formState);
        }
        // only run when loaded
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded]);
    var handleChangeSheet = function (newSheetName) {
        setFormState({ sheetName: newSheetName });
        resetValidation();
    };
    return (jsx_runtime_1.jsxs(Layout_1.Layout, __assign({ className: "layout-modal", mode: Layout_1.LayoutMode.sidebar }, { children: [jsx_runtime_1.jsx(Layout_1.LayoutPart.Body, { children: jsx_runtime_1.jsx("div", __assign({ className: "edit-main", style: {
                        display: 'flex',
                        fontSize: '12px',
                        height: '100%',
                        flexDirection: 'column',
                    } }, { children: jsx_runtime_1.jsxs("div", __assign({ style: { flexGrow: 1 } }, { children: [jsx_runtime_1.jsx("div", __assign({ className: "mb-2" }, { children: jsx_runtime_1.jsx("div", __assign({ className: "input-group input-group-sm" }, { children: jsx_runtime_1.jsx(SheetSelect_1.SheetSelect, { className: "form-control custom-select", value: sheetName, onBlur: handleBlur, onChange: handleChangeSheet, onLoaded: handleSheetsLoaded }, void 0) }), void 0) }), void 0), jsx_runtime_1.jsxs("div", __assign({ className: "mb-2" }, { children: [jsx_runtime_1.jsx("div", __assign({ className: "input-group input-group-sm" }, { children: jsx_runtime_1.jsx("input", { spellCheck: "false" // disable autocorrect in safari
                                            , disabled: disabled, className: "form-control", name: "cell-reference", placeholder: "eg B23 or C2:C10", onBlur: handleBlur, onFocus: handleFocus, value: cellRefs, onChange: function (e) { return setFormState({ cellRefs: e.target.value }); } }, void 0) }), void 0), (validation === null || validation === void 0 ? void 0 : validation.state) === 'invalid' && (jsx_runtime_1.jsx("div", __assign({ className: "invalid" }, { children: validation.error }), void 0))] }), void 0), !loaded && renderLoading('Loading sheets...'), loaded && validation === undefined && (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx("p", __assign({ style: { marginBottom: '0.5em' } }, { children: "Pull in value(s) from your sheets:" }), void 0), jsx_runtime_1.jsxs("ul", __assign({ style: { paddingInlineStart: '20px', listStyleType: 'disc' } }, { children: [jsx_runtime_1.jsxs("li", { children: ["Pull in a single value by referencing a cell, for example:", ' ', jsx_runtime_1.jsx("b", { children: "A1" }, void 0)] }, void 0), jsx_runtime_1.jsxs("li", { children: ["Run multiple requests by referencing a range of values for example: ", jsx_runtime_1.jsx("b", { children: "A2:A10" }, void 0)] }, void 0)] }), void 0)] }, void 0)), loaded &&
                                (validation === null || validation === void 0 ? void 0 : validation.state) === 'validating' &&
                                renderLoading(jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: ["Checking range ", jsx_runtime_1.jsx("b", { children: validation.range }, void 0), "..."] }, void 0)), (validation === null || validation === void 0 ? void 0 : validation.state) === 'valid' && (jsx_runtime_1.jsx(Preview_1.Preview, { values: common_utils_1.normalizeRangeValues(validation.values) }, void 0)), (validation === null || validation === void 0 ? void 0 : validation.state) === 'invalid' &&
                                (validation === null || validation === void 0 ? void 0 : validation.values) !== undefined && (jsx_runtime_1.jsx(Preview_1.Preview, { values: common_utils_1.normalizeRangeValues(validation.values) }, void 0))] }), void 0) }), void 0) }, void 0), jsx_runtime_1.jsx(Layout_1.LayoutPart.Footer, { children: jsx_runtime_1.jsxs("div", __assign({ className: "edit-connection-actions" }, { children: [jsx_runtime_1.jsx(react_bootstrap_1.Button, __assign({ style: { float: 'left' }, size: "sm", variant: "secondary", onClick: handleCancel }, { children: "Cancel" }), void 0), jsx_runtime_1.jsx(react_bootstrap_1.Button, __assign({ disabled: disabled, size: "sm", variant: "primary", onClick: handleSubmit }, { children: "Apply" }), void 0)] }), void 0) }, void 0)] }), void 0));
};
exports.PickerUI = PickerUI;
