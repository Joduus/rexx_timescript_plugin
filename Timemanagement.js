class TimeManagement {
    /*
    class Options
     */
    _options;

    /*
    Holds all Handlers for the main loop defined in configure
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

        // Abort program when no time entries are available
        if (this._timeEntries.entryLength === 0) {
            return
        }

        this.configure();

        this.appendHtml();
    }

    configure() {
        this.addHandler(
            'notificationHandler',
            new NotificationHandler(
                this._options.notifications,
                this._timeEntries,
                this._handler
            ),
            true,
            true,
            false
        );
        this.addHandler(
            'worktimeHandler',
            new WorktimeHandler(
                this._options.hours,
                this._timeEntries,
                this._handler
            ),
            true,
            true,
            true
        );
        this.addHandler(
            'breaktimeHandler',
            new BreaktimeHandler(
                this._options.breaks,
                this._timeEntries,
                this._handler
            ),
            true,
            true,
            false
        );
        this.addHandler(
            'timeEntryWatcher',
            new TimeEntryWatcher(
                this._timeEntries,
                this._handler
            ),
            true,
            true,
            false
        );
    }

    addHandler(
        name,
        handler,
        isMainLoopHandler = false,
        crossHandleAccessAllowed = true,
        appendHtml = false
    ) {
        this[name] = handler;

        if (appendHtml) {
            this._menuBarHtml += handler.getHtml();
        }

        if (isMainLoopHandler) {
            this._mainLoopHandlers.push(handler);
        }

        if (crossHandleAccessAllowed) {
            this._handler[name] = this[name];
        }
    }

    appendHtml() {
        let menuBar = parent.document.getElementById('list_actions');

        menuBar.insertAdjacentHTML("beforeend", this._menuBarHtml);
    }

    run() {
        if (Object.keys(this._mainLoopHandlers).length === 0) {
            return;
        }

        setInterval(() => {
            let currentTime = new Date();
            for (let i = 0; this._mainLoopHandlers.length > i; i++) {
                let handler = this._mainLoopHandlers[i];

                handler.run(currentTime);
            }
        }, 1000);
    }
}