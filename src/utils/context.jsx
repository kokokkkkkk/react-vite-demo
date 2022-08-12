import React from 'react';
import PropTypes from 'prop-types';
const RoutesContext = React.createContext('routes');
const { Provider, Consumer } = RoutesContext;

const RoutesPovider = (props) => {
  const { routes, children } = props;
  return <Provider value={routes}>{children}</Provider>;
};
const RoutesConsuner = (props) => {
  const { children } = props;
  if (typeof children !== 'function') {
    throw Error('ThmeConsumer 传递函数');
  }
  return <Consumer>{children}</Consumer>;
};

RoutesPovider.propTypes = {
  routes: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
RoutesConsuner.propTypes = {
  children: PropTypes.array
};
RoutesConsuner.defaultProps = {
  children: []
};
RoutesPovider.defaultProps = {
  children: [null],
  routes: []
};
export { RoutesContext, RoutesPovider, RoutesConsuner };
