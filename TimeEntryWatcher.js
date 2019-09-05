class TimeEntryWatcher {
    /*
     * class timemanagement
     */
    _timeManagement;

    _timeEntries;

    _currentTime;

    constructor(timeEntries, timeManagement) {
        this._timeEntries = timeEntries;
        this._timeManagement = timeManagement;
    }

    run(currentTime) {
        this._currentTime = currentTime;
    }

    getHtml = () => '';
}