"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TimeHandler = /** @class */ (function (_super) {
    __extends(TimeHandler, _super);
    function TimeHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._time = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        return _this;
    }
    TimeHandler.prototype.getTimeDifferences = function (state) {
        if (state === void 0) { state = TimeEntries.come; }
        var timeEntryProvider = this.getModule('timeEntryProvider');
        if (timeEntryProvider === undefined) {
            console.warn('Cant get Time entry provider');
            return;
        }
        var timeTimes = [];
        for (var i = 0; i < timeEntryProvider.module.entryLength; i += 2) {
            while (timeEntryProvider.timeEntries[i] && timeEntryProvider.timeEntries[i].state !== state) {
                i++;
            }
            if (!timeEntryProvider.timeEntries[i]) {
                break;
            }
            var fromTime = timeEntryProvider.timeEntries[i].time;
            var toTime = timeEntryProvider.timeEntries[i + 1]
                ? timeEntryProvider.timeEntries[i + 1].time
                : this._currentTime;
            var difference = TimeCalculator.calculateTimeDifference(fromTime, toTime);
            var times = TimeCalculator.calculateRealTime(difference / 1000);
            timeTimes.push(times);
        }
        return timeTimes;
    };
    TimeHandler.prototype.assignRealTime = function (time) {
        this._time.hours += time.hours;
        this._time.minutes += time.minutes;
        this._time.seconds += time.seconds;
        TimeCalculator.roundTime(this._time);
    };
    TimeHandler.prototype.resetTimeObject = function () {
        this._time.hours = 0;
        this._time.minutes = 0;
        this._time.seconds = 0;
    };
    return TimeHandler;
}(Module));
