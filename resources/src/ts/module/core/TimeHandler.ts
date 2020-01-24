class TimeHandler extends Module {
    _time: Time = {
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    getTimeDifferences(state: string = TimeEntries.come): Time[] | undefined {
        let timeEntryProvider: TimeEntryProvider | undefined = this.getModule('timeEntryProvider');
        if (timeEntryProvider === undefined) {
            console.warn('Cant get Time entry provider');
            return;
        }
        let timeTimes = [];
        for(let i = 0; i < timeEntryProvider.module.entryLength; i += 2) {
            while (timeEntryProvider.timeEntries[i] && timeEntryProvider.timeEntries[i].state !== state) {
                i++;
            }

            if (!timeEntryProvider.timeEntries[i]) {
                break;
            }

            let fromTime = timeEntryProvider.timeEntries[i].time;
            let toTime =
                timeEntryProvider.timeEntries[i + 1]
                    ? timeEntryProvider.timeEntries[i + 1].time
                    : this._currentTime;

            let difference = TimeCalculator.calculateTimeDifference(fromTime, toTime);

            let times = TimeCalculator.calculateRealTime(difference / 1000);

            timeTimes.push(times);
        }

        return timeTimes;
    }

    assignRealTime(time: Time) {
        this._time.hours += time.hours;
        this._time.minutes += time.minutes;
        this._time.seconds += time.seconds;

        TimeCalculator.roundTime(this._time);
    }

    resetTimeObject() {
        this._time.hours = 0;
        this._time.minutes = 0;
        this._time.seconds = 0;
    }
}