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
var WorktimeHandler = /** @class */ (function (_super) {
    __extends(WorktimeHandler, _super);
    function WorktimeHandler(handler) {
        var _this = _super.call(this, handler) || this;
        _this._domIds = {
            worktime: 'nav_infotxt_worktime'
        };
        _this.getHtml = function () { return "\n<li class=\"navbar_txt\">\n    <a title=\"Arbeitszeit\" id=\"nav_infotxt_worktime_string\">\n        Arbeitszeit:\n    </a>\n</li>\n<li class=\"navbar_txt noUserSelect\">\n    <a title=\"Arbeitszeit heute\" id=\"" + _this._domIds.worktime + "\">\n    </a>\n</li>\n"; };
        _this._worktime = 0;
        return _this;
    }
    WorktimeHandler.prototype.run = function (currentTime) {
        _super.prototype.run.call(this, currentTime);
        this.updateWorktime();
        this.updateText();
    };
    Object.defineProperty(WorktimeHandler.prototype, "worktime", {
        get: function () {
            return this._worktime;
        },
        enumerable: true,
        configurable: true
    });
    WorktimeHandler.prototype.updateWorktime = function () {
        this.resetTimeObject();
        var timeTimes = this.getTimeDifferences(TimeEntries.come);
        if (timeTimes === undefined) {
            return;
        }
        for (var i = 0; i < timeTimes.length; i++) {
            this.assignRealTime(timeTimes[i]);
        }
        // To json for no ref
        this._worktime = TimeCalculator.calculateTime(JSON.parse(JSON.stringify(this._time)));
    };
    WorktimeHandler.prototype.updateText = function () {
        var element = parent.document.getElementById(this._domIds.worktime);
        if (element === null) {
            console.warn('Could not get the text element for worktime');
            return;
        }
        var text = TimeCalculator.toDoubleDigit(this._time.hours)
            + ':' +
            TimeCalculator.toDoubleDigit(this._time.minutes);
        if ( /*this._options.worktime.showSeconds*/true) {
            text += ':' + TimeCalculator.toDoubleDigit(this._time.seconds);
        }
        element.textContent = text;
    };
    return WorktimeHandler;
}(TimeHandler));
