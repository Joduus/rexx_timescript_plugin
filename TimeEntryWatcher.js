class TimeEntryWatcher extends Module {
    _options;

    constructor(options, timeEntries, handler) {
        super(timeEntries, handler);
        this._options = options;
    }

    run(currentTime) {
        super.run(currentTime);

        this.checkForNewTimeEntries();
    }

    getHtml = () => '';

    checkForNewTimeEntries() {
        let currentTimeEntriesLength = this._timeEntries.entryLength;
        let newTimeEntries = new TimeEntries();

        if (currentTimeEntriesLength === newTimeEntries.entryLength) {
            return; // No new entries
        }

        this._timeEntries.timeEntries = newTimeEntries;
    }
}