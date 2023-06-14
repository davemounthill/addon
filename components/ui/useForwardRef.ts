"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForwardRef = void 0;
var react_1 = require("react");
/**
 * Helper to make it easier to use useImperativeHandle to foward a ref AND keep it yourself
 *
 * see:  https://stackoverflow.com/questions/53561913/react-forwarding-multiple-refs
 */
var useForwardRef = function (ref, forwardRef) {
    react_1.useImperativeHandle(forwardRef, function () {
        return ref.current;
    }, [ref]);
};
exports.useForwardRef = useForwardRef;
