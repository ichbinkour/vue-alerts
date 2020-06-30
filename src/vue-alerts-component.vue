<template>
  <div :style="styles" id="app">
    <transition-group name="fade">
      <div v-for="elem in items" :key="elem.id" class="notification">
        <div :style="contentStyle" @click="deleteItem(elem)">
          <p class="title">{{ elem.title }}</p>
          <p>{{ elem.text }}</p>
          <p>{{ new Date() }}</p>
          <!--<i v-if="closeIcon" class="fas fa-times"></i>-->
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { events } from './events';
import { formatDirection, generateId, getColor } from './utils';

export default {
  name: 'VueAlerts',
  props: {
    position: {
      type: String,
      default: 'top right'
    },
    width: {
      type: [Number, String],
      default: 300
    },
    group: {
      type: String,
      default: null
    },
    timeout: {
      type: Number,
      default: 3000
    },
    color: {
      type: String,
      default: '#32b7f1'
    }
  },
  data: function() {
    return {
      items: [],
      closeIcon: false
    };
  },
  methods: {
    deleteItem(item) {
      this.items = this.items.filter(v => {
        return item.id !== v.id;
      });
    },
    addItem(event) {
      console.log('ADDING ITEM');
      event.group = event.group || '';
      if (this.group !== event.group) {
        return;
      }

      let item = {
        text: event.text || null,
        title: event.title || null,
        timeout: event.timeout || this.timeout,
        id: generateId(this.items),
        isActive: true
      };

      this.items.push(item);
      let vm = this;
      if (this.timeout >= 0) {
        let interval = setInterval(function() {
          vm.deleteItem(item);
          clearInterval(interval);
        }, item.timeout);
      }
    }
  },
  computed: {
    contentStyle() {
      return {
        'background-color': getColor(this.color).main,
        color: 'white',
        padding: '.5em',
        'border-left': '6px solid ' + getColor(this.color).border,
        '-webkit-box-shadow': '-1px 1px 24px 6px rgba(0,0,0,0.75)',
        '-moz-box-shadow': '-1px 1px 24px 6px rgba(0,0,0,0.75)',
        'box-shadow': '-1px 1px 7px 0px ' + getColor(this.color).main,
        'font-size': '14px'
      };
    },
    styles() {
      const { x, y } = formatDirection(this.position);
      const width = this.width;

      let styles = {
        width: '300px',
        [y]: '8px',
        position: 'absolute',
        'z-index': '999'
      };

      if (x === 'center') {
        styles['left'] = `calc(50% - ${width / 2}px)`;
      } else {
        styles[x] = '18px';
      }
      return styles;
    }
  },
  mounted() {
    events.$on('toasterAdd', this.addItem);
  }
};
</script>

<style scoped>
.notification {
  padding: 3px;
}
.notification p {
  margin: 0;
  font-size: 12px;
}

.notification .title {
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
