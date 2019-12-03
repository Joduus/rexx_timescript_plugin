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
        this._moduleCollection.addModule(
            'timeEntryWatcher',
            new TimeEntryWatcher(
                this._options,
                this._timeEntries,
                this._moduleCollection.crossHandleModules
            )
        );
        this._moduleCollection.addModule(
            'worktimeHandler',
            new WorktimeHandler(
                this._options,
                this._timeEntries,
                this._moduleCollection.crossHandleModules
            ),
            true
        );
        this._moduleCollection.addModule(
            'worktimeLeftHandler',
            new WorktimeLeftHandler(
                this._options,
                this._timeEntries,
                this._moduleCollection.crossHandleModules
            ),
            true
        );
        this._moduleCollection.addModule(
            'breaktimeHandler',
            new BreaktimeHandler(
                this._options,
                this._timeEntries,
                this._moduleCollection.crossHandleModules
            ),
            true
        );
        this._moduleCollection.addModule(
            'breaktimeLeftHandler',
            new BreaktimeLeftHandler(
                this._options,
                this._timeEntries,
                this._moduleCollection.crossHandleModules
            ),
            true
        );
        this._moduleCollection.addModule(
            'worktimeNotificator',
            new WorktimeNotificator(
                this._options,
                this._timeEntries,
                this._moduleCollection.crossHandleModules
            ),
            false,
            false
        );
        this._moduleCollection.addModule(
            'breaktimeNotificator',
            new BreaktimeNotificator(
                this._options,
                this._timeEntries,
                this._moduleCollection.crossHandleModules
            ),
            false,
            false
        );
        this._moduleCollection.addModule(
            'notificationHandler',
            new NotificationHandler(
                this._options,
                this._timeEntries,
                this._moduleCollection.crossHandleModules
            )
        );
    }

    appendHtml() {
        let menuBar = parent.document.getElementById('list_actions');

        menuBar.insertAdjacentHTML("beforeend", this._moduleCollection.moduleHtml);
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