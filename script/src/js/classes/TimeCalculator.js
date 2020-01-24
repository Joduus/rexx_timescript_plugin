"use strict";
var TimeCalculator = /** @class */ (function () {
    function TimeCalculator() {
    }
    TimeCalculator.calculateTimeDifference = function (first, second) {
        return second.getTime() - first.getTime();
    };
    TimeCalculator.calculateTime = function (time) {
        time.minutes += time.hours * 60;
        time.seconds += time.minutes * 60;
        return time.seconds;
    };
    TimeCalculator.calculateRealTime = function (sec) {
        var times = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        // Hours
        times.hours = Math.floor(sec / 60 / 60);
        sec -= times.hours * 60 * 60;
        // Minutes
        times.minutes = Math.floor(sec / 60);
        sec -= times.minutes * 60;
        // Seconds
        times.seconds = Math.floor(sec);
        sec -= times.seconds;
        return times;
    };
    TimeCalculator.roundTime = function (times) {
        if (times.seconds >= 60) {
            var diff = Math.floor(times.seconds / 60);
            times.minutes += diff;
            times.seconds -= diff * 60;
        }
        if (times.minutes >= 60) {
            var diff = Math.floor(times.minutes / 60);
            times.hours += diff;
            times.minutes -= diff * 60;
        }
        return times;
    };
    TimeCalculator.toDoubleDigit = function (value) {
        var negative = false;
        var returnString;
        if (value < 0) {
            negative = true;
            value = Math.abs(value);
        }
        if (value >= 10) {
            returnString = '' + value;
        }
        else {
            returnString = '0' + value;
        }
        if (negative) {
            returnString = '-' + returnString;
        }
        return returnString;
    };
    TimeCalculator.getDifference = function (start, end) {
        return end - start;
    };
    return TimeCalculator;
}());
