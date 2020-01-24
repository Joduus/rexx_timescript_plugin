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
var BreaktimeLeftHandler = /** @class */ (function (_super) {
    __extends(BreaktimeLeftHandler, _super);
    function BreaktimeLeftHandler(handler) {
        var _this = _super.call(this, handler) || this;
        _this._domIds = {
            breaktimeLeft: 'nav_infotxt_breaktimeLeft'
        };
        _this._breakTimes = [
            {
                'afterTime': 21600,
                'howLong': 1800 // 30 Minutes
            },
            {
                'afterTime': 32400,
                'howLong': 900 // 15 Minutes
            }
        ];
        _this._breaktimeReached = false;
        _this._isPerfectInTime = false;
        _this.getHtml = function () { return "\n<li class=\"navbar_txt noUserSelect\">\n    <a title=\"Verbleibende Pausenzeit\" id=\"" + _this._domIds.breaktimeLeft + "\">\n    </a>\n</li>\n"; };
        _this._currentWorktime = 0;
        _this._currentBreaktime = 0;
        _this._breaktimeDifference = 0;
        return _this;
    }
    BreaktimeLeftHandler.prototype.run = function (currentTime) {
        _super.prototype.run.call(this, currentTime);
        if (this._breakTimes.length === 0) {
            return;
        }
        this.updateBreakTimeLeft();
        this.updateText();
        // Implement check for time left notifications
    };
    Object.defineProperty(BreaktimeLeftHandler.prototype, "currentBreaktime", {
        get: function () {
            return this._breaktimeDifference;
        },
        enumerable: true,
        configurable: true
    });
    BreaktimeLeftHandler.prototype.updateBreakTimeLeft = function () {
        this._currentWorktime = this.getModule('worktimeHandler').worktime;
        this._currentBreaktime = this.getModule('breaktimeHandler').breaktime;
        this.resetTimeObject();
        var howLongTotal = 0;
        var firstNotReachedTime = new /** @class */ (function () {
            function class_1() {
                this.afterTime = -1;
                this.howLong = -1;
            }
            return class_1;
        }());
        for (var i = 0; i < this._breakTimes.length; i++) {
            howLongTotal += this._breakTimes[i].howLong;
            if (this._currentWorktime < this._breakTimes[i].afterTime) {
                firstNotReachedTime = this._breakTimes[i];
                break;
            }
        }
        var timeDifference = TimeCalculator.getDifference(this._currentBreaktime, howLongTotal);
        this._breaktimeDifference = timeDifference;
        if (timeDifference < 1) {
            this._breaktimeReached = true;
            this._isPerfectInTime = timeDifference === 0;
            timeDifference = Math.abs(timeDifference);
        }
        var timeObject = TimeCalculator.calculateRealTime(timeDifference);
        this.assignRealTime(timeObject);
    };
    BreaktimeLeftHandler.prototype.updateText = function () {
        var element = parent.document.getElementById(this._domIds.breaktimeLeft);
        var text = '';
        if (element === null) {
            return;
        }
        if (this._breaktimeReached) {
            if (!this._isPerfectInTime) {
                text += '+';
            }
        }
        else {
            text += '-';
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
    return BreaktimeLeftHandler;
}(TimeHandler));
