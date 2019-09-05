class BreaktimeHandler {
    _notificationHandler;

    _timeEntries;

    _options;

    /*
     * class timemanagement
     */
    _timeManagement;

    _currentTime;

    constructor(options, timeEntries,  timeManagement) {
        this._options = options;
        this._timeManagement = timeManagement;
        this._timeEntries = timeEntries;
        this._notificationHandler = this._timeManagement.notificationHandler;
    }

    run(currentTime) {
        this._currentTime = currentTime;
    }

    getHtml = () => '';
}