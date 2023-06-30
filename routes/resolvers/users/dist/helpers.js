"use strict";
exports.__esModule = true;
exports.throwError = void 0;
function throwError(value) {
    if (typeof value === 'object') {
        return value;
    }
    throw new Error('Output is not a object');
}
exports.throwError = throwError;
