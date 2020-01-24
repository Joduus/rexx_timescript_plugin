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
var TimeEntryWatcher = /** @class */ (function (_super) {
    __extends(TimeEntryWatcher, _super);
    function TimeEntryWatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeEntryWatcher.prototype.run = function (currentTime) {
        _super.prototype.run.call(this, currentTime);
        this.checkForNewTimeEntries();
    };
    TimeEntryWatcher.prototype.checkForNewTimeEntries = function () {
        var timeEntryProvider = this.getModule('timeEntryProvider');
        var currentTimeEntriesLength = timeEntryProvider.module.entryLength;
        var newTimeEntries = new TimeEntries();
        if (currentTimeEntriesLength === newTimeEntries.entryLength) {
            return; // No new entries
        }
        timeEntryProvider.timeEntries = newTimeEntries.timeEntries;
    };
    return TimeEntryWatcher;
}(Module));
