"use strict";
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".', key, namespace, storageChange.oldValue, storageChange.newValue);
    }
});
init();
function init() {
    loadOptions(main);
}
function main(options) {
    var timeManagement = new TimeManagement(options);
    timeManagement.run();
}
