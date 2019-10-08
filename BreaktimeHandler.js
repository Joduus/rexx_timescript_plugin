class BreaktimeHandler extends Module {
    _notificationHandler;

    _options;
    _breakData;

    constructor(options, timeEntries,  handler) {
        super();
        this._options = options;
        this._breakData = this._options.breaks;
        this._handler = handler;
        this._timeEntries = timeEntries;
        this._notificationHandler = this._handler.notificationHandler;
    }

    run(currentTime) {
        super.run(currentTime);
    }

    getHtml = () => '';
}