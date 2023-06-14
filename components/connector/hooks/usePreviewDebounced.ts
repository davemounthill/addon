"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePreviewDebounced = void 0;
var useDebounced_1 = require("./useDebounced");
var usePreview_1 = require("./usePreview");
/** Wrap usePreview() with debouncing built in */
var usePreviewDebounced = function () {
    var preview = usePreview_1.usePreview();
    var refresh = preview.refresh, refreshed = preview.refreshed, data = preview.data;
    var debounced = useDebounced_1.useDebounced(refresh, 1000).debounced;
    return {
        refresh: debounced,
        refreshed: refreshed,
        data: data,
    };
};
exports.usePreviewDebounced = usePreviewDebounced;
