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
            'notificationHandler',
            new NotificationHandler(
                this._options,
                this._timeEntries,
                this._moduleCollection.crossHandleModules
            ),
            true,
            true,
            false
        );
        this._moduleCollection.addModule(
            'worktimeHandler',
            new WorktimeHandler(
                this._options,
                this._timeEntries,
                this._moduleCollection.crossHandleModules
            ),
            true,
            true,
            true
        );
        this._moduleCollection.addModule(
            'breaktimeHandler',
            new BreaktimeHandler(
                this._options,
                this._timeEntries,
                this._moduleCollection.crossHandleModules
            ),
            true,
            true,
            true
        );
        this._moduleCollection.addModule(
            'timeEntryWatcher',
            new TimeEntryWatcher(
                this._options,
                this._timeEntries,
                this._moduleCollection.crossHandleModules
            ),
            true,
            true,
            false
        );
    }

    appendHtml() {
        let menuBar = parent.document.getElementById('list_actions');

        menuBar.insertAdjacentHTML("beforeend", this._moduleCollection.moduleHtml);
    }

    run() {
        if (this._moduleCollection.noMainLoopModules) {
            return;
        }

        setInterval(() => {
            let currentTime = new Date();
            this._moduleCollection.run(currentTime);
        }, 1000);
    }
}