class TimeEntryWatcher extends Module {


    run(currentTime: Date) {
        super.run(currentTime);

        this.checkForNewTimeEntries();
    }

    checkForNewTimeEntries() {
        let timeEntryProvider: TimeEntryProvider = this.getModule('timeEntryProvider');
        let currentTimeEntriesLength: number = timeEntryProvider.module.entryLength;
        let newTimeEntries: TimeEntries = new TimeEntries();

        if (currentTimeEntriesLength === newTimeEntries.entryLength) {
            return; // No new entries
        }

        timeEntryProvider.timeEntries = newTimeEntries.timeEntries;
    }
}