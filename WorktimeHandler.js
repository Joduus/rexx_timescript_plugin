class WorktimeHandler extends TimeHandler {
    _domIds = {
        worktime: 'nav_infotxt_worktime'
    };

    /*
     * class NotificationHandler
     */
    _notificationHandler;

    _options;
    _hourData;

    constructor(options, timeEntries, handler) {
        super(timeEntries);
        this._options = options;
        this._hourData = this._options.hours;
        this._handler = handler;
        this._notificationHandler = this._handler.notificationHandler;
    }

    run(currentTime) {
        super.run(currentTime);

        this.updateWorktime();

        this.updateText();
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

    updateText() {
        let element = parent.document.getElementById('nav_infotxt_worktime');

        let text =
            TimeCalculator.toDoubleDigit(this._time.hours)
            + ':' +
            TimeCalculator.toDoubleDigit(this._time.minutes);

        if (/*this._options.showSeconds*/true) {
            text += ':' + TimeCalculator.toDoubleDigit(this._time.seconds);
        }

        element.textContent = text;
    }

    updateWorktime() {
        this.resetTimeObject();

        let timeTimes = this.getTimeDifferences(TimeEntries.come);
        this.assignRealTime(timeTimes);
    }
}