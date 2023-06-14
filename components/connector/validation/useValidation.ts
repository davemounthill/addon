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
exports.useValidation = void 0;
var react_1 = require("react");
var useStrictContext_1 = require("../../../hooks/useStrictContext");
var eventTracking_1 = require("../../../utils/eventTracking");
var eventTrackingUtil_1 = require("../../../utils/eventTrackingUtil");
var openAPIEndpoint_1 = require("../../../utils/openAPIEndpoint");
var ConnStateContext_1 = require("../../editConnection/connState/ConnStateContext");
var helpers_1 = require("../../editConnection/connState/helpers");
var ConditonalPreviewContext_1 = require("../context/ConditonalPreviewContext");
var ConnectorContext_1 = require("../context/ConnectorContext");
var lib_1 = require("./lib");
var oauthValidation_1 = require("./oauthValidation");
var mkValidState = function () {
    return {
        valid: true,
        parameters: {},
    };
};
var useValidation = function () {
    var value = react_1.useContext(ConnStateContext_1.ConnStateContext).value;
    var suggestion = useStrictContext_1.useStrictContext(ConnectorContext_1.ConnectorContext).suggestion;
    var preview = ConditonalPreviewContext_1.useConditionalPreviewContext();
    var _a = react_1.useState(mkValidState()), state = _a[0], setState = _a[1];
    var _b = react_1.useState(false), validating = _b[0], setValidating = _b[1];
    var clear = function () {
        setState(mkValidState());
    };
    var validateColumns = function (mode, newState) {
        // if we're saving, then require them to choose columns
        if (mode === 'save' && preview && preview.data.status === 'loaded') {
            if (!value.transform) {
                return __assign(__assign({}, newState), { columns: 'Please choose at least 1 column', valid: false });
            }
        }
        return newState;
    };
    var validateParameters = function (newState) {
        var requiredParams = openAPIEndpoint_1.getAllParameters(suggestion.endpoint).filter(function (p) { return p.required === true; });
        var parameterErrors = {};
        for (var _i = 0, requiredParams_1 = requiredParams; _i < requiredParams_1.length; _i++) {
            var required = requiredParams_1[_i];
            var param = helpers_1.getParameter(value, required.in, required.name);
            if (!(param === null || param === void 0 ? void 0 : param.value)) {
                console.log('set');
                parameterErrors[lib_1.mkParamKey(required)] = 'Please specify a value';
            }
        }
        if (Object.keys(parameterErrors).length > 0) {
            return __assign(__assign({}, newState), { valid: false, parameters: parameterErrors });
        }
        return newState;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var validate = function (dryRun, mode) { return __awaiter(void 0, void 0, void 0, function () {
        var newState;
        return __generator(this, function (_a) {
            newState = mkValidState();
            setValidating(true);
            try {
                newState = validateParameters(newState);
                newState = oauthValidation_1.validateOAuth(value, newState);
                newState = validateColumns(mode, newState);
                // Do not save errors on a dry run
                if (!dryRun) {
                    setState(newState);
                }
                if (!dryRun && !newState.valid) {
                    eventTracking_1.trackEvent(eventTracking_1.Events.connectionValidate, __assign(__assign({}, eventTrackingUtil_1.toProperties(newState)), { conn: eventTrackingUtil_1.toPropertiesObject(value) }));
                }
            }
            finally {
                setValidating(false);
            }
            return [2 /*return*/, newState.valid];
        });
    }); };
    var update = function (delta) {
        // Use a function here so we can safely to partial state updates
        setState(function (validationState) {
            return __assign(__assign({}, validationState), delta);
        });
    };
    return {
        state: state,
        validating: validating,
        clear: clear,
        update: update,
        validate: validate,
    };
};
exports.useValidation = useValidation;
