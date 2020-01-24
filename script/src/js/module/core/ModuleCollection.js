"use strict";
var ModuleCollection = /** @class */ (function () {
    function ModuleCollection() {
        this._mainLoopModules = [];
        this._crossHandleModules = {};
        this._htmlModules = [];
        this._modules = {};
    }
    ModuleCollection.prototype.addModule = function (name, handler, appendHtml, isMainLoopHandler, crossHandleAccessAllowed) {
        if (appendHtml === void 0) { appendHtml = false; }
        if (isMainLoopHandler === void 0) { isMainLoopHandler = true; }
        if (crossHandleAccessAllowed === void 0) { crossHandleAccessAllowed = true; }
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
    };
    Object.defineProperty(ModuleCollection.prototype, "crossHandleModules", {
        get: function () {
            return this._crossHandleModules;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleCollection.prototype, "moduleHtml", {
        get: function () {
            var html = '';
            for (var i = 0; i < this._htmlModules.length; i++) {
                html += this._htmlModules[i].getHtml();
            }
            html = this.addScriptWrapper(html);
            return html;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleCollection.prototype, "hasNoMainLoopModules", {
        get: function () {
            return Object.keys(this._mainLoopModules).length === 0;
        },
        enumerable: true,
        configurable: true
    });
    ModuleCollection.prototype.addScriptWrapper = function (html) {
        return '<div id="' + Options.scriptName + '">' + html + '</div>';
    };
    ModuleCollection.prototype.run = function (currentTime) {
        for (var i = 0; this._mainLoopModules.length > i; i++) {
            var handler = this._mainLoopModules[i];
            handler.run(currentTime);
        }
    };
    return ModuleCollection;
}());
