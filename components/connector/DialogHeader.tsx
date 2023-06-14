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
exports.DialogHeader = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var solid_1 = require("@heroicons/react/20/solid");
var useStrictContext_1 = require("../../hooks/useStrictContext");
var eventTracking_1 = require("../../utils/eventTracking");
var nested_error_1 = require("../../utils/nested-error");
var sentry_1 = require("../../utils/sentry");
var ErrorModal_1 = require("../error/ErrorModal");
var Button_1 = require("../ui-tailwind/Button");
var PreviewContext_1 = require("./context/PreviewContext");
var SelectColumns_1 = require("./SelectColumns");
var SelectColumnsValidationError_1 = require("./SelectColumnsValidationError");
var Toggle_1 = require("./Toggle");
var ValidationContext_1 = require("./validation/ValidationContext");
var DialogHeader = function (props) {
    var navKey = props.navKey, toggleDisabled = props.toggleDisabled, onChange = props.onChange;
    var preview = useStrictContext_1.useStrictContext(PreviewContext_1.PreviewContext);
    var errorModal = ErrorModal_1.useErrorModal();
    var validate = useStrictContext_1.useStrictContext(ValidationContext_1.ValidationContext).validate;
    var handleRefresh = function () { return __awaiter(void 0, void 0, void 0, function () {
        var valid, err_1, nested;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, validate(false, 'preview')];
                case 1:
                    valid = _a.sent();
                    // first make sure we're valid
                    if (valid) {
                        preview.refresh();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    nested = new nested_error_1.NestedError("An unexpected error occured refreshing: " + err_1.message, err_1);
                    eventTracking_1.trackErrFromError('preview-refresh', nested);
                    sentry_1.captureException(nested);
                    errorModal.display(ErrorModal_1.ErrorModalFactory({ error: err_1 }));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("div", __assign({ className: "w-full flex flex-col items-end mb-2" }, { children: jsx_runtime_1.jsx(SelectColumnsValidationError_1.SelectColumnsValidationError, {}, void 0) }), void 0), jsx_runtime_1.jsxs("div", __assign({ className: "mb-2 flex justify-between" }, { children: [jsx_runtime_1.jsx(Toggle_1.Toggle, { disabled: toggleDisabled, id: "nav-toggle", navKey: navKey, onChange: onChange }, void 0), jsx_runtime_1.jsxs("div", __assign({ className: "flex space-x-4" }, { children: [jsx_runtime_1.jsx(SelectColumns_1.SelectColumns, { disabled: preview.data.status !== 'loaded', className: navKey === 'source' ? 'invisible' : undefined }, void 0), jsx_runtime_1.jsx(Button_1.Button, __assign({ disabled: preview.data.status === 'loading', size: "xs", variant: "outline", onClick: handleRefresh }, { children: jsx_runtime_1.jsx("div", __assign({ className: "h-full w-full flex items-center" }, { children: jsx_runtime_1.jsx(solid_1.ArrowPathIcon, { className: "h-5 w-5 text-gray-700 fill-current" }, void 0) }), void 0) }), void 0)] }), void 0)] }), void 0)] }, void 0));
};
exports.DialogHeader = DialogHeader;
