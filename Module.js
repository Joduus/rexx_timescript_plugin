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

    constructor(timeEntries) {
        this._timeEntries = timeEntries;
    }
}