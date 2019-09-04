class BreaktimeHandler {
    _notificationHandler;

    _timeEntries;

    _options;

    constructor(options, timeEntries,  notificationHandler) {
        this._options = options;
        this._timeEntries = timeEntries;
        this._notificationHandler = notificationHandler;
    }

    run() {
        console.log('BreaktimeHandler');
    }

    getHtml = () => '';
}