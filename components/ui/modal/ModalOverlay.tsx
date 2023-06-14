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
exports.ModalOverlay = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Context_1 = require("./Context");
var Modal_1 = require("./Modal");
/**
 * Conditionally hides your component(s) and renders a Modal with new component in it
 *
 * Uses Context to let you or anyone down the chain invoke the modal
 */
var ModalOverlay = function (props) {
    var children = props.children;
    var _a = react_1.useState({
        visible: false,
    }), state = _a[0], setState = _a[1];
    var display = function (component) {
        return new Promise(function (resolve) {
            setState({
                visible: true,
                component: component,
                onSubmit: function (value) {
                    setState({ visible: false });
                    resolve(value);
                },
                onCancel: function () {
                    setState({ visible: false });
                    resolve(undefined);
                },
            });
        });
    };
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [state.visible && (jsx_runtime_1.jsx(Modal_1.Modal, { onCancel: state.onCancel, onSubmit: state.onSubmit, component: state.component }, void 0)), jsx_runtime_1.jsx(Context_1.Provider, __assign({ display: display }, { children: jsx_runtime_1.jsx("div", __assign({ className: "modal-overlay " + (state.visible ? 'hidden' : undefined) }, { children: children }), void 0) }), void 0)] }, void 0));
};
exports.ModalOverlay = ModalOverlay;
