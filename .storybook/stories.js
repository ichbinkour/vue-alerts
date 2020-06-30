import Vue from 'vue';
import Vuex from 'vuex';
import { storiesOf } from '@storybook/vue';

import VueAlerts from '../src/vue-alerts';

Vue.use(Vuex);
Vue.use(VueAlerts);

const withSettings = component => ({
  vueAlertsSettings: new VueAlerts(),
  ...component
});

const stories = storiesOf('VueAlerts', module);

stories
  // Add some stories here to make your plugin more descriptive
  .add(
    'My Customs  Component',
    () =>
      withSettings({
        template: `
        <div>
          <vue-alerts />
        </div>
      `
      }),
    {
      notes: `
        # Using \`vue-alerts\`

        \`\`\`html
        <template>
          <vue-alerts />
        </template>
        \`\`\`
      `
    }
  )
  .add(
    'My Custom Component with another markup',
    () =>
      withSettings({
        template: `
        <div>
          <b>Hello</b>
          <vue-alerts />
          <i>world</i>
        </div>
      `
      }),
    {
      notes: `
        # Using \`vue-alerts\` with other components

        \`\`\`html
        <template>
          <div>
            <b>Hello</b>
            <vue-alerts />
            <i>world</i>
          </div>
        </template>
        \`\`\`
      `
    }
  );
