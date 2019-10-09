class TimeEntries {
    /*
    [
        {
            time: datetime,
            state: state(kommen, gehen)
        },
        {
            datetime,
            state
        }
    ]
     */
    _timeEntries = [];

    static come = 'Kommen';

    static go = 'Gehen';

    constructor() {
        this.getTodayTimeEntries();
    }

    get timeEntries() {
        return this._timeEntries;
    }

    /*
    Sets new Values without creating new reference
    @var timeEntries self
     */
    set timeEntries(timeEntries) {
        this._timeEntries = timeEntries.timeEntries;
    }

    get entryLength() {
        return this._timeEntries.length;
    }

    getTodayTimeEntries() {
        const todayTimeEntriesContainer = document.querySelector('.grid_table .grid_row_highlight_today');
        const timeEntries = todayTimeEntriesContainer.children[2].children[0];
        const stateEntries = todayTimeEntriesContainer.children[1].children[0];

        if (timeEntries.children.length === 0) {
            console.warn("Keine Zeiteinträge für heute gefunden");
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
