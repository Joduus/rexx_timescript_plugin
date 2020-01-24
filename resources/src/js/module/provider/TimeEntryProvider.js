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
var TimeEntryProvider = /** @class */ (function (_super) {
    __extends(TimeEntryProvider, _super);
    function TimeEntryProvider(handler, timeEntries) {
        var _this = _super.call(this, handler) || this;
        _this._timeEntries = timeEntries;
        return _this;
    }
    Object.defineProperty(TimeEntryProvider.prototype, "module", {
        get: function () {
            return this._timeEntries;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeEntryProvider.prototype, "timeEntries", {
        get: function () {
            return this._timeEntries.timeEntries;
        },
        set: function (newTimeEntries) {
            this._timeEntries.timeEntries = newTimeEntries;
        },
        enumerable: true,
        configurable: true
    });
    return TimeEntryProvider;
}(Module));
