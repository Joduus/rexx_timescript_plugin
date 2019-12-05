class BreaktimeLeftHandler extends TimeHandler {
    _domIds = {
        breaktimeLeft: 'nav_infotxt_breaktimeLeft'
    };

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

    _currentWorktime;
    _currentBreaktime;

    _breaktimeDifference;
    _breaktimeReached = false;
    _isPerfectInTime = false;


    run(currentTime) {
        super.run(currentTime);

        if (this._breakTimes.length === 0) {
            return;
        }

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

    get currentBreaktime() {
        return this._breaktimeDifference;
    }

    updateBreakTimeLeft() {
        this._currentWorktime = this._handler.worktimeHandler.worktime;
        this._currentBreaktime = this._handler.breaktimeHandler.breaktime;

        this.resetTimeObject();

        let howLongTotal = 0;
        let firstNotReachedTime = -1;
        for (let i = 0; i < this._breakTimes.length; i++) {
            howLongTotal += this._breakTimes[i].howLong;

            if (this._currentWorktime < this._breakTimes[i].afterTime) {
                firstNotReachedTime = this._breakTimes[i];
                break;
            }
        }

        let timeDifference = TimeCalculator.getDifference(this._currentBreaktime, howLongTotal);
        this._breaktimeDifference = timeDifference;

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

        element.textContent = text;
    }
}