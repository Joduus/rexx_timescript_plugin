class Module {
    _handler;

    _options;

    /*
     * class TimeEntries
     */
    _timeEntries;

    _currentTime;

    getHtml = () => '';

    run(currentTime) {
        this._currentTime = currentTime;
    }

    constructor(options, timeEntries, handler) {
        this._options = options;
        this._timeEntries = timeEntries;
        this._handler = handler;
    }
}