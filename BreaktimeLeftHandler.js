class BreaktimeLeftHandler extends TimeHandler {
    _domIds = {
        breaktimeLeft: 'nav_infotxt_breaktimeLeft'
    };

    _allReached = false;

    _breakTimes = [ // Set by the options only now hardcoded
        {
            'afterTime': 21600, // 6 Hours
            'howLong': 1800 // 30 Minutes
        },
        {
            'afterTime': 32400, // 9 Hours
            'howLong': 900 // 15 Minutes
        }
    ];

    _worktime;

    _breaktime;

    _breaktimeReached = false;
    _isPerfectInTime = false;

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
<li class="navbar_txt noUserSelect">
    <a title="Verbleibende Pausenzeit" id="${this._domIds.breaktimeLeft}">
    </a>
</li>
`;

    updateBreakTimeLeft() {
        this._worktime = this._handler.worktimeHandler.worktime;
        this._breaktime = this._handler.breaktimeHandler.breaktime;

        this.resetTimeObject();

        let howLongTotal = 0;
        let firstNotReachedTime = -1;
        for (let i = 0; i < this._breakTimes.length; i++) {
            howLongTotal += this._breakTimes[i].howLong;

            if (this._worktime < this._breakTimes[i].afterTime) {
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

        let timeDifference = TimeCalculator.getDifference(this._breaktime, howLongTotal);

        if (timeDifference < 1) {
            this._breaktimeReached = true;
            this._isPerfectInTime = timeDifference === 0;
            timeDifference = Math.abs(timeDifference);
        }
        let timeObject = TimeCalculator.calculateRealTime(timeDifference);
        this.assignRealTime(timeObject);
    }

    updateText() {
        let element = parent.document.getElementById(this._domIds.breaktimeLeft);
        let text = '';

        if (!this._allReached) {
            if (this._breaktimeReached) {
                if (!this._isPerfectInTime) {
                    text += '+';
                }
            } else {
                text += '-';
            }

            text +=
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