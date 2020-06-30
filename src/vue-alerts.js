import {
  devMode,
  registerVuexStore
} from './utils';

// Import your additional components here
import VueAlertsComponent from './vue-alerts-component.vue';
import {
  events
} from './events';

export default class VueAlerts {
  // HERE IS YOUR PLACE TO DEVELOP YOUR COMPONENT

  constructor(options = {}) {
    const defaults = {
      // This is your plugin's options. It will be accessible with this.options
      accessorName: '$vueAlerts'
    };
    this.options = {
      ...defaults,
      ...options
    };
  }

  // Some instance methods that you can access from this.$vueAlerts
  world() {
    return 'world';
  }

  static register = (Vue, options, store) => {
    // console.log('Here is the options of the component', options);
    // console.log('Here is the store of the app', store);
    // You can use `this.options` property to access options.

    // Delete this line if your plug-in doesn't provide any components
    Vue.component('VueAlerts', VueAlertsComponent);

    // Vue.directive('your-custom-directive', customDirective);

    // registerVuexStore(store, 'counterStore', {
    //   namespaced: true,
    //   state: { counter: 0 },
    //   getters: {
    //     counter: state => state.counter
    //   },
    //   actions: {
    //     increment: ({ commit }) => commit('increment')
    //   },
    //   mutations: {
    //     increment: state => state.counter++
    //   }
    // });
  };

  // Some lifecycle hooks to add on mixin

  static mixin = () => ({
    methods: {
      notifier(opts) {
        events.$emit('toasterAdd', opts)
        // if (typeof opts === 'object') {
        //   events.$emit('add', opts);
        // }
      }
    },
    mounted() {
      // console.log('Hey! I am running on every mount, please remove me!');
      // console.log(this.$store);
    }
  });

  initialized = false;

  init(Vue, store) {
    if (devMode() && !install.installed) {
      console.warn(
        `[vue-alerts] not installed. Make sure to call \`Vue.use(VueAlerts)\` before init root instance.`
      );
    }

    if (this.initialized) {
      return;
    }

    VueAlerts.register(Vue, this.options, store);
    this.initialized = true;
  }
}

export function install(Vue) {
  const isDev = devMode();
  if (install.installed && Vue) {
    if (isDev) {
      console.warn(
        '[vue-alerts] already installed. Vue.use(VueAlerts) should be called only once.'
      );
    }
    return;
  }

  Vue.mixin({
    /**
     * VueAlerts init hook, injected into each instances init hooks list.
     */
    beforeCreate() {
      const {
        vueAlertsSettings,
        store,
        parent
      } = this.$options;

      let instance = null;
      if (vueAlertsSettings) {
        instance =
          typeof vueAlertsSettings === 'function' ?
          new vueAlertsSettings() :
          new VueAlerts(vueAlertsSettings);
        // Inject store
        instance.init(Vue, store);
      } else if (parent && parent.__$VueAlertsInstance) {
        instance = parent.__$VueAlertsInstance;
        instance.init(Vue, parent.$store);
      }

      if (instance) {
        // Store helper for internal use
        this.__$VueAlertsInstance = instance;
        this[instance.options.accessorName] = instance;
      }
    },

    ...VueAlerts.mixin()
  });

  install.installed = true;
  if (isDev) {
    // console.info('[vue-alerts] is plugged in.');
  }
}

VueAlerts.install = install;
