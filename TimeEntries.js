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

    getTodayTimeEntries() {
        let todayTimeEntriesContainer = document.querySelector('.grid_table .grid_row_highlight_today');
        let timeEntries = todayTimeEntriesContainer.children[2].children[0];
        let stateEntries = todayTimeEntriesContainer.children[1].children[0];

        if (timeEntries.children.length === 0) {
            setTimeout(this.getTodayTimeEntries, 5000);
            return;
        }

        let today = new Date();
        let todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        for (let i = 0; timeEntries.children.length > i; i++) {
            this._timeEntries[i] = {
                time: new Date(todayDate + ' ' + timeEntries.children[i].querySelector('span').textContent),
                state: stateEntries.children[i].querySelector('a').text
            };
        }
    }
}
