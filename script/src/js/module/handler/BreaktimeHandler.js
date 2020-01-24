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
var BreaktimeHandler = /** @class */ (function (_super) {
    __extends(BreaktimeHandler, _super);
    function BreaktimeHandler(handler) {
        var _this = _super.call(this, handler) || this;
        _this._domIds = {
            breaktime: 'nav_infotxt_breaktime'
        };
        _this.getHtml = function () { return "\n<li class=\"navbar_txt\">\n    <a title=\"Pausenzeit\" id=\"nav_infotxt_breaktime_string\">\n        Pausenzeit:\n    </a>\n</li>\n<li class=\"navbar_txt noUserSelect\">\n    <a title=\"Pausenzeit heute\" id=\"" + _this._domIds.breaktime + "\">\n    </a>\n</li>\n"; };
        _this._breakTime = 0;
        return _this;
    }
    BreaktimeHandler.prototype.run = function (currentTime) {
        _super.prototype.run.call(this, currentTime);
        this.updateBreakTime();
        this.updateText();
    };
    Object.defineProperty(BreaktimeHandler.prototype, "breaktime", {
        get: function () {
            return this._breakTime;
        },
        enumerable: true,
        configurable: true
    });
    BreaktimeHandler.prototype.updateBreakTime = function () {
        this.resetTimeObject();
        var timeTimes = this.getTimeDifferences(TimeEntries.go);
        if (timeTimes === undefined) {
            return;
        }
        for (var i = 0; i < timeTimes.length; i++) {
            this.assignRealTime(timeTimes[i]);
        }
        // To json for no ref
        this._breakTime = TimeCalculator.calculateTime(JSON.parse(JSON.stringify(this._time)));
    };
    BreaktimeHandler.prototype.updateText = function () {
        var element = parent.document.getElementById(this._domIds.breaktime);
        if (element === null) {
            console.warn('Could not get Breaktime Text Element');
            return;
        }
        var text = TimeCalculator.toDoubleDigit(this._time.hours)
            + ':' +
            TimeCalculator.toDoubleDigit(this._time.minutes);
        if ( /*this._options.breaktime.showSeconds*/false) {
            text += ':' + TimeCalculator.toDoubleDigit(this._time.seconds);
        }
        element.textContent = text;
    };
    return BreaktimeHandler;
}(TimeHandler));
