class BreaktimeHandler {
    _notificationHandler;

    _timeEntries;

    _options;

    /*
     * class timemanagement
     */
    _handler;

    _currentTime;

    constructor(options, timeEntries,  handler) {
        this._options = options;
        this._handler = handler;
        this._timeEntries = timeEntries;
        this._notificationHandler = this._handler.notificationHandler;
    }

    run(currentTime) {
        this._currentTime = currentTime;
    }

    getHtml = () => '';
}