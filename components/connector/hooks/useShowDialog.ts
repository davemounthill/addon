"use strict";
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
exports.useShowDialog = void 0;
var typed_apis_1 = require("@syncwith/typed-apis");
var react_1 = require("react");
var eventTracking_1 = require("../../../utils/eventTracking");
var eventTrackingUtil_1 = require("../../../utils/eventTrackingUtil");
var nested_error_1 = require("../../../utils/nested-error");
var ConnStateContext_1 = require("../../editConnection/connState/ConnStateContext");
var SocketContext_1 = require("../../editConnection/context/SocketContext");
var dialog = __importStar(require("../../../utils/dialog"));
var store_1 = require("../../../store");
var useStrictContext_1 = require("../../../hooks/useStrictContext");
var ConnectorContext_1 = require("../context/ConnectorContext");
var lib_1 = require("../lib");
var sentry_1 = require("../../../utils/sentry");
var useShowDialog = function () {
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var suggestion = useStrictContext_1.useStrictContext(ConnectorContext_1.ConnectorContext).suggestion;
    var connState = useStrictContext_1.useStrictContext(ConnStateContext_1.ConnStateContext);
    var socket = useStrictContext_1.useStrictContext(SocketContext_1.SocketContext);
    var setLocation = store_1.useLocation().setLocation;
    var conn = connState.getConn();
    // Wait for a first event to come back from the dialog that we showed
    react_1.useEffect(function () {
        if (socket.receivedEvent) {
            // the preview dialog must have been shown!
            setLoading(false);
        }
    }, [socket.receivedEvent]);
    var title = suggestion.host.name + " " + lib_1.mkConnectorTitle(suggestion);
    var show = function () { return __awaiter(void 0, void 0, void 0, function () {
        var location, err_1, nested;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    location = {
                        path: '/connector/:connector/preview',
                        socketRoomId: socket.roomId,
                        suggestion: suggestion,
                        conn: conn,
                    };
                    typed_apis_1.trackEvent(eventTracking_1.Events.connectionPreviewShow, eventTrackingUtil_1.connToProps(conn));
                    // use a timer to make sure we eventually shut off the spinner
                    setInterval(function () {
                        setLoading(false);
                    }, 10000);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, dialog.showModalDialog(location, title)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    nested = new nested_error_1.NestedError("Failed to display the preview dialog: " + err_1.message, err_1);
                    eventTracking_1.trackErrFromError('show-preview', nested);
                    sentry_1.captureException(nested);
                    setLocation({ path: '/error', error: nested });
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return {
        show: show,
        loading: loading,
    };
};
exports.useShowDialog = useShowDialog;
