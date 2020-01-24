class BreaktimeHandler extends TimeHandler {
    _domIds = {
        breaktime: 'nav_infotxt_breaktime'
    };

    _breakTime: number;

    constructor(handler: ModuleList) {
        super(handler);

        this._breakTime = 0;
    }

    run(currentTime: Date) {
        super.run(currentTime);

        this.updateBreakTime();

        this.updateText();
    }

    getHtml = (): string => `
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

    get breaktime(): number {
        return this._breakTime;
    }

    updateBreakTime(): void {
        this.resetTimeObject();

        let timeTimes = this.getTimeDifferences(TimeEntries.go);
        if (timeTimes === undefined) {
            return;
        }

        for (let i = 0; i < timeTimes.length; i++) {
            this.assignRealTime(timeTimes[i]);
        }

        // To json for no ref
        this._breakTime = TimeCalculator.calculateTime(JSON.parse(JSON.stringify(this._time)));
    }

    updateText(): void {
        let element: Element | null = parent.document.getElementById(this._domIds.breaktime);
        if (element === null) {
            console.warn('Could not get Breaktime Text Element');
            return;
        }

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