class TimeEntryProvider extends Module {
    _timeEntries: TimeEntries;

    constructor(handler: ModuleList, timeEntries: TimeEntries) {
        super(handler);

        this._timeEntries = timeEntries;
    }

    get module(): TimeEntries {
        return this._timeEntries;
    }

    get timeEntries(): TimeEntry[] {
        return this._timeEntries.timeEntries;
    }

    set timeEntries(newTimeEntries: TimeEntry[]) {
        this._timeEntries.timeEntries = newTimeEntries;
    }
}