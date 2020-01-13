class ModuleCollection {
    _mainLoopModules = [];

    _crossHandleModules = {};

    _htmlModules = [];

    _modules = {};

    constructor() {

    }

    addModule(
        name,
        handler,
        appendHtml = false,
        isMainLoopHandler = true,
        crossHandleAccessAllowed = true
    ) {
        this._modules[name] = handler;

        if (appendHtml) {
            this._htmlModules.push(this._modules[name]);
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
        let html = '';

        for (let i = 0; i < this._htmlModules.length; i++) {
            html += this._htmlModules[i].getHtml();
        }

        html = this.addScriptWrapper(html);

        return html;
    }

    get hasNoMainLoopModules() {
        return Object.keys(this._mainLoopModules).length === 0;
    }

    addScriptWrapper(html) {
        return '<div id="' + Options.scriptName + '">' + html + '</div>'
    }

    run(currentTime) {
        for (let i = 0; this._mainLoopModules.length > i; i++) {
            let handler = this._mainLoopModules[i];

            handler.run(currentTime);
        }
    }
}
