class TimeCalculator {
    static calculateTimeDifference(first, second) {
        return second - first;
    }

    static calculateTime(time) {
        time.minutes += time.hours * 60;
        time.seconds += time.minutes * 60;

        return time.seconds;
    }

    static calculateRealTime(mSec) {
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
}
