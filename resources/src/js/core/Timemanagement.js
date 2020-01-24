"use strict";
var TimeManagement = /** @class */ (function () {
    function TimeManagement(options) {
        this._options = options;
        this._timeEntries = new TimeEntries();
        this._moduleCollection = new ModuleCollection();
        // Abort program when no time entries are available
        if (this._timeEntries.entryLength === 0) {
            return;
        }
        this.configure();
        this.appendHtml();
    }
    TimeManagement.prototype.configure = function () {
        this.addProvider();
        this.addWatcher();
        this.addHandler();
        this.addNotifier();
    };
    TimeManagement.prototype.addProvider = function () {
        this._moduleCollection.addModule('optionsProvider', // Holds Options
        new OptionsProvider(this._moduleCollection.crossHandleModules, this._options), false, false);
        this._moduleCollection.addModule('timeEntryProvider', new TimeEntryProvider(this._moduleCollection.crossHandleModules, this._timeEntries), false, false);
    };
    TimeManagement.prototype.addWatcher = function () {
        this._moduleCollection.addModule('timeEntryWatcher', // Sees login/logout and new entries
        new TimeEntryWatcher(this._moduleCollection.crossHandleModules));
    };
    TimeManagement.prototype.addHandler = function () {
        this._moduleCollection.addModule('worktimeHandler', // Knows how much you have worked today
        new WorktimeHandler(this._moduleCollection.crossHandleModules), true);
        this._moduleCollection.addModule('worktimeLeftHandler', // Knows how much time you have left to work for today
        new WorktimeLeftHandler(this._moduleCollection.crossHandleModules), true);
        this._moduleCollection.addModule('breaktimeHandler', // Knows how long your break was today
        new BreaktimeHandler(this._moduleCollection.crossHandleModules), true);
        this._moduleCollection.addModule('breaktimeLeftHandler', // Knows the minimum time left for your break
        new BreaktimeLeftHandler(this._moduleCollection.crossHandleModules), true);
        this._moduleCollection.addModule('notificationHandler', // Notifies you
        new NotificationHandler(this._moduleCollection.crossHandleModules));
    };
    TimeManagement.prototype.addNotifier = function () {
        this._moduleCollection.addModule('worktimeNotificator', // Test your worktime for reasons to notify you
        new WorktimeNotificator(this._moduleCollection.crossHandleModules), false, false);
        this._moduleCollection.addModule('breaktimeNotificator', // Test your breaktime for reasons to notify you
        new BreaktimeNotificator(this._moduleCollection.crossHandleModules), false, false);
    };
    TimeManagement.prototype.appendHtml = function () {
        var insertContainer = parent.document.getElementsByClassName('my_absences_stats_description_container times_overview_stats_description_container')[0];
        if (insertContainer === null) {
            console.warn('Could not get container to insert html');
            return;
        }
        if (parent.document.getElementById(Options.scriptName) !== null) {
            return;
        }
        insertContainer.insertAdjacentHTML("beforeend", this._moduleCollection.moduleHtml);
    };
    TimeManagement.prototype.run = function () {
        var _this = this;
        if (this._moduleCollection.hasNoMainLoopModules) {
            return;
        }
        setInterval(function () {
            var currentTime = new Date();
            _this._moduleCollection.run(currentTime);
        }, 1000);
        this._moduleCollection.run(new Date());
    };
    return TimeManagement;
}());
