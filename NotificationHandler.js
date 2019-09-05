class NotificationHandler {
    _options;

    /*
     * class timemanagement
     */
    _timeManagement;

    _timeEntries;

    _notificationQueue = [];

    _permissionGranted = false;

    constructor(options, timeEntries, timeManagement) {
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
        this._timeManagement = timeManagement;
        this._timeEntries = timeEntries;
    }

    run(currentTime) {
    }

    getHtml = () => '';
}