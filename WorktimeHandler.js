class WorktimeHandler {
    _notificationHandler;

    _timeEntries;

    _options;

    constructor(options, timeEntries, notificationHandler) {
        this._options = options;
        this._timeEntries = timeEntries;
        this._notificationHandler = notificationHandler;
    }

    run() {
        console.log('WorktimeHandler');
    }

    getHtml = () => `
<li class="navbar_txt">
    <a title="Arbeitszeit" id="nav_infotxt_worktime_string">
        Arbeitszeit:
    </a>
</li>
<li class="navbar_txt noUserSelect">
    <a title="Arbeitszeit heute" id="nav_infotxt_worktime">
    </a>
</li>
`;

}