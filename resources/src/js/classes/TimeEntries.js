"use strict";
var TimeEntries = /** @class */ (function () {
    function TimeEntries() {
        /*
        [
            {
                time: datetime,
                state: state(kommen, gehen)
            },
            {
                datetime,
                state
            }
        ]
         */
        this._timeEntries = [];
        this.getTodayTimeEntries();
    }
    Object.defineProperty(TimeEntries.prototype, "timeEntries", {
        get: function () {
            return this._timeEntries;
        },
        /*
        Sets new Values without creating new reference
        @var timeEntries self
         */
        set: function (timeEntries) {
            this._timeEntries = timeEntries;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeEntries.prototype, "entryLength", {
        get: function () {
            return this._timeEntries.length;
        },
        enumerable: true,
        configurable: true
    });
    TimeEntries.prototype.getTodayTimeEntries = function () {
        var _a, _b;
        var todayTimeEntriesContainer = document.querySelector('.grid_table .grid_row_highlight_today');
        if (todayTimeEntriesContainer === null) {
            console.warn('Could not get today time entries container!');
            return;
        }
        var timeEntries = todayTimeEntriesContainer.children[2].children[0];
        var stateEntries = todayTimeEntriesContainer.children[1].children[0];
        if (timeEntries.children.length === 0) {
            console.warn("Could not get any time entries");
            return;
        }
        var today = new Date();
        var todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        for (var i = 0; timeEntries.children.length > i; i++) {
            var selectedDate = (_a = timeEntries.children[i].querySelector('span')) === null || _a === void 0 ? void 0 : _a.textContent;
            var selectedState = (_b = stateEntries.children[i].querySelector('a')) === null || _b === void 0 ? void 0 : _b.text;
            if (selectedDate === null || selectedDate === undefined || selectedState === null || selectedState === undefined) {
                continue;
            }
            this._timeEntries[i] = {
                time: new Date(todayDate + ' ' + selectedDate),
                state: selectedState
            };
        }
    };
    TimeEntries.come = 'Kommen';
    TimeEntries.go = 'Gehen';
    return TimeEntries;
}());
