# VueAlerts

Your plugin description...

## Installation

### 1. Install
```
yarn add vue-alerts
# or
npm i vue-alerts --save
```

### 2. Plug-in
```js
import VueAlerts from 'vue-alerts'

Vue.use(VueAlerts)

new Vue({
  // your vue config
  vueAlertsSettings: new VueAlerts(),
})
```

### 3. Use in your components

```vue
<template>
  <vue-alerts />
</template>

<script>
  export default {
    async created() {
      console.log(this.$vueAlerts);
    },
  };
</script>
```

## License
MIT
