class TimeEntries {
    /*
    {
        {
            datetime,
            state(kommen, gehen)
        },
        {
            datetime,
            state
        }
    }
     */
    _timeEntries = {};

    constructor() {
        this.getTodayTimeEntries();
    }

    get timeEntries() {
        return this._timeEntries;
    }

    get entryLength() {
        return Object.keys(this._timeEntries).length;
    }

    getTodayTimeEntries() {
        const todayTimeEntriesContainer = document.querySelector('.grid_table .grid_row_highlight_today');
        const timeEntries = todayTimeEntriesContainer.children[2].children[0];
        const stateEntries = todayTimeEntriesContainer.children[1].children[0];

        if (timeEntries.children.length === 0) {
            console.warn("Keine Zeiteinträge für heute gefunden");
            setTimeout(this.getTodayTimeEntries, 5000);
            return;
        }

        const today = new Date();
        const todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        for (let i = 0; timeEntries.children.length > i; i++) {
            this._timeEntries[i] = {
                time: new Date(todayDate + ' ' + timeEntries.children[i].querySelector('span').textContent),
                state: stateEntries.children[i].querySelector('a').text
            };
        }
    }
}
