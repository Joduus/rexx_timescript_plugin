class ModuleCollection {
    private _mainLoopModules: Module[] = [];

    public _crossHandleModules: ModuleList = {};

    private _htmlModules: Module[] = [];

    private _modules: ModuleList = {};

    constructor() {

    }

    addModule(
        name: string,
        handler: Module,
        appendHtml: boolean = false,
        isMainLoopHandler: boolean = true,
        crossHandleAccessAllowed: boolean = true
    ): void {
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

    get crossHandleModules(): ModuleList {
        return this._crossHandleModules;
    }

    get moduleHtml(): string {
        let html: string = '';

        for (let i: number = 0; i < this._htmlModules.length; i++) {
            html += this._htmlModules[i].getHtml();
        }

        html = this.addScriptWrapper(html);

        return html;
    }

    get hasNoMainLoopModules(): boolean {
        return Object.keys(this._mainLoopModules).length === 0;
    }

    addScriptWrapper(html: string): string {
        return '<div id="' + Options.scriptName + '">' + html + '</div>'
    }

    run(currentTime: Date) {
        for (let i = 0; this._mainLoopModules.length > i; i++) {
            let handler = this._mainLoopModules[i];

            handler.run(currentTime);
        }
    }
}
