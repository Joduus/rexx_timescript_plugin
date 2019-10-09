class Module {
    _handler;

    /*
     * class TimeEntries
     */
    _timeEntries;

    _currentTime;

    getHtml = () => '';

    run(currentTime) {
        this._currentTime = currentTime;
    }

    constructor(timeEntries, handler) {
        this._timeEntries = timeEntries;
        this._handler = handler;
    }
}