class Module {
    _handler;

    _currentTime;

    getHtml = () => '';

    run(currentTime) {
        this._currentTime = currentTime;
    }

    constructor(handler) {
        this._handler = handler;
    }
}