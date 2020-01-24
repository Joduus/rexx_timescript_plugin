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
var WorktimeLeftHandler = /** @class */ (function (_super) {
    __extends(WorktimeLeftHandler, _super);
    function WorktimeLeftHandler(handler) {
        var _this = _super.call(this, handler) || this;
        _this._domIds = {
            worktimeLeftString: 'nav_infotxt_worktimeLeft_string',
            worktimeLeft: 'nav_infotxt_worktimeLeft'
        };
        _this._workHourTimes = [
            28800 // 8 Hours
        ];
        _this._worktimeReached = false;
        _this.getHtml = function () { return "\n<li class=\"navbar_txt\">\n    <a title=\"Arbeitszeit \u00FCbrig\" id=\"" + _this._domIds.worktimeLeftString + "\">\n        8 Stunden in: \n    </a>\n</li>\n<li class=\"navbar_txt noUserSelect\">\n    <a title=\"Verbleibende Zeit\" id=\"" + _this._domIds.worktimeLeft + "\">\n    </a>\n</li>\n"; }; // Muss noch angepasst werden
        _this._worktime = 0;
        return _this;
    }
    WorktimeLeftHandler.prototype.run = function (currentTime) {
        _super.prototype.run.call(this, currentTime);
        if (this._workHourTimes.length === 0) {
            return;
        }
        this.updateWorktimeLeft();
        this.updateText();
        this.checkNotify();
    };
    WorktimeLeftHandler.prototype.updateWorktimeLeft = function () {
        var worktimeHandler = this.getModule('worktimeHandler');
        this._worktime = worktimeHandler.worktime;
        this.resetTimeObject();
        var firstNotReachedTime = -1;
        for (var i = 0; i < this._workHourTimes.length; i++) {
            if (this._worktime < this._workHourTimes[i]) {
                firstNotReachedTime = this._workHourTimes[i];
                break;
            }
        }
        if (firstNotReachedTime === -1) {
            firstNotReachedTime = this._workHourTimes[this._workHourTimes.length - 1];
        }
        var timeDifference = TimeCalculator.getDifference(this._worktime, firstNotReachedTime);
        if (timeDifference < 0) {
            this._worktimeReached = true;
            timeDifference = Math.abs(timeDifference);
        }
        var timeObject = TimeCalculator.calculateRealTime(timeDifference);
        this.assignRealTime(timeObject);
    };
    WorktimeLeftHandler.prototype.updateText = function () {
        var element = parent.document.getElementById(this._domIds.worktimeLeft);
        var text = '';
        if (element === null) {
            console.warn('Could not get text element for worktime left');
            return;
        }
        if (this._worktimeReached) {
            text += '+';
        }
        text +=
            TimeCalculator.toDoubleDigit(this._time.hours)
                + ':' +
                TimeCalculator.toDoubleDigit(this._time.minutes);
        if ( /*this._options.worktimeLeft.showSeconds*/true) {
            text += ':' + TimeCalculator.toDoubleDigit(this._time.seconds);
        }
        element.textContent = text;
    };
    WorktimeLeftHandler.prototype.checkNotify = function () {
        var worktimeNotificator = this.getModule('worktimeNotificator');
    };
    return WorktimeLeftHandler;
}(TimeHandler));
