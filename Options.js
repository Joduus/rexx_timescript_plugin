class Options {

    /*
    [
        tracked hours
    ]
     */
    _hours;

    /*
    {
        key: afterHours,
        value: how much break (min)
    }
     */
    _breaks;

    /*
    {
        beforeBreak: [
            min. before autopause
        ],
        atHour: [
            notificate on this time
        ]
    }
     */
    _notifications;

    get hours() {
        return this._hours;
    }
    get breaks() {
        return this._breaks;
    }
    get notifications() {
        return this._notifications;
    }

    set hours(hours) {
        chrome.storage.sync.set({hours: hours}, function () {});
        this._hours = hours;
    }

    set breaks(breaks) {
        chrome.storage.sync.set({breaks: breaks}, function () {});
        this._breaks = breaks;
    }

    set notifications(notifications) {
        chrome.storage.sync.set({notifications: notifications}, function () {});
        this._notifications = notifications;
    }

    constructor(hours, breaks, notifications) {
        this._hours = hours;
        this._breaks = breaks;
        this._notifications = notifications;
    }
}

function loadOptions(callback) {
    chrome.storage.sync.get(['hours', 'breaks', 'notifications'], function (result) {
        if (Object.keys(result.hours).length === 0) {
            result.hours = [6, 8, 9, 10];
            chrome.storage.sync.set({hours: result.hours}, function () {});
        }

        if (Object.keys(result.breaks).length === 0) {
            result.breaks = {
                '6': 30,
                '9': 45
            };
            chrome.storage.sync.set({breaks: result.breaks}, function () {});
        }

        if (Object.keys(result.notifications).length === 0) {
            result.notifications = {
                beforeBreak: [15],
                atHour: [4]
            };
            chrome.storage.sync.set({notifications: result.notifications}, function () {});
        }

        let options = new Options(result.hours, result.breaks, result.notifications);
        callback(options);
    });
}