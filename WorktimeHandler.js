class WorktimeHandler extends Module {
    _domIds = {
        worktime: 'nav_infotxt_worktime'
    };

    /*
     * class NotificationHandler
     */
    _notificationHandler;

    _options;
    _hourData;

    _paused = false;

    _worktime = {
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    constructor(options, timeEntries, handler) {
        super();
        this._options = options;
        this._hourData = this._options.hours;
        this._timeEntries = timeEntries;
        this._handler = handler;
        this._notificationHandler = this._handler.notificationHandler;
    }

    run(currentTime) {
        super.run(currentTime);

        this.updateWorktime();

        this.updateText();

        this.checkEntryUpdate();
    }

    getHtml = () => `
<li class="navbar_txt">
    <a title="Arbeitszeit" id="nav_infotxt_worktime_string">
        Arbeitszeit:
    </a>
</li>
<li class="navbar_txt noUserSelect">
    <a title="Arbeitszeit heute" id="nav_infotxt_worktime">
    </a>
</li>
`;

    updateText() {
        let element = parent.document.getElementById('nav_infotxt_worktime');

        element.textContent =
            this.toDoubleDigit(this._worktime.hours)
            + ':' +
            this.toDoubleDigit(this._worktime.minutes)
            + ':' +
            this.toDoubleDigit(this._worktime.seconds);
    }

    updateWorktime() {
        this._worktime.hours = 0;
        this._worktime.minutes = 0;
        this._worktime.seconds = 0;

        for(let i = 0; i < this._timeEntries.entryLength; i += 2) {
            while (this._timeEntries.timeEntries[i].state !== TimeEntries.come) {
                i++;
            }

            let toTime =
                this._timeEntries.timeEntries[i + 1]
                    ? this._timeEntries.timeEntries[i + 1].time
                    : this._currentTime;
            let difference = this.calculateDifference(
                this._timeEntries.timeEntries[i].time,
                toTime
            );

            let times = this.calculateRealTime(difference);

            this.assignRealTime(times);
        }
    }

    calculateDifference(first, second) {
        return second - first;
    }

    calculateRealTime(mSec) {
        let times = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        // Hours
        times.hours = Math.floor(mSec / 1000 / 60 / 60);
        mSec -= times.hours * 1000 * 60 * 60;
        // Minutes
        times.minutes = Math.floor(mSec / 1000 / 60);
        mSec -= times.minutes * 1000 * 60;
        // Seconds
        times.seconds = Math.floor(mSec / 1000);
        mSec -= times.seconds * 1000;

        return times;
    }

    assignRealTime(times) {
        this._worktime.hours += times.hours;
        this._worktime.minutes += times.minutes;
        this._worktime.seconds += times.seconds;

        if (this._worktime.seconds >= 60) {
            let diff = Math.floor(this._worktime.seconds / 60);
            this._worktime.minutes += diff;
            this._worktime.seconds -= diff * 60;
        }

        if (this._worktime.minutes >= 60) {
            let diff = Math.floor(this._worktime.minutes / 60);
            this._worktime.hours += diff;
            this._worktime.minutes -= diff * 60;
        }
    }

    checkEntryUpdate() {
        return; //TODO Timeentrywatcher einrichten
    }

    toDoubleDigit(value) {
        if (value >= 10) {
            return '' + value;
        }

        return '0' + value;
    }
}