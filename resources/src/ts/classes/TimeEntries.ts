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
    _timeEntries: TimeEntry[] = [];

    static come: string = 'Kommen';

    static go: string = 'Gehen';

    constructor() {
        this.getTodayTimeEntries();
    }

    get timeEntries(): TimeEntry[] {
        return this._timeEntries;
    }

    /*
    Sets new Values without creating new reference
    @var timeEntries self
     */
    set timeEntries(timeEntries: TimeEntry[]) {
        this._timeEntries = timeEntries;
    }

    get entryLength(): number {
        return this._timeEntries.length;
    }

    getTodayTimeEntries() {
        const todayTimeEntriesContainer: Element | null = document.querySelector('.grid_table .grid_row_highlight_today');
        if (todayTimeEntriesContainer === null) {
            console.warn('Could not get today time entries container!');
            return;
        }
        const timeEntries: Element = todayTimeEntriesContainer.children[2].children[0];
        const stateEntries: Element = todayTimeEntriesContainer.children[1].children[0];

        if (timeEntries.children.length === 0) {
            console.warn("Could not get any time entries");
            return;
        }

        const today: Date = new Date();
        const todayDate: string = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        for (let i = 0; timeEntries.children.length > i; i++) {
            let selectedDate: string | null | undefined = timeEntries.children[i].querySelector('span')?.textContent;
            let selectedState: string | null | undefined = stateEntries.children[i].querySelector('a')?.text;
            if (selectedDate === null || selectedDate === undefined || selectedState === null || selectedState === undefined) {
                continue;
            }
            this._timeEntries[i] = {
                time: new Date(todayDate + ' ' + selectedDate),
                state: selectedState
            };
        }
    }
}
