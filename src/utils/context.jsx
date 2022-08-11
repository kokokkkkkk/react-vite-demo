import React from "react"

const RoutesContext = React.createContext('routes')
const { Provider, Consumer } = RoutesContext

const RoutesPovider = (props) => {
  const { routes, children } = props
  console.log(routes, 'props----routes');
  return (
    <Provider value={routes}>
      {children}
    </Provider>
  )
}
const RoutesConsuner = props => {
  const { children } = props
  if (typeof children !== 'function') {
    throw Error('ThmeConsumer 传递函数')
  }
  return (
    <Consumer>
        {children}
    </Consumer>
  )
}
export { RoutesContext, RoutesPovider, RoutesConsuner }
