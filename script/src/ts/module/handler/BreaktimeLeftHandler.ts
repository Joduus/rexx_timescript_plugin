class BreaktimeLeftHandler extends TimeHandler {
    _domIds = {
        breaktimeLeft: 'nav_infotxt_breaktimeLeft'
    };

    _breakTimes: BreakTimeOptionEntry[] = [ // Set by the options only now hardcoded
        {
            'afterTime': 21600, // 6 Hours
            'howLong': 1800 // 30 Minutes
        },
        {
            'afterTime': 32400, // 9 Hours
            'howLong': 900 // 15 Minutes
        }
    ];

    _currentWorktime: number;
    _currentBreaktime: number;

    _breaktimeDifference: number;
    _breaktimeReached: boolean = false;
    _isPerfectInTime: boolean = false;

    constructor(handler: ModuleList) {
        super(handler);

        this._currentWorktime = 0;
        this._currentBreaktime = 0;
        this._breaktimeDifference = 0;
    }

    run(currentTime: Date): void {
        super.run(currentTime);

        if (this._breakTimes.length === 0) {
            return;
        }

        this.updateBreakTimeLeft();

        this.updateText();

        // Implement check for time left notifications
    }

    getHtml = (): string => `
<li class="navbar_txt noUserSelect">
    <a title="Verbleibende Pausenzeit" id="${this._domIds.breaktimeLeft}">
    </a>
</li>
`;

    get currentBreaktime(): number {
        return this._breaktimeDifference;
    }

    updateBreakTimeLeft(): void {
        this._currentWorktime = this.getModule('worktimeHandler').worktime;
        this._currentBreaktime = this.getModule('breaktimeHandler').breaktime;

        this.resetTimeObject();

        let howLongTotal: number = 0;
        let firstNotReachedTime: BreakTimeOptionEntry = new class implements BreakTimeOptionEntry {
            afterTime: number = -1;
            howLong: number = -1;
        };
        for (let i: number = 0; i < this._breakTimes.length; i++) {
            howLongTotal += this._breakTimes[i].howLong;

            if (this._currentWorktime < this._breakTimes[i].afterTime) {
                firstNotReachedTime = this._breakTimes[i];
                break;
            }
        }

        let timeDifference: number = TimeCalculator.getDifference(this._currentBreaktime, howLongTotal);
        this._breaktimeDifference = timeDifference;

        if (timeDifference < 1) {
            this._breaktimeReached = true;
            this._isPerfectInTime = timeDifference === 0;
            timeDifference = Math.abs(timeDifference);
        }
        let timeObject = TimeCalculator.calculateRealTime(timeDifference);
        this.assignRealTime(timeObject);
    }

    updateText(): void {
        let element: Element | null = parent.document.getElementById(this._domIds.breaktimeLeft);
        let text: string = '';
        if (element === null) {
            return;
        }

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