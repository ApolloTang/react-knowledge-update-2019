import React from 'react'


// PathName
import { Location }  from 'history'
import { withRouter } from 'react-router-dom'
interface TShowLocationProps { location: Location }
const ShowLocation = (
  { location }:TShowLocationProps
) => ( <div>Current pathname:{ location.pathname }</div> )
const PathName = withRouter(ShowLocation) // <-- withRouter passes history.location to the wrapped component

const Home = () => <div>home</div>
const PageA = () => <div>Page content a</div>
const PageNoMatch = () => <div>Page no match</div>

// App
import { Route, Link, Switch } from 'react-router-dom'
const App = () => (
  <div style={{outline: 'solid 1px black', padding: '5px'}}>
    <ul>
      <li><Link to="/">Link to: /</Link></li>
      <li><Link to="/a">Link to: /page a</Link></li>
      <li><Link to="/does-not-exit">Link to: /does-not-exist</Link></li>
    </ul>
    <div>
      <Switch>
        <Route exact path="/"  component={Home} />
        <Route exact path="/a"><PageA /></Route>
        <Route><PageNoMatch /></Route>
      </Switch>
    </div>
    <PathName/>
  </div>
)


// RouterApp
import { history } from './store'
import { ConnectedRouter } from 'connected-react-router'

const RouterApp = () => (
  <ConnectedRouter history={history}>
    <App />
  </ConnectedRouter>
)


export {App, RouterApp}

