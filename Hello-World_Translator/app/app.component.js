"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var translate_1 = require("./translate");
var AppComponent = (function () {
    function AppComponent(_translate) {
        this._translate = _translate;
    }
    AppComponent.prototype.ngOnInit = function () {
        // standing data
        this.supportedLangs = [
            { display: 'English', value: 'en' },
            { display: 'Español', value: 'es' },
            { display: '华语', value: 'zh' },
        ];
        this.selectLang('es');
    };
    AppComponent.prototype.isCurrentLang = function (lang) {
        return lang === this._translate.currentLang;
    };
    AppComponent.prototype.selectLang = function (lang) {
        // set default;
        this._translate.use(lang);
        this.refreshText();
    };
    AppComponent.prototype.refreshText = function () {
        this.translatedText = this._translate.instant('hello world');
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-root',
        templateUrl: 'app.component.html',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof translate_1.TranslateService !== "undefined" && translate_1.TranslateService) === "function" && _a || Object])
], AppComponent);
exports.AppComponent = AppComponent;
var _a;
//# sourceMappingURL=app.component.js.map