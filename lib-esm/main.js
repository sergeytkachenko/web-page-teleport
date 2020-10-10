"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var vue_1 = tslib_1.__importDefault(require("vue"));
var App_vue_1 = tslib_1.__importDefault(require("./App.vue"));
var router_1 = tslib_1.__importDefault(require("./router"));
var store_1 = tslib_1.__importDefault(require("./store"));
tslib_1.__exportStar(require("./lib/page-reconstruction"), exports);
vue_1.default.config.productionTip = false;
new vue_1.default({
    router: router_1.default,
    store: store_1.default,
    render: function (h) { return h(App_vue_1.default); }
}).$mount('#app');
//# sourceMappingURL=main.js.map