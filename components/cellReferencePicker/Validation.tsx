"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
var react_1 = require("react");
var common_utils_1 = require("@syncwith/common-utils");
var sentry_1 = require("../../utils/sentry");
var nested_error_1 = require("../../utils/nested-error");
var server_1 = __importDefault(require("../../utils/server"));
var validateCellRefs_1 = require("../editConnection/lib/validateCellRefs");
var serverFunctions = server_1.default.serverFunctions;
var Validation = function (props) {
    var children = props.children;
    var _a = react_1.useState(), validation = _a[0], setValidation = _a[1];
    var setError = function (error, values) {
        if (values === void 0) { values = undefined; }
        setValidation({ state: 'invalid', error: error, values: values });
    };
    var resetValidation = function () {
        setValidation(undefined);
    };
    var validate = function (form) { return __awaiter(void 0, void 0, void 0, function () {
        var sheetName, cellRefs, range, invalidCells, values, rows, cols, err_1, nested;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sheetName = form.sheetName, cellRefs = form.cellRefs;
                    range = common_utils_1.mkCellReference(sheetName || '', cellRefs || '');
                    setValidation({ state: 'validating', range: range });
                    if (!sheetName) {
                        setError('Please pick a sheet');
                        return [2 /*return*/, false];
                    }
                    if (!cellRefs) {
                        setError('A cell reference is required');
                        return [2 /*return*/, false];
                    }
                    invalidCells = validateCellRefs_1.validateCells(range, cellRefs);
                    if (invalidCells) {
                        setError(invalidCells.message);
                        return [2 /*return*/, false];
                    }
                    values = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, serverFunctions.getSpreadsheetValues(range)];
                case 2:
                    values = _a.sent();
                    if (values === null || values === undefined) {
                        throw new Error("Unexpected got " + values + " for range " + range + " from getSpreadsheetValues");
                    }
                    rows = values.length;
                    cols = rows > 0 ? values[0].length : 0;
                    if (rows === 0 || cols === 0) {
                        setError("No values found for your range", values);
                        return [2 /*return*/, false];
                    }
                    if (rows > 1 && cols > 1) {
                        // don't save the values, since they are 2D, and we don't support normalizing or previewing them
                        setError("Ranges with multiple rows and multiple columns are are not supported, please specify a range that points to a single row, column or cell");
                        return [2 /*return*/, false];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    nested = new nested_error_1.NestedError("An unexpected error occurred fetching values for your range: " + err_1.message, err_1);
                    setError(nested.message);
                    sentry_1.captureException(nested, { range: range, values: values });
                    return [2 /*return*/, false];
                case 4:
                    setValidation({ state: 'valid', range: range, values: values });
                    return [2 /*return*/, true];
            }
        });
    }); };
    return children({ validation: validation, validate: validate, resetValidation: resetValidation });
};
exports.Validation = Validation;
