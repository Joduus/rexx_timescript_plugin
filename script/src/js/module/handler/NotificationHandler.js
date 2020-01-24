"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NotificationHandler = /** @class */ (function (_super) {
    __extends(NotificationHandler, _super);
    function NotificationHandler(handler) {
        var _this = _super.call(this, handler) || this;
        _this._notificationQueue = [];
        _this._permissionGranted = false;
        Notification.requestPermission().then(function (result) {
            if (result === 'denied') {
                console.log('Permission wasn\'t granted. Allow a retry.');
            }
            else if (result === 'default') {
                console.log('The permission request was dismissed.');
            }
            else {
                console.log('The Notification permission was granted');
                _this._permissionGranted = true;
            }
        });
        return _this;
    }
    NotificationHandler.prototype.run = function (currentTime) {
        _super.prototype.run.call(this, currentTime);
        this.sendNotifications();
    };
    NotificationHandler.prototype.addNotification = function (title, body) {
        var notificationObject = {
            title: title,
            options: {
                body: body
            }
        };
        this._notificationQueue.push(notificationObject);
    };
    NotificationHandler.prototype.sendNotifications = function () {
        if (this._notificationQueue.length === 0) {
            return;
        }
        if (!this._permissionGranted) {
            console.warn("We tried to send a notification, please allow notifications on this page");
            return; // No permission to send Notifications
        }
        var notification;
        while ((notification = this._notificationQueue.shift()) !== undefined) {
            new Notification(notification.title, notification.options);
        }
    };
    return NotificationHandler;
}(Module));
