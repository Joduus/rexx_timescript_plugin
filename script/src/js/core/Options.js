"use strict";
var Options = /** @class */ (function () {
    function Options() {
    }
    Options.scriptName = 'Timescript';
    return Options;
}());
function loadOptions(callback) {
    chrome.storage.sync.get([], function (result) {
        var options = new Options();
        callback(options);
    });
}
