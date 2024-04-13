import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
// import Vue from 'vue';
import { Icon,Divider } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { createPinia, PiniaVuePlugin } from 'pinia';
import { stateFormat} from "@/utils/stateFormat";

Vue.use(Icon);
Vue.use(Divider)
Vue.use(ElementUI)

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

Vue.prototype.stateFormat = stateFormat


Vue.config.productionTip = false

new Vue({
  pinia,
  router,
  render: h => h(App)
}).$mount('#app')
