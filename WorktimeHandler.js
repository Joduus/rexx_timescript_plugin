class WorktimeHandler extends TimeHandler {
    _domIds = {
        worktime: 'nav_infotxt_worktime'
    };

    _worktime;


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
    <a title="Arbeitszeit heute" id="${this._domIds.worktime}">
    </a>
</li>
`;

    get worktime() {
        return this._worktime;
    }

    updateWorktime() {
        this.resetTimeObject();

        let timeTimes = this.getTimeDifferences(TimeEntries.come);
        for (let i = 0; i < timeTimes.length; i++) {
            this.assignRealTime(timeTimes[i]);
        }

        // To json for no ref
        this._worktime = TimeCalculator.calculateTime(JSON.parse(JSON.stringify(this._time)));
    }

    updateText() {
        let element = parent.document.getElementById(this._domIds.worktime);

        let text =
            TimeCalculator.toDoubleDigit(this._time.hours)
            + ':' +
            TimeCalculator.toDoubleDigit(this._time.minutes);

        if (/*this._options.worktime.showSeconds*/true) {
            text += ':' + TimeCalculator.toDoubleDigit(this._time.seconds);
        }

        element.textContent = text;
    }
}