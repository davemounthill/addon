"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkSlug = exports.pluralize = exports.truncate = exports.makeId = void 0;
// https://stackoverflow.com/questions/9635625/javascript-regex-to-remove-illegal-characters-from-dom-id
// enable us to safely use unique column names as ids, so we have stable ids
// eslint-disable-next-line import/prefer-default-export
var makeId = function (text) {
    return "ID_" + btoa(encodeURIComponent(text));
};
exports.makeId = makeId;
var truncate = function (s, maxLength) {
    return s.length <= maxLength ? s : s.substr(0, maxLength) + "...";
};
exports.truncate = truncate;
var pluralize = function (n, label) {
    return n === 1 ? label : label + "s";
};
exports.pluralize = pluralize;
var mkSlug = function (s) {
    return s
        .toString() // Cast to string
        .toLowerCase() // Convert the string to lowercase letters
        .normalize('NFD') // The normalize() method returns the Unicode Normalization Form of a given string.
        .trim() // Remove whitespace from both sides of a string
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-'); // Replace multiple - with single -
};
exports.mkSlug = mkSlug;
