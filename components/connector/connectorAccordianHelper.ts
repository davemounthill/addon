"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccordionError = void 0;
var getAccordionError = function (state) {
    if (state.authentication)
        return 'general';
    return undefined;
};
exports.getAccordionError = getAccordionError;
