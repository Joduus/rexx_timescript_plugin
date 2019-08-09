class NotificationHandler {
    _options;

    _timeEntries;

    _permissionGranted = false;

    constructor(options, timeEntries) {
        Notification.requestPermission().then((result) => {
            if (result === 'denied') {
                console.log('Permission wasn\'t granted. Allow a retry.');
            } else if (result === 'default') {
                console.log('The permission request was dismissed.');
            } else {
                console.log('The Notification permission was granted');
                this._permissionGranted = true;
            }
        });

        this._options = options;
        this._timeEntries = timeEntries;
    }

    run() {

    }

    getHtml = () => '';
}