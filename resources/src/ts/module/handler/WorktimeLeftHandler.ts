class WorktimeLeftHandler extends TimeHandler {
    _domIds = {
        worktimeLeftString: 'nav_infotxt_worktimeLeft_string',
        worktimeLeft: 'nav_infotxt_worktimeLeft'
    };

    _workHourTimes: number[] = [ // Set by the options only now hardcoded
        28800 // 8 Hours
    ];

    _worktime: number;

    _worktimeReached: boolean = false;

    constructor(handler: ModuleList) {
        super(handler);

        this._worktime = 0;
    }

    run(currentTime: Date): void {
        super.run(currentTime);

        if (this._workHourTimes.length === 0) {
            return;
        }

        this.updateWorktimeLeft();

        this.updateText();

        this.checkNotify();
    }

    getHtml = (): string => `
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

    updateWorktimeLeft(): void {
        let worktimeHandler: WorktimeHandler = this.getModule('worktimeHandler');
        this._worktime = worktimeHandler.worktime;

        this.resetTimeObject();

        let firstNotReachedTime: number = -1;
        for (let i = 0; i < this._workHourTimes.length; i++) {
            if (this._worktime < this._workHourTimes[i]) {
                firstNotReachedTime = this._workHourTimes[i];
                break;
            }
        }

        if (firstNotReachedTime === -1) {
            firstNotReachedTime = this._workHourTimes[this._workHourTimes.length - 1];
        }

        let timeDifference: number = TimeCalculator.getDifference(this._worktime, firstNotReachedTime);

        if (timeDifference < 0) {
            this._worktimeReached = true;
            timeDifference = Math.abs(timeDifference);
        }

        let timeObject: Time = TimeCalculator.calculateRealTime(timeDifference);
        this.assignRealTime(timeObject);
    }

    updateText() {
        let element: Element | null = parent.document.getElementById(this._domIds.worktimeLeft);
        let text: string = '';
        if (element === null) {
            console.warn('Could not get text element for worktime left');
            return;
        }

        if (this._worktimeReached) {
            text += '+';
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

    checkNotify() {
        let worktimeNotificator: WorktimeNotificator = this.getModule('worktimeNotificator');
    }
}