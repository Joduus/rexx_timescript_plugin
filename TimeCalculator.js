class TimeCalculator {
    static calculateTimeDifference(first, second) {
        return second - first;
    }

    static calculateTime(time) {
        time.minutes += time.hours * 60;
        time.seconds += time.minutes * 60;

        return time.seconds;
    }

    static calculateRealTime(sec) {
        let times = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        // Hours
        times.hours = Math.floor(sec / 60 / 60);
        sec -= times.hours * 60 * 60;
        // Minutes
        times.minutes = Math.floor(sec / 60);
        sec -= times.minutes * 60;
        // Seconds
        times.seconds = Math.floor(sec);
        sec -= times.seconds;

        return times;
    }

    static roundTime(times) {
        if (times.seconds >= 60) {
            let diff = Math.floor(times.seconds / 60);
            times.minutes += diff;
            times.seconds -= diff * 60;
        }

        if (times.minutes >= 60) {
            let diff = Math.floor(times.minutes / 60);
            times.hours += diff;
            times.minutes -= diff * 60;
        }

        return times;
    }

    static toDoubleDigit(value) {
        if (value >= 10) {
            return '' + value;
        }

        return '0' + value;
    }

    static getDifference(start, end) {
        return end - start;
    }
}
