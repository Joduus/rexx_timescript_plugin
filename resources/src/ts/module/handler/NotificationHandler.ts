class NotificationHandler extends Module {
    _notificationQueue: NotificationObject[] = [];

    _permissionGranted = false;

    constructor(handler: ModuleList) {
        super(handler);

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
    }

    run(currentTime: Date) {
        super.run(currentTime);

        this.sendNotifications();
    }

    addNotification(title: string, body: string) {
        let notificationObject: NotificationObject = {
            title: title,
            options: {
                body: body
            }
        };

        this._notificationQueue.push(notificationObject);
    }

    sendNotifications() {
        if (this._notificationQueue.length === 0) {
            return;
        }

        if (!this._permissionGranted) {
            console.warn("We tried to send a notification, please allow notifications on this page");
            return; // No permission to send Notifications
        }

        let notification: NotificationObject | undefined;
        while (
            (notification = this._notificationQueue.shift()
            ) !== undefined
        ) {
            new Notification(notification.title, notification.options);
        }
    }
}