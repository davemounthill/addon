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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformProvider = exports.TransformContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var shared_ui_1 = require("@syncwith/shared-ui");
var eventTracking_1 = require("../../../utils/eventTracking");
var eventTrackingUtil_1 = require("../../../utils/eventTrackingUtil");
var StoreLoadedContext_1 = require("../../../store/StoreLoadedContext");
exports.TransformContext = react_1.default.createContext({});
var trackEvents = function (input, res, proposals) {
    if (!input.transform) {
        // If the user has not yet applied a transform
        // Do any of the columns have a proposal?
        var colsWithTransforms = Object.entries(proposals).filter(function (_a) {
            var transforms = _a[1];
            return transforms.length > 0;
        });
        if (colsWithTransforms.length > 0) {
            eventTracking_1.trackEvent(eventTracking_1.Events.jsonToTableColWithTransforms, {
                rows: res.result.length,
                columns: res.columns.length,
                columnsWithTransforms: colsWithTransforms.length,
            });
        }
    }
};
/**
 * Responsible for maintaining the result of the current transform, and the undo/redo stack
 *
 * Ultimately the transform is stored above us
 */
var TransformProvider = function (props) {
    var timezone = react_1.useContext(StoreLoadedContext_1.StoreLoadedContext).spreadsheetProperties.timezone;
    var transformer = shared_ui_1.useTransform(__assign(__assign({}, props), { timezone: timezone, jmespath: undefined, onRedo: function (undoLength, redoLength, transform) {
            eventTracking_1.trackEvent(eventTracking_1.Events.jsonToTableRedo, __assign({ undoLength: undoLength, redoLength: redoLength }, eventTrackingUtil_1.toProperties(transform)));
        }, onUndo: function (undoLength, redoLength, transform) {
            eventTracking_1.trackEvent(eventTracking_1.Events.jsonToTableUndo, __assign({ undoLength: undoLength, redoLength: redoLength }, eventTrackingUtil_1.toProperties(transform)));
        }, onTransform: function (input, res, proposals) {
            trackEvents(input, res, proposals);
        } }));
    return (jsx_runtime_1.jsx(exports.TransformContext.Provider, __assign({ value: transformer }, { children: props.children }), void 0));
};
exports.TransformProvider = TransformProvider;
