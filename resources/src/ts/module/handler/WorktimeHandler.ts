class WorktimeHandler extends TimeHandler {
    _domIds = {
        worktime: 'nav_infotxt_worktime'
    };

    _worktime: number;

    constructor(handler: ModuleList) {
        super(handler);

        this._worktime = 0;
    }

    run(currentTime: Date) {
        super.run(currentTime);

        this.updateWorktime();

        this.updateText();
    }

    getHtml = (): string => `
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

    get worktime(): number {
        return this._worktime;
    }

    updateWorktime(): void {
        this.resetTimeObject();

        let timeTimes = this.getTimeDifferences(TimeEntries.come);
        if (timeTimes === undefined) {
            return;
        }

        for (let i = 0; i < timeTimes.length; i++) {
            this.assignRealTime(timeTimes[i]);
        }

        // To json for no ref
        this._worktime = TimeCalculator.calculateTime(JSON.parse(JSON.stringify(this._time)));
    }

    updateText(): void {
        let element: Element | null = parent.document.getElementById(this._domIds.worktime);
        if (element === null) {
            console.warn('Could not get the text element for worktime');
            return;
        }

        let text: string =
            TimeCalculator.toDoubleDigit(this._time.hours)
            + ':' +
            TimeCalculator.toDoubleDigit(this._time.minutes);

        if (/*this._options.worktime.showSeconds*/true) {
            text += ':' + TimeCalculator.toDoubleDigit(this._time.seconds);
        }

        element.textContent = text;
    }
}