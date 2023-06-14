"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrevious = void 0;
var react_1 = require("react");
var usePrevious = function (value) {
    var ref = react_1.useRef();
    react_1.useEffect(function () {
        ref.current = value; // assign the value of ref to the argument
    }, [value]); // this code will run when the value of 'value' changes
    return ref.current; // in the end, return the current ref value.
};
exports.usePrevious = usePrevious;
