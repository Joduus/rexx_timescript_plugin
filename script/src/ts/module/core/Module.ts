class Module {
    private _handler: ModuleList;

    protected _currentTime: Date;

    getHtml = (): string => '';

    run(currentTime: Date): void {
        this._currentTime = currentTime;
    }

    getModule(module: string): any {
        if (this._handler[module]) {
            return this._handler[module];
        }
    }

    constructor(handler: ModuleList) {
        this._currentTime = new Date(0);
        this._handler = handler;
    }
}