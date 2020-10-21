"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vue_1 = tslib_1.__importDefault(require("vue"));
const App_vue_1 = tslib_1.__importDefault(require("./App.vue"));
const router_1 = tslib_1.__importDefault(require("./router"));
const store_1 = tslib_1.__importDefault(require("./store"));
tslib_1.__exportStar(require("./lib"), exports);
vue_1.default.config.productionTip = false;
new vue_1.default({
    router: router_1.default,
    store: store_1.default,
    render: h => h(App_vue_1.default)
}).$mount('#app');
//# sourceMappingURL=main.js.map