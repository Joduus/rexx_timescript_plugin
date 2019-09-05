class WorktimeHandler {
    _domIds = {
        worktime: 'nav_infotxt_worktime'
    };

    /*
     * class Timemanagement
     */
    _timeManagement;

    /*
     * class NotificationHandler
     */
    _notificationHandler;

    /*
     * class TimeEntries
     */
    _timeEntries;

    _hourData;

    _currentTime;

    constructor(hourData, timeEntries, timeManagement) {
        this._hourData = hourData;
        this._timeEntries = timeEntries;
        this._timeManagement = timeManagement;
        this._notificationHandler = this._timeManagement.notificationHandler;
    }

    run(currentTime) {
        this._currentTime = currentTime;
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