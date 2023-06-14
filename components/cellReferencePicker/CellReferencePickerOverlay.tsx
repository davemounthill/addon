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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellReferencePickerOverlay = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var eventTracking_1 = require("../../utils/eventTracking");
var Picker_1 = require("./Picker");
var CellReferencePickerContext_1 = require("./CellReferencePickerContext");
/**
 * Conditionally hides your component(s) and renders a picker (but keeps your component mounted)
 *
 * Uses Context to let you or anyone down the chain invoke the picker
 */
var CellReferencePickerOverlay = function (props) {
    var children = props.children;
    var _a = react_1.useState({
        visible: false,
    }), pickerState = _a[0], setPickerState = _a[1];
    var invokePicker = function (initialValue, source) {
        eventTracking_1.trackEvent(eventTracking_1.Events.cellrefPickerShow, { source: source, initialValue: initialValue });
        return new Promise(function (resolve) {
            setPickerState({
                visible: true,
                initialValue: initialValue,
                submit: function (value) {
                    // if they chose a value (vs canceled), then track an event
                    if (value) {
                        eventTracking_1.trackEvent(eventTracking_1.Events.cellrefPickerSubmit, { source: source, value: value });
                    }
                    resolve(value);
                },
            });
        });
    };
    var handleSubmit = function (value) {
        if (!pickerState.visible)
            throw new Error("Expected picker visible");
        pickerState.submit(value);
        setPickerState({ visible: false });
    };
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [pickerState.visible && (jsx_runtime_1.jsx(Picker_1.Picker, { initialValue: pickerState.initialValue, submit: handleSubmit }, void 0)), jsx_runtime_1.jsx(CellReferencePickerContext_1.CellReferencePickerProvider, __assign({ invokePicker: invokePicker }, { children: jsx_runtime_1.jsx("div", __assign({ className: "modal-overlay " + (pickerState.visible ? 'hidden' : 'undefined') }, { children: children }), void 0) }), void 0)] }, void 0));
};
exports.CellReferencePickerOverlay = CellReferencePickerOverlay;
