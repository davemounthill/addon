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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutPart = exports.Layout = exports.LayoutMode = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var store_1 = require("../store");
var SidebarModals_1 = require("./SidebarModals");
require("./Layout.css");
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
var LayoutBody = function (props) { return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: props.children }, void 0)); };
var LayoutFooter = function (props) { return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: props.children }, void 0)); };
var LayoutHeader = function (props) { return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: props.children }, void 0)); };
var LayoutPane = function (props) { return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: props.children }, void 0)); };
var LayoutMode;
(function (LayoutMode) {
    LayoutMode["sidebar"] = "sidebar";
    LayoutMode["dialog"] = "dialog";
})(LayoutMode = exports.LayoutMode || (exports.LayoutMode = {}));
var Layout = function (props) {
    var children = props.children, className = props.className;
    var store = store_1.useGlobal()[0];
    var mode = props.mode ||
        (store.dialogId !== undefined ? LayoutMode.dialog : LayoutMode.sidebar);
    var findBody = function () {
        return react_1.default.Children.toArray(children).find(function (child) {
            return react_1.default.isValidElement(child) && child.type === LayoutBody;
        });
    };
    var findFooter = function () {
        return react_1.default.Children.toArray(children).find(function (child) {
            return react_1.default.isValidElement(child) && child.type === LayoutFooter;
        });
    };
    var findHeader = function () {
        return react_1.default.Children.toArray(children).find(function (child) {
            return react_1.default.isValidElement(child) && child.type === LayoutHeader;
        });
    };
    var findPane = function () {
        return react_1.default.Children.toArray(children).find(function (child) {
            return react_1.default.isValidElement(child) && child.type === LayoutPane;
        });
    };
    var body = findBody();
    var footer = findFooter();
    var header = findHeader();
    var pane = findPane();
    var renderHeader = function () {
        return (jsx_runtime_1.jsx("div", __assign({ id: "layout-header" }, { children: jsx_runtime_1.jsx("div", __assign({ id: "layout-header-child" }, { children: header }), void 0) }), void 0));
    };
    var layoutBodyClassNames = 'flex flex-col overflow-auto flex-grow';
    return (jsx_runtime_1.jsxs("div", __assign({ id: "layout", className: mode.toString() + " " + className + " h-full flex flex-col" }, { children: [mode === LayoutMode.sidebar && header && renderHeader(), mode === LayoutMode.sidebar && (jsx_runtime_1.jsx("div", __assign({ id: "layout-body", className: layoutBodyClassNames }, { children: body }), void 0)), mode === LayoutMode.dialog && (jsx_runtime_1.jsxs("div", __assign({ id: "layout-body-pane", className: "h-full flex" }, { children: [jsx_runtime_1.jsx("div", __assign({ className: "layout-column-container", style: { width: '30%' } }, { children: jsx_runtime_1.jsx(SidebarModals_1.SidebarModals, { children: jsx_runtime_1.jsxs("div", __assign({ id: "layout-column", className: "h-full flex flex-col" }, { children: [header && renderHeader(), jsx_runtime_1.jsx("div", __assign({ id: "layout-body", className: layoutBodyClassNames }, { children: body }), void 0)] }), void 0) }, void 0) }), void 0), jsx_runtime_1.jsx("div", __assign({ id: "layout-pane", style: { width: '70%' }, className: "flex-grow" }, { children: pane }), void 0)] }), void 0)), jsx_runtime_1.jsx("div", __assign({ id: "layout-footer", className: classNames('flex-shrink-0', mode === 'sidebar' ? 'border-t border-gray-300 bg-gray-100' : '') }, { children: footer && (jsx_runtime_1.jsx("div", __assign({ id: "layout-footer-child", className: classNames(mode === 'sidebar' ? 'p-3' : '') }, { children: footer }), void 0)) }), void 0)] }), void 0));
};
exports.Layout = Layout;
var LayoutPart = /** @class */ (function () {
    function LayoutPart() {
    }
    LayoutPart.Body = LayoutBody;
    LayoutPart.Footer = LayoutFooter;
    LayoutPart.Header = LayoutHeader;
    LayoutPart.Pane = LayoutPane;
    return LayoutPart;
}());
exports.LayoutPart = LayoutPart;
