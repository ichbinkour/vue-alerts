export function devMode() {
  return process.env.NODE_ENV !== 'production';
}

// This is a simple helper to create a store inside the Vuex.
export function registerVuexStore(vuex, storeName, store) {
  if (!vuex) return;
  const isRegistered = vuex._modules.get([storeName]);
  if (!isRegistered) {
    vuex.registerModule(storeName, store);
  }
}

const directions = {
  x: ['left', 'center', 'right'],
  y: ['top', 'bottom']
};

export const split = value => {
  if (typeof value !== 'string') {
    return [];
  }
  return value.split(/\s+/gi).filter(v => v);
};

export const getColor = color => {
  console.log(color);
  switch (color) {
    case 'error':
      return {
        main: '#f14040',
        border: '#f14040'
      };
    case 'warning':
      return {
        main: '#f18838',
        border: '#d26e21'
      };
    case 'success':
      return {
        main: '#53b446',
        border: '#289418'
      };
    case 'info':
      return {
        main: '#32b7f1',
        border: '#1793ca'
      };
    default:
      return '#32b7f1';
  }
};

export const generateId = list => {
  let date = new Date().getTime();

  if (date < 0) date *= -1;
  return list.length * date;
};

export const formatDirection = value => {
  if (typeof value === 'string') {
    value = split(value);
  }
  let x = null;
  let y = null;

  value.forEach(v => {
    if (directions.y.indexOf(v) !== -1) {
      y = v;
    }
    if (directions.x.indexOf(v) !== -1) {
      x = v;
    }
  });

  return {
    x,
    y
  };
};
