"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertIsError = void 0;
function assertIsError(err) {
    // if you have nodejs assert:
    // assert(error instanceof Error);
    // otherwise
    if (!(err instanceof Error)) {
        throw err;
    }
}
exports.assertIsError = assertIsError;
