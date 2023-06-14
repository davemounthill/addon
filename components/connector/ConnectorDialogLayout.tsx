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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorDialogLayout = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useStrictContext_1 = require("../../hooks/useStrictContext");
var SocketContext_1 = require("../editConnection/context/SocketContext");
var PreviewError_1 = require("./previewError/PreviewError");
var ConnectorAccordian_1 = require("./ConnectorAccordian");
var DialogActions_1 = require("./DialogActions");
var DialogHeader_1 = require("./DialogHeader");
var PreviewContext_1 = require("./context/PreviewContext");
var PreviewTransformTable_1 = require("./table/PreviewTransformTable");
var Source_1 = require("./Source");
var ColumnsContext_1 = require("./context/ColumnsContext");
var Viewport_1 = require("./ui/Viewport");
var Loading_1 = __importDefault(require("../previewPane/Loading"));
var ConnStateContext_1 = require("../editConnection/connState/ConnStateContext");
var connection_1 = require("../../utils/connection");
var ValidationContext_1 = require("./validation/ValidationContext");
var HeaderBodyFooter_1 = require("../ui-tailwind/HeaderBodyFooter");
var useAutoRefresh_1 = require("./hooks/useAutoRefresh");
var ConnectorDialogLayout = function () {
    var _a = react_1.useState('preview'), navKey = _a[0], setNavKey = _a[1];
    var preview = useStrictContext_1.useStrictContext(PreviewContext_1.PreviewContext);
    var connState = useStrictContext_1.useStrictContext(ConnStateContext_1.ConnStateContext);
    var validate = useStrictContext_1.useStrictContext(ValidationContext_1.ValidationContext).validate;
    useAutoRefresh_1.useAutoRefresh();
    // Do an initial refresh (todo: if and only if validation passes without issue)
    react_1.useEffect(function () {
        var go = function () { return __awaiter(void 0, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, validate(true, 'preview')];
                    case 1:
                        valid = _a.sent();
                        // See if we should load the preview on first run
                        if (valid) {
                            preview.refresh();
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        go();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var socket = useStrictContext_1.useStrictContext(SocketContext_1.SocketContext);
    // Tell the sidebar we've shown ourself
    react_1.useEffect(function () {
        if (socket.initialized) {
            socket.emitOnShowDialog();
        }
        // I think its OK to break the hook rules here, we only want to run this when socket.initialized changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket.initialized]);
    return (jsx_runtime_1.jsx(ColumnsContext_1.ColumnsContextProvider, { children: jsx_runtime_1.jsxs(HeaderBodyFooter_1.HeaderBodyFooter, __assign({ className: "h-full" }, { children: [jsx_runtime_1.jsxs(HeaderBodyFooter_1.HeaderBodyFooterPart.Body, { children: [jsx_runtime_1.jsx("div", __assign({ style: { width: '30%' } }, { children: jsx_runtime_1.jsx(ConnectorAccordian_1.ConnectorAccordian, { className: "h-full" }, void 0) }), void 0), jsx_runtime_1.jsx("div", __assign({ style: { width: '70%' } }, { children: jsx_runtime_1.jsxs("div", __assign({ className: "ml-2 h-full flex items-stretch flex-col" }, { children: [jsx_runtime_1.jsx(DialogHeader_1.DialogHeader, { toggleDisabled: preview.data.status !== 'loaded', navKey: navKey, onChange: setNavKey }, void 0), preview.data.status === 'error' && (jsx_runtime_1.jsx(PreviewError_1.PreviewError, { navKey: navKey, data: preview.data }, void 0)), preview.data.status === 'empty' && jsx_runtime_1.jsx(Viewport_1.Viewport, {}, void 0), preview.data.status === 'loading' && (jsx_runtime_1.jsx(Viewport_1.Viewport, { children: jsx_runtime_1.jsx(Loading_1.default, { status: "Connecting to " + connection_1.getConnectionHost(connState.getConn()) + "..." }, void 0) }, void 0)), preview.data.status === 'loaded' && (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [navKey === 'preview' && (jsx_runtime_1.jsx(Viewport_1.Viewport, { children: jsx_runtime_1.jsx(PreviewTransformTable_1.PreviewTransformTable, {}, void 0) }, void 0)), navKey === 'source' && jsx_runtime_1.jsx(Source_1.Source, { data: preview.data }, void 0)] }, void 0))] }), void 0) }), void 0)] }, void 0), jsx_runtime_1.jsx(HeaderBodyFooter_1.HeaderBodyFooterPart.Footer, { children: jsx_runtime_1.jsx(DialogActions_1.DialogActions, {}, void 0) }, void 0)] }), void 0) }, void 0));
};
exports.ConnectorDialogLayout = ConnectorDialogLayout;
