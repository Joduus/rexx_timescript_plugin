class TimeEntryWatcher {
    /*
     * class timemanagement
     */
    _handler;

    _timeEntries;

    _currentTime;

    constructor(timeEntries, handler) {
        this._timeEntries = timeEntries;
        this._handler = handler;
    }

    run(currentTime) {
        this._currentTime = currentTime;
    }

    getHtml = () => '';
}