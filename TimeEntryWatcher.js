class TimeEntryWatcher extends Module {
    _options;

    constructor(options, timeEntries, handler) {
        super(timeEntries);
        this._options = options;
        this._handler = handler;
    }

    run(currentTime) {
        super.run(currentTime);
    }

    getHtml = () => '';
}