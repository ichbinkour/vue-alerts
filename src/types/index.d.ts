import Vue, { PluginFunction } from 'vue';
// import { Store } from 'vuex';

export class VueAlerts {
  constructor(options?: VueAlertsOptions);

  static install(): PluginFunction<any>;
  // static init(Vue: Vue, store: Store<any>): void;
  static init(Vue: Vue, store: any): void;

  // Your instance methods
  world(): string;
}

export interface VueAlertsOptions extends Object {
  accessorName?: string
}

declare module 'vue/types/vue' {
  interface Vue {
    $vueAlerts: VueAlerts;
    __$VueAlertsInstance: VueAlerts;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    vueAlertsSettings?: VueAlertsOptions | VueAlerts
  }
}
