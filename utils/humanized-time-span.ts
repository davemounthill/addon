"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.humanizedTimeSpan = void 0;
/** From: https://github.com/QuantumCatgirl/js_humanized_time_span */
function humanizedTimeSpan(params) {
    // Date Formats must be be ordered smallest -> largest and must end in a format with ceiling of null
    var dateFormats = params.dateFormats || {
        past: [
            { ceiling: 60, text: '$seconds seconds ago' },
            { ceiling: 3600, text: '$minutes minutes ago' },
            { ceiling: 86400, text: '$hours hours ago' },
            { ceiling: 2629744, text: '$days days ago' },
            { ceiling: 31556926, text: '$months months ago' },
            { ceiling: null, text: '$years years ago' },
        ],
        future: [
            { ceiling: 60, text: 'in $seconds seconds' },
            { ceiling: 3600, text: 'in $minutes minutes' },
            { ceiling: 86400, text: 'in $hours hours' },
            { ceiling: 2629744, text: 'in $days days' },
            { ceiling: 31556926, text: 'in $months months' },
            { ceiling: null, text: 'in $years years' },
        ],
    };
    // Time units must be be ordered largest -> smallest
    var timeUnits = params.timeUnits || [
        [31556926, 'years'],
        [2629744, 'months'],
        [86400, 'days'],
        [3600, 'hours'],
        [60, 'minutes'],
        [1, 'seconds'],
    ];
    var roundingFn = params.roundingFn;
    var date = new Date(params.date);
    var refDate = params.refDate ? new Date(params.refDate) : new Date();
    var secondsDifference = (refDate.valueOf() - date.valueOf()) / 1000;
    secondsDifference = roundingFn
        ? roundingFn(secondsDifference)
        : secondsDifference;
    var tense = 'past';
    if (secondsDifference < 0) {
        tense = 'future';
        secondsDifference = 0 - secondsDifference;
    }
    function getFormat() {
        for (var i = 0; i < dateFormats[tense].length; i += 1) {
            var ceiling = dateFormats[tense][i].ceiling;
            if (ceiling == null || secondsDifference <= ceiling) {
                return dateFormats[tense][i];
            }
        }
        return null;
    }
    function getTimeBreakdown() {
        var seconds = secondsDifference;
        var breakdown = {};
        for (var i = 0; i < timeUnits.length; i += 1) {
            var occurencesOfUnit = Math.floor(seconds / timeUnits[i][0]);
            seconds -= timeUnits[i][0] * occurencesOfUnit;
            breakdown[timeUnits[i][1]] = occurencesOfUnit;
        }
        return breakdown;
    }
    function renderDate(dateFormat) {
        var breakdown = getTimeBreakdown();
        var timeAgoText = dateFormat.text.replace(/\$(\w+)/g, function (substring) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return breakdown[args[0]].toString();
        });
        return depluralizeTimeAgoText(timeAgoText, breakdown);
    }
    function depluralizeTimeAgoText(origTimeAgoText, breakdown) {
        var timeAgoText = origTimeAgoText;
        for (var _i = 0, _a = Object.keys(breakdown); _i < _a.length; _i++) {
            var i = _a[_i];
            if (breakdown[i] === 1) {
                var regexp = new RegExp("\\b" + i + "\\b");
                timeAgoText = timeAgoText.replace(regexp, function (substring) {
                    return substring.replace(/s\b/g, '');
                });
            }
        }
        return timeAgoText;
    }
    var format = getFormat();
    if (!format) {
        throw new Error("No date format found");
    }
    return renderDate(format);
}
exports.humanizedTimeSpan = humanizedTimeSpan;
