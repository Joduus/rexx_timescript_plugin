class TimeEntryWatcher extends Module {
    _options;

    constructor(options, timeEntries, handler) {
        super(timeEntries, handler);
        this._options = options;
    }

    run(currentTime) {
        super.run(currentTime);
    }

    getHtml = () => '';
}