import React from 'react'

import {Location} from 'history'
import {
  ConnectedRouter,

} from 'connected-react-router'
import {
  Route,
  Link,
  Switch,
  withRouter,
} from 'react-router-dom'


import {history} from './store'

interface TLocationProps {
  location: Location
}
const ShowLocation = ({location}:TLocationProps) => ( <div>Current pathname: {location.pathname}</div> )
const PathName = withRouter(ShowLocation) // <-- withRouter passes history.location to the wrap component

const style = {outline: 'solid 1px black', padding: '5px'}

const App = () => (
  <div style={style}>
    <div>Test router:</div>
    <ul>
      <li><Link to="/">Link to: /</Link></li>
      <li><Link to="/a">Link to: /page a</Link></li>
      <li><Link to="/does-not-exit">Link to: /does-not-exist</Link></li>
    </ul>
    <div>
      <Switch>
        <Route exact path="/"  component={()=><div>home</div>} />
        <Route exact path="/a">
          <div>Page a</div>
        </Route>
        <Route>
          <div>No match</div>
        </Route>
      </Switch>
    </div>
    <PathName/>
  </div>
)


const ConnectedRouterApp = () => (
  <ConnectedRouter history={history}>
    <App />
  </ConnectedRouter>
)

export default ConnectedRouterApp
export {App}

