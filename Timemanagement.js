class TimeManagement {
    /*
    class Options
     */
    _options;

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

    _menuBarHtml =
        '<li class="navbar_txt">' +
        '   <a id="nav_infotxt_worktime_string">Arbeitszeit:</a>' +
        '</li>';

    constructor(options) {
        this._options = options;

        this.getTodayTimeEntries();

        this.appendHtml();
    }

    getTodayTimeEntries() {
        let todayTimeEntriesContainer = document.querySelector('.grid_table .grid_row_highlight_today');
        let timeEntries = todayTimeEntriesContainer.children[2].children[0];
        let stateEntries = todayTimeEntriesContainer.children[1].children[0];

        let today = new Date();
        let todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        for (let i = 0; timeEntries.children.length > i; i++) {
            this._timeEntries[i] = {
                time: new Date(todayDate + ' ' + timeEntries.children[i].querySelector('span').textContent),
                state: stateEntries.children[i].querySelector('a').text
            };
        }
    }

    appendHtml() {
        let menuBar = parent.document.getElementById('list_actions');

        menuBar.insertAdjacentHTML("beforeend", this._menuBarHtml);
    }

    run() {
        // Run timemanagment
    }
}