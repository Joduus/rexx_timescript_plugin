"use strict";
var Module = /** @class */ (function () {
    function Module(handler) {
        this.getHtml = function () { return ''; };
        this._currentTime = new Date(0);
        this._handler = handler;
    }
    Module.prototype.run = function (currentTime) {
        this._currentTime = currentTime;
    };
    Module.prototype.getModule = function (module) {
        if (this._handler[module]) {
            return this._handler[module];
        }
    };
    return Module;
}());
