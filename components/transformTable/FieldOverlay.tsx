"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.FieldOverlay = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_bootstrap_1 = require("react-bootstrap");
var react_1 = __importDefault(require("react"));
var svg_1 = require("../ui/svg");
// The main thing we're doing here is enabling the user to mouse-leave the target onto the Overlay
// so they can interact with the overlay
//
// We do that by delaying before hiding, just long enough to let them mouse-enter on the overlay where we clear the timeout
var FieldOverlay = /** @class */ (function (_super) {
    __extends(FieldOverlay, _super);
    function FieldOverlay(props) {
        var _this = _super.call(this, props) || this;
        _this.handleMouseEnter = function () {
            // Cancel the timer that will hide the overlay
            if (_this.timeout)
                clearTimeout(_this.timeout);
            _this.setState({ showPopover: true });
        };
        _this.handleMouseLeave = function () {
            var delay = _this.props.delay;
            // Don't hide right away, give them time
            _this.timeout = window.setTimeout(function () {
                _this.setState({ showPopover: false });
            }, delay);
        };
        _this.componentWillUnmount = function () {
            if (_this.timeout) {
                window.clearTimeout(_this.timeout);
            }
        };
        _this.render = function () {
            var popover = (jsx_runtime_1.jsxs(react_bootstrap_1.Popover, __assign({ className: _this.props.popoverClassName, id: _this.props.id, onMouseEnter: _this.handleMouseEnter, onMouseLeave: _this.handleMouseLeave }, { children: [jsx_runtime_1.jsx(react_bootstrap_1.Popover.Title, __assign({ as: "h3" }, { children: _this.props.getTitle() }), void 0), jsx_runtime_1.jsx(react_bootstrap_1.Popover.Content, { children: _this.props.getContent() }, void 0)] }), void 0));
            return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: jsx_runtime_1.jsx(react_bootstrap_1.OverlayTrigger, __assign({ show: _this.state.showPopover, placement: "auto-end", overlay: popover }, { children: jsx_runtime_1.jsx("div", __assign({ onMouseLeave: _this.handleMouseLeave, onClick: function () {
                            return _this.setState({
                                showPopover: !_this.state.showPopover,
                            });
                        }, className: "view-toggle" }, { children: jsx_runtime_1.jsx(svg_1.ExpandingIcon, { width: 14, height: 14 }, void 0) }), void 0) }), void 0) }, void 0));
        };
        _this.state = {
            showPopover: false,
        };
        return _this;
    }
    return FieldOverlay;
}(react_1.default.Component));
exports.FieldOverlay = FieldOverlay;
