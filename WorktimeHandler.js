class WorktimeHandler {
    _domIds = {
        worktime: 'nav_infotxt_worktime'
    };

    /*
     * class Timemanagement
     */
    _handler;

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

    constructor(hourData, timeEntries, handler) {
        this._hourData = hourData;
        this._timeEntries = timeEntries;
        this._handler = handler;
        this._notificationHandler = this._handler.notificationHandler;
    }

    run(currentTime) {
        this._currentTime = currentTime;

        this.updateWorktime();
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

    updateWorktime() {

    }

}