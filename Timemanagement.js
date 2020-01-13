class TimeManagement {
    /*
    class Options
     */
    _options;

    /*
    Holds timeEntries Object
     */
    _timeEntries;

    /*
    class ModuleCollection
     */
    _moduleCollection;

    constructor(options) {
        this._options = options;
        this._timeEntries = new TimeEntries();

        // Abort program when no time entries are available
        if (this._timeEntries.entryLength === 0) {
            return
        }

        this._moduleCollection = new ModuleCollection();

        this.configure();

        this.appendHtml();
    }

    configure() {
        this.addProvider();
        this.addWatcher();
        this.addHandler();
        this.addNotifier();
    }

    addProvider() {
        this._moduleCollection.addModule(
            'optionsProvider', // Holds Options
            new OptionsProvider(
                this._moduleCollection.crossHandleModules,
                this._options
            ),
            false,
            false
        );
        this._moduleCollection.addModule(
            'timeEntryProvider',
            new TimeEntryProvider(
                this._moduleCollection.crossHandleModules,
                this._timeEntries
            ),
            false,
            false
        )
    }

    addWatcher() {
        this._moduleCollection.addModule(
            'timeEntryWatcher', // Sees login/logout and new entries
            new TimeEntryWatcher(
                this._moduleCollection.crossHandleModules
            )
        );
    }

    addHandler() {
        this._moduleCollection.addModule(
            'worktimeHandler', // Knows how much you have worked today
            new WorktimeHandler(
                this._moduleCollection.crossHandleModules
            ),
            true
        );
        this._moduleCollection.addModule(
            'worktimeLeftHandler', // Knows how much time you have left to work for today
            new WorktimeLeftHandler(
                this._moduleCollection.crossHandleModules
            ),
            true
        );
        this._moduleCollection.addModule(
            'breaktimeHandler', // Knows how long your break was today
            new BreaktimeHandler(
                this._moduleCollection.crossHandleModules
            ),
            true
        );
        this._moduleCollection.addModule(
            'breaktimeLeftHandler', // Knows the minimum time left for your break
            new BreaktimeLeftHandler(
                this._moduleCollection.crossHandleModules
            ),
            true
        );
        this._moduleCollection.addModule(
            'notificationHandler', // Notifies you
            new NotificationHandler(
                this._moduleCollection.crossHandleModules
            )
        );
    }

    addNotifier() {
        this._moduleCollection.addModule(
            'worktimeNotificator', // Test your worktime for reasons to notify you
            new WorktimeNotificator(
                this._moduleCollection.crossHandleModules
            ),
            false,
            false
        );
        this._moduleCollection.addModule(
            'breaktimeNotificator', // Test your breaktime for reasons to notify you
            new BreaktimeNotificator(
                this._moduleCollection.crossHandleModules
            ),
            false,
            false
        );
    }


    appendHtml() {
        let insertContainer = parent.document.getElementsByClassName('my_absences_stats_description_container times_overview_stats_description_container')[0];

        if (parent.document.getElementById(Options.scriptName) !== null) {
            return;
        }

        insertContainer.insertAdjacentHTML("beforeend", this._moduleCollection.moduleHtml);
    }

    run() {
        if (this._moduleCollection.hasNoMainLoopModules) {
            return;
        }

        setInterval(() => {
            let currentTime = new Date();
            this._moduleCollection.run(currentTime);
        }, 1000);

        this._moduleCollection.run(new Date());
    }
}