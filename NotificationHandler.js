class NotificationHandler extends Module {
    _options;
    notificationOptions;

    _notificationQueue = [];

    _permissionGranted = false;

    constructor(options, timeEntries, handler) {
        super(timeEntries);
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
        this.notificationOptions = this._options.notifications;
        this._handler = handler;
    }

    run(currentTime) {
        super.run(currentTime);
    }

    getHtml = () => '';
}