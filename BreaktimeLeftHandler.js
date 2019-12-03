class BreaktimeLeftHandler extends TimeHandler {
    _domIds = {
        breaktimeLeftString: 'nav_infotxt_breaktimeLeft_string',
        breaktimeLeft: 'nav_infotxt_breaktimeLeft'
    };

    _allReached = false;

    _breakTimes = [ // Set by the options only now hardcoded
        21600, // 6 Hours
        32400  // 9 Hours
    ];

    _breaktime;

    constructor(options, timeEntries, handler) {
        super(options, timeEntries, handler);
    }

    run(currentTime) {
        super.run(currentTime);

        this.updateBreakTimeLeft();

        this.updateText();

        // Implement check for time left notifications
    }

    getHtml = () => `
<li class="navbar_txt">
    <a title="Pausenzeit übrig" id="${this._domIds.breaktimeLeftString}">
        Pausenzeit übrig: 
    </a>
</li>
<li class="navbar_txt noUserSelect">
    <a title="Verbleibende Zeit" id="${this._domIds.breaktimeLeft}">
    </a>
</li>
`;

    updateBreakTimeLeft() {
        this._breaktime = this._handler.breaktimeHandler.breaktime;

        this.resetTimeObject();

        let firstNotReachedTime = -1;
        for (let i = 0; i < this._breakTimes.length; i++) {
            if (this._breaktime < this._breakTimes[i]) {
                firstNotReachedTime = this._breakTimes[i];
                break;
            }
        }

        if (firstNotReachedTime === -1) {
            this._allReached = true;
            return;
        } else {
            this._allReached = false;
        }

        let timeDifference = TimeCalculator.getDifference(this._breaktime, firstNotReachedTime);

        let timeObject = TimeCalculator.calculateRealTime(timeDifference);
        this.assignRealTime(timeObject);
    }

    updateText() {
        let element = parent.document.getElementById(this._domIds.breaktimeLeft);
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