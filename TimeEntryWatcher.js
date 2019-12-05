class TimeEntryWatcher extends Module {


    run(currentTime) {
        super.run(currentTime);

        this.checkForNewTimeEntries();
    }

    checkForNewTimeEntries() {
        let timeEntryProvider = this._handler.timeEntryProvider;
        let currentTimeEntriesLength = timeEntryProvider.module.entryLength;
        let newTimeEntries = new TimeEntries();

        if (currentTimeEntriesLength === newTimeEntries.entryLength) {
            return; // No new entries
        }

        timeEntryProvider.timeEntries = newTimeEntries;
    }
}