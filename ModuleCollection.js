class ModuleCollection {
    _mainLoopModules = [];

    _crossHandleModules = {};

    _modules = {};

    _html = '';

    constructor() {

    }

    addModule(
        name,
        handler,
        isMainLoopHandler = false,
        crossHandleAccessAllowed = true,
        appendHtml = false
    ) {
        this._modules[name] = handler;

        if (appendHtml) {
            this._html += handler.getHtml();
        }

        if (isMainLoopHandler) {
            this._mainLoopModules.push(this._modules[name]);
        }

        if (crossHandleAccessAllowed) {
            this._crossHandleModules[name] = this._modules[name];
        }
    }

    get crossHandleModules() {
        return this._crossHandleModules;
    }

    get moduleHtml() {
        return this._html;
    }

    get noMainLoopModules() {
        return Object.keys(this._mainLoopModules).length === 0;
    }

    run(currentTime) {
        for (let i = 0; this._mainLoopModules.length > i; i++) {
            let handler = this._mainLoopModules[i];

            handler.run(currentTime);
        }
    }
}
