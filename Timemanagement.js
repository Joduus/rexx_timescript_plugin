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
        let notificationHandler = new NotificationHandler(this._options.notifications, this._timeEntries);
        let worktimeHandler = new WorktimeHandler(this._options.hours, this._timeEntries, notificationHandler);
        let breaktimeHandler = new BreaktimeHandler(this._options.breaks, this._timeEntries, notificationHandler);

        this._mainLoopHandlers.push(worktimeHandler, breaktimeHandler, notificationHandler);
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

                handler.run();
            }
        }, 1000);
    }
}