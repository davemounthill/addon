"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarModals = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var CellReferencePickerOverlay_1 = require("./cellReferencePicker/CellReferencePickerOverlay");
var ui_1 = require("./ui");
var SidebarModals = function (props) {
    var children = props.children;
    return (jsx_runtime_1.jsx(CellReferencePickerOverlay_1.CellReferencePickerOverlay, { children: jsx_runtime_1.jsx(ui_1.ModalOverlay, { children: jsx_runtime_1.jsx(ui_1.ModalSpinnerOverlay, { children: children }, void 0) }, void 0) }, void 0));
};
exports.SidebarModals = SidebarModals;
