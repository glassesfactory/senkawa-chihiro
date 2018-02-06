import * as React from 'react';

import { compose, lifecycle, withStateHandlers } from 'recompose';

import Control from './control';


export const withControl = (stateName, initialStateValue) => {
  return wrapper => {
    class WithControl extends React.Component {
      public componentDidMount() {
        Control.subscribe(this.listener);
        if (!Control.getState(stateName)) {
          // 初期値
          Control.state[stateName] = initialStateValue;
        }
      }
      public componentWillUnmount() {
        Control.unsubscribe(this.listener);
      }
      public listener = state => {
        if (state.hasOwnProperty(stateName)) {
          this.setState({ [stateName]: state[stateName] });
        }
      };
      public render() {
        const props = {
          setGlobalState: Control.setState,
          getGlobalState: Control.getState,
          [stateName]: initialStateValue
        };
        const toProps = Object.assign({}, props, this.props, this.state);
        return React.createElement(wrapper, toProps);
      }
    }
    return WithControl;
  };
};

export const withControlOnlyNotify = () => {
  return wrapper => {
    class WithNotify extends React.Component {
      public render() {
        const props = {
          setGlobalState: Control.setState,
          getGlobalState: Control.getState
        };
        const toProps = Object.assign({}, props, this.props, this.state);
        return React.createElement(wrapper, toProps);
      }
    }
    return WithNotify;
  };
};
