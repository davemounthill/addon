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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.PreviewProvider = exports.PreviewContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var dto_1 = require("@syncwith/dto");
var connection_1 = require("../../../api/connection");
var eventTracking_1 = require("../../../utils/eventTracking");
var eventTrackingUtil_1 = require("../../../utils/eventTrackingUtil");
var PreviewDialogContext_1 = require("./PreviewDialogContext");
var errorTracking_1 = require("../../../utils/errorTracking");
var StoreLoadedContext_1 = require("../../../store/StoreLoadedContext");
exports.PreviewContext = react_1.default.createContext({});
/**
 * Responsible for talking to the server to fetch the data for previewing the response
 */
var PreviewProvider = function (props) {
    var _a = react_1.useState({
        status: 'undefined',
    }), data = _a[0], setData = _a[1];
    var _b = react_1.default.useContext(PreviewDialogContext_1.PreviewDialogContext), mkConnection = _b.mkConnection, validate = _b.validate;
    // If our parent handed us an error, then update our state to reflect that
    if (props.connectionError) {
        // check if anything changed
        if (data.status !== 'error' || data.error !== props.connectionError.error) {
            setData({
                status: 'error',
                error: props.connectionError.error,
                conn: props.connectionError.conn,
            });
        }
    }
    var auth = react_1.default.useContext(StoreLoadedContext_1.StoreLoadedContext).auth;
    var setError = function (conn, error) {
        errorTracking_1.onConnectionError('connection-preview-refresh', error, conn);
        setData({ status: 'error', error: error, conn: conn });
    };
    var refresh = function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, start, response, contentLength, err_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Let our parent know we're about to refresh
                    if (props.onInitiateRefresh)
                        props.onInitiateRefresh();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    start = new Date().valueOf();
                    setData({ status: 'loading' });
                    conn = mkConnection();
                    // If the connection isn't yet saved then track an attempt
                    if (!connection_1.isExistingConnection(conn)) {
                        eventTracking_1.trackConnectionAttempt(auth, conn.data.endpoint, undefined, {
                            conn: eventTrackingUtil_1.connToProps(conn),
                            source: 'preview',
                        });
                    }
                    return [4 /*yield*/, connection_1.previewConnection4(auth, conn)];
                case 2:
                    response = _a.sent();
                    console.log("preview took " + (new Date().valueOf() - start) + "ms");
                    if (dto_1.ConnectionError.guard(response)) {
                        setError(conn, response);
                    }
                    else {
                        contentLength = JSON.stringify(response).length;
                        eventTracking_1.trackEvent(eventTracking_1.Events.connectionPreviewRefresh, {
                            conn: eventTrackingUtil_1.connToProps(conn),
                            contentLength: contentLength,
                        });
                        setData({ status: 'loaded', value: response });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    error = err_1 instanceof Error
                        ? err_1
                        : new Error(typeof err_1 === 'string' ? err_1 : JSON.stringify(err_1));
                    setError(conn, error);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
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
                            refresh();
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        go();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (jsx_runtime_1.jsx(exports.PreviewContext.Provider, __assign({ value: { data: data, refresh: refresh } }, { children: props.children }), void 0));
};
exports.PreviewProvider = PreviewProvider;
