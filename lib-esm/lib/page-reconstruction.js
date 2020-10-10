"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageReconstruction = void 0;
var tslib_1 = require("tslib");
var PageReconstruction = /** @class */ (function () {
    function PageReconstruction() {
    }
    PageReconstruction.prototype.packPage = function (document) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var elements;
            return tslib_1.__generator(this, function (_a) {
                elements = Array
                    .from(document.querySelectorAll('body *'))
                    .filter(function (x) { return x.tagName.toLowerCase() !== 'script'; })
                    .filter(function (x) { return x.tagName.toLowerCase() !== 'code'; })
                    .filter(function (x) { return x.tagName.toLowerCase() !== 'noscript'; });
                return [2 /*return*/, elements.map(function (el) {
                        var box = el.getBoundingClientRect();
                        var styles = getComputedStyle(el);
                        return {
                            tag: el.tagName.toLowerCase(),
                            box: {
                                x: box.x,
                                y: box.y,
                                width: box.width,
                                height: box.height,
                            },
                            zIndex: isNaN(parseInt(styles.zIndex)) ? 0 : parseInt(styles.zIndex),
                        };
                    }).filter(function (x) { return x.box.height > 0 && x.box.width > 0; })];
            });
        });
    };
    PageReconstruction.prototype.unpackPage = function (toElement, elements) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var offset, css, oldStylesheet, style;
            return tslib_1.__generator(this, function (_a) {
                offset = { x: 0, y: 0, w: 0, h: 0 };
                css = '';
                elements.forEach(function (el, index) {
                    var id = "id-" + index + "-gen";
                    var domEl = document.createElement('div');
                    domEl.setAttribute('id', id);
                    // domEl.innerText = el.tag;
                    toElement.appendChild(domEl);
                    var localCss = " #" + id + " {";
                    localCss += "position: fixed;";
                    localCss += "top: " + (el.box.y + offset.y) + "px;";
                    localCss += "left: " + (el.box.x + offset.x) + "px;";
                    localCss += "width: " + (el.box.width + offset.w) + "px;";
                    localCss += "height: " + (el.box.height + offset.h) + "px;";
                    localCss += "z-index: 999999;";
                    localCss += "} ";
                    localCss += "#" + id + ":hover {background: rgba(237, 113, 202, 0.3);}";
                    css += localCss;
                });
                oldStylesheet = document.querySelector('#fake-styles');
                if (oldStylesheet) {
                    document.removeChild(oldStylesheet);
                }
                style = document.createElement('style');
                style.setAttribute('id', 'fake-styles');
                style.appendChild(document.createTextNode(css));
                document.getElementsByTagName('head')[0].appendChild(style);
                return [2 /*return*/];
            });
        });
    };
    return PageReconstruction;
}());
exports.PageReconstruction = PageReconstruction;
//# sourceMappingURL=page-reconstruction.js.map