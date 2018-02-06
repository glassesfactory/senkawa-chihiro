interface IControl {
  subscribe: (listener) => void;
  unsubscribe: (listener) => void;
  setState: (key, value) => void;
  getState: (key?) => any;
  getAllState: () => any;
  listeners: any;
  state: object;
}

const control: IControl = {
  subscribe: listener => {
    control.listeners.push(listener);
    return;
  },
  unsubscribe: listener => {
    return;
  },
  setState: (key, value) => {
    control.state[key] = value;
    control.listeners.forEach(listener => {
      listener(control.state);
    });
  },
  getState: key => {
    if (key && control.state.hasOwnProperty(key)) {
      return control.state[key];
    }
    return null;
  },
  getAllState: () => {
    return control.state;
  },
  listeners: null,
  state: null
};

const createControl = () => {
  if (!control.listeners) {
    control.listeners = [];
    control.state = {};
  }
  return control;
};

export default createControl();
