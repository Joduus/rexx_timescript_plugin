class TimeEntryWatcher extends Module {
    _options;

    constructor(options, timeEntries, handler) {
        super();
        this._options = options;
        this._timeEntries = timeEntries;
        this._handler = handler;
    }

    run(currentTime) {
        super.run(currentTime);
    }

    getHtml = () => '';
}