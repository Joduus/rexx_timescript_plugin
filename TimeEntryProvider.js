class TimeEntryProvider extends Module {
    _timeEntries;

    constructor(handler, timeEntries) {
        super(handler);

        this._timeEntries = timeEntries;
    }

    get module() {
        return this._timeEntries;
    }

    get timeEntries() {
        return this._timeEntries.timeEntries;
    }

    set timeEntries(newTimeEntries) {
        this._timeEntries.timeEntries = newTimeEntries;
    }
}