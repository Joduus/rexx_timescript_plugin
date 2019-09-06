class TimeManagement {
    /*
    class Options
     */
    _options;

    /*
    Holds all Handlers for the main loop defined in configureMainLoop
     */
    _mainLoopHandlers = [];

    /*
     * Holds all handlers with crossHandlerAccess
     */
    _handler = {};

    /*
    Holds timeEntries Object
     */
    _timeEntries;

    /*
    Html for the view
     */
    _menuBarHtml = '';

    constructor(options) {
        this._options = options;
        this._timeEntries = new TimeEntries();

        if (this._timeEntries.entryLength === 0) {
            return
        }

        this.configureMainLoop();

        this.appendHtml();
    }

    configureMainLoop() {
        this.notificationHandler = new NotificationHandler(this._options.notifications, this._timeEntries, this._handler);
        this.worktimeHandler = new WorktimeHandler(this._options.hours, this._timeEntries, this._handler);
        this.breaktimeHandler = new BreaktimeHandler(this._options.breaks, this._timeEntries, this._handler);
        this.timeEntryWatcher = new TimeEntryWatcher(this._timeEntries, this._handler);

        this._handler.notificationHandler = this.notificationHandler;
        this._handler.worktimeHandler = this.worktimeHandler;
        this._handler.breaktimeHandler = this.breaktimeHandler;
        this._handler.timeEntryWatcher = this.timeEntryWatcher;

        this._mainLoopHandlers.push(this.timeEntryWatcher, this.worktimeHandler, this.breaktimeHandler, this.notificationHandler);
    }

    appendHtml() {
        for (let i = 0; this._mainLoopHandlers.length > i; i++) {
            let handler = this._mainLoopHandlers[i];

            this._menuBarHtml += handler.getHtml();
        }

        let menuBar = parent.document.getElementById('list_actions');

        menuBar.insertAdjacentHTML("beforeend", this._menuBarHtml);
    }

    run() {
        if (Object.keys(this._mainLoopHandlers).length === 0) {
            return;
        }

        setInterval(() => {
            for (let i = 0; this._mainLoopHandlers.length > i; i++) {
                let handler = this._mainLoopHandlers[i];
                let currentTime = new Date();

                handler.run(currentTime);
            }
        }, 1000);
    }
}