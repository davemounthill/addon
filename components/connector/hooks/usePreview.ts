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
exports.usePreview = void 0;
var dto_1 = require("@syncwith/dto");
var typed_apis_1 = require("@syncwith/typed-apis");
var react_1 = require("react");
var connection_1 = require("../../../api/connection");
var useStrictContext_1 = require("../../../hooks/useStrictContext");
var StoreLoadedContext_1 = require("../../../store/StoreLoadedContext");
var errorTracking_1 = require("../../../utils/errorTracking");
var eventTracking_1 = require("../../../utils/eventTracking");
var eventTrackingUtil_1 = require("../../../utils/eventTrackingUtil");
var ConnStateContext_1 = require("../../editConnection/connState/ConnStateContext");
var useDebounced_1 = require("./useDebounced");
var usePreview = function () {
    var _a = react_1.useState({ status: 'empty' }), data = _a[0], setData = _a[1];
    var auth = react_1.useContext(StoreLoadedContext_1.StoreLoadedContext).auth;
    var connState = useStrictContext_1.useStrictContext(ConnStateContext_1.ConnStateContext);
    var _b = react_1.useState(false), refreshed = _b[0], setRefreshed = _b[1];
    var setError = function (conn, error) {
        errorTracking_1.onConnectionError('connection-preview-refresh', error, conn);
        setData({ status: 'error', error: error, conn: conn });
    };
    var refresh = function (cancelRequested) { return __awaiter(void 0, void 0, void 0, function () {
        var conn, start, response, contentLength, err_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    start = new Date().valueOf();
                    setData({ status: 'loading' });
                    conn = connState.getConn();
                    // If the connection isn't yet saved then track an attempt
                    if (!connection_1.isExistingConnection(conn)) {
                        eventTracking_1.trackConnectionAttempt(auth, conn.data.endpoint, undefined, {
                            conn: eventTrackingUtil_1.connToProps(conn),
                            source: 'preview',
                        });
                    }
                    return [4 /*yield*/, connection_1.previewConnection4(auth, conn)];
                case 1:
                    response = _a.sent();
                    if (!cancelRequested()) {
                        console.log("preview took " + (new Date().valueOf() - start) + "ms");
                        if (dto_1.ConnectionError.guard(response)) {
                            setError(conn, response);
                        }
                        else {
                            contentLength = JSON.stringify(response).length;
                            typed_apis_1.trackEvent(eventTracking_1.Events.connectionPreviewRefresh, {
                                conn: eventTrackingUtil_1.connToProps(conn),
                                contentLength: contentLength,
                            });
                            setData({ status: 'loaded', value: response });
                            setRefreshed(true);
                        }
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    error = err_1 instanceof Error
                        ? err_1
                        : new Error(typeof err_1 === 'string' ? err_1 : JSON.stringify(err_1));
                    setError(conn, error);
                    return [3 /*break*/, 3];
                case 3:
                    // Throw this outside the try catch
                    if (cancelRequested()) {
                        throw new useDebounced_1.CanceledError("Cancel requested");
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return {
        refresh: refresh,
        refreshed: refreshed,
        data: data,
    };
};
exports.usePreview = usePreview;
