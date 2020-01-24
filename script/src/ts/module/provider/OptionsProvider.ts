class OptionsProvider extends Module {
    _options: Options;

    constructor(handler: ModuleList, options: Options) {
        super(handler);

        this._options = options;
    }

    get options() {
        return this._options;
    }
}