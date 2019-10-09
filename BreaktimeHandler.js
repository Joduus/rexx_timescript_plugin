class BreaktimeHandler extends TimeHandler {
    _notificationHandler;

    _options;
    _breakData;

    constructor(options, timeEntries,  handler) {
        super(timeEntries);
        this._options = options;
        this._breakData = this._options.breaks;
        this._handler = handler;
        this._notificationHandler = this._handler.notificationHandler;
    }

    run(currentTime) {
        super.run(currentTime);

        this.updateBreakTime();

        this.updateText();
    }

    getHtml = () => `
<li class="navbar_txt">
    <a title="Pausenzeit" id="nav_infotxt_breaktime_string">
        Pausenzeit:
    </a>
</li>
<li class="navbar_txt noUserSelect">
    <a title="Pausenzeit heute" id="nav_infotxt_breaktime">
    </a>
</li>
`;

    updateText() {
        let element = parent.document.getElementById('nav_infotxt_breaktime');

        let text =
            TimeCalculator.toDoubleDigit(this._time.hours)
            + ':' +
            TimeCalculator.toDoubleDigit(this._time.minutes);

        if (/*this._options.showSeconds*/false) {
            text += ':' + TimeCalculator.toDoubleDigit(this._time.seconds);
        }

        element.textContent = text;
    }

    updateBreakTime() {
        this.resetTimeObject();

        let timeTimes = this.getTimeDifferences(TimeEntries.go);
        this.assignRealTime(timeTimes);
    }
}