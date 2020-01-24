class Options {
    static scriptName: string = 'Timescript';

    constructor() {

    }
}

function loadOptions(callback: Function) {
    chrome.storage.sync.get([], function (result: Object) {

        let options: Options = new Options();
        callback(options);
    });
}