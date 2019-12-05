class OptionsProvider extends Module {
    _options;

    constructor(handler, options) {
        super(handler);

        this._options = options;
    }

    get options() {
        return this._options;
    }
}