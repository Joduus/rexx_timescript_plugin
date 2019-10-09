class NotificationHandler extends Module {
    _options;

    _notificationQueue = [];

    _permissionGranted = false;

    constructor(options, timeEntries, handler) {
        super(timeEntries, handler);
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
    }

    run(currentTime) {
        super.run(currentTime);
    }

    getHtml = () => '';
}