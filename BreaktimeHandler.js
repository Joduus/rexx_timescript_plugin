class BreaktimeHandler extends TimeHandler {
    _domIds = {
        breaktime: 'nav_infotxt_breaktime'
    };

    _breakTime;

    constructor(handler) {
        super(handler);
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
    <a title="Pausenzeit heute" id="${this._domIds.breaktime}">
    </a>
</li>
`;

    get breaktime() {
        return this._breakTime;
    }

    updateBreakTime() {
        this.resetTimeObject();

        let timeTimes = this.getTimeDifferences(TimeEntries.go);
        for (let i = 0; i < timeTimes.length; i++) {
            this.assignRealTime(timeTimes[i]);
        }

        // To json for no ref
        this._breakTime = TimeCalculator.calculateTime(JSON.parse(JSON.stringify(this._time)));
    }

    updateText() {
        let element = parent.document.getElementById(this._domIds.breaktime);

        let text =
            TimeCalculator.toDoubleDigit(this._time.hours)
            + ':' +
            TimeCalculator.toDoubleDigit(this._time.minutes);

        if (/*this._options.breaktime.showSeconds*/false) {
            text += ':' + TimeCalculator.toDoubleDigit(this._time.seconds);
        }

        element.textContent = text;
    }
}