class WorktimeLeftHandler extends TimeHandler {
    _domIds = {
        worktimeLeftString: 'nav_infotxt_worktimeLeft_string',
        worktimeLeft: 'nav_infotxt_worktimeLeft'
    };

    _allReached = false;

    _workHourTimes = [ // Set by the options only now hardcoded
        28800 // 8 Hours
    ];

    _worktime;

    constructor(options, timeEntries, handler) {
        super(options, timeEntries, handler);
    }

    run(currentTime) {
        super.run(currentTime);

        this.updateWorktimeLeft();

        this.updateText();

        // Implement check for time left notifications
    }

    getHtml = () => `
<li class="navbar_txt">
    <a title="Arbeitszeit übrig" id="${this._domIds.worktimeLeftString}">
        8 Stunden in: 
    </a>
</li>
<li class="navbar_txt noUserSelect">
    <a title="Verbleibende Zeit" id="${this._domIds.worktimeLeft}">
    </a>
</li>
`; // Muss noch angepasst werden

    updateWorktimeLeft() {
        this._worktime = this._handler.worktimeHandler.worktime;

        this.resetTimeObject();

        let firstNotReachedTime = -1;
        for (let i = 0; i < this._workHourTimes; i++) {
            if (this._worktime < this._workHourTimes[i]) {
                firstNotReachedTime = this._workHourTimes[i];
                break;
            }
        }

        if (firstNotReachedTime === -1) {
            this._allReached = true;
            return;
        } else {
            this._allReached = false;
        }

        let timeDifference = TimeCalculator.getDifference(this._worktime, firstNotReachedTime);

        let timeObject = TimeCalculator.calculateRealTime(timeDifference);
        this.assignRealTime(timeObject);
    }

    updateText() {
        let element = parent.document.getElementById(this._domIds.worktimeLeft);
        let text = '';

        if (!this._allReached) {
            text =
                TimeCalculator.toDoubleDigit(this._time.hours)
                + ':' +
                TimeCalculator.toDoubleDigit(this._time.minutes);

            if (/*this._options.worktimeLeft.showSeconds*/true) {
                text += ':' + TimeCalculator.toDoubleDigit(this._time.seconds);
            }
        } else {
            text = 'Kein Zeitstempel übrig';
        }

        element.textContent = text;
    }
}