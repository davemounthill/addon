"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClickOutsideHandler = void 0;
var react_1 = require("react");
/**
 * Hook that alerts clicks outside of the passed ref
 */
var useClickOutsideHandler = function (ref, enabled, // let you use it disabled or enabled, helps stick to hook rules avoiding conditional hooks
callback) {
    react_1.useEffect(function () {
        // Detect clicks outside the element
        function handleClickOutside(event) {
            var node = event.target;
            if (ref.current && !ref.current.contains(node)) {
                callback();
            }
        }
        if (enabled) {
            // Bind the event listener
            // we use mouseup so that the original click can process before we do
            document.addEventListener('mouseup', handleClickOutside);
            return function () {
                // Unbind the event listener on clean up
                document.removeEventListener('mouseup', handleClickOutside);
            };
        }
        return undefined;
    }, [callback, ref, enabled]);
};
exports.useClickOutsideHandler = useClickOutsideHandler;
