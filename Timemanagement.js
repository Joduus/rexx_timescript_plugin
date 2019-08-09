class TimeManagement {
    /*
    class Options
     */
    _options;

    /*
    {
        {
            datetime,
            state(kommen, gehen)
        },
        {
            datetime,
            state
        }
    }
     */
    _timeEntries = {};

    /*
    Holds all Handlers for the main loop defined in configureMainLoop
     */
    _mainLoopHandlers = [];

    _menuBarHtml = '';

    constructor(options) {
        this._options = options;

        this.getTodayTimeEntries();

        this.configureMainLoop();

        this.appendHtml();
    }

    configureMainLoop() {
        let notificationHandler = new NotificationHandler(this._options.notifications);
        let worktimeHandler = new WorktimeHandler(this._options.hours, notificationHandler);
        let breaktimeHandler = new BreaktimeHandler(this._options.breaks, notificationHandler);

        this._mainLoopHandlers.push(worktimeHandler, breaktimeHandler, notificationHandler);
    }

    getTodayTimeEntries() {
        let todayTimeEntriesContainer = document.querySelector('.grid_table .grid_row_highlight_today');
        let timeEntries = todayTimeEntriesContainer.children[2].children[0];
        let stateEntries = todayTimeEntriesContainer.children[1].children[0];

        if (timeEntries.children.length === 0) {
            setTimeout(this.getTodayTimeEntries, 5000);
            return;
        }

        let today = new Date();
        let todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        for (let i = 0; timeEntries.children.length > i; i++) {
            this._timeEntries[i] = {
                time: new Date(todayDate + ' ' + timeEntries.children[i].querySelector('span').textContent),
                state: stateEntries.children[i].querySelector('a').text
            };
        }
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
        setInterval(() => {
            for (let i = 0; this._mainLoopHandlers.length > i; i++) {
                let handler = this._mainLoopHandlers[i];

                handler.run();
            }
        }, 1000)
    }
}