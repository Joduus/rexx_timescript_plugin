class Options {
    static scriptName = 'Timescript';

    constructor() {

    }
}

function loadOptions(callback) {
    chrome.storage.sync.get([], function (result) {

        let options = new Options();
        callback(options);
    });
}