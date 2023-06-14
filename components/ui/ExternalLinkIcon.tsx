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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalLinkIcon = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var svg_1 = require("./svg");
var SimpleTooltip_1 = require("./SimpleTooltip");
require("./ExternalLinkIcon.css");
var ExternalLinkIcon = function (_a) {
    var id = _a.id, url = _a.url, description = _a.description;
    return (jsx_runtime_1.jsx(SimpleTooltip_1.SimpleTooltip, __assign({ id: id, placement: "bottom-end", value: description }, { children: jsx_runtime_1.jsx("a", __assign({ href: url, target: "_blank", className: "external-link-icon", rel: "noreferrer" }, { children: jsx_runtime_1.jsx(svg_1.ExternalLink, { width: 12, height: 12 }, void 0) }), void 0) }), void 0));
};
exports.ExternalLinkIcon = ExternalLinkIcon;
