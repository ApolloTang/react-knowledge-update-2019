import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link, Switch
}from 'react-router-dom'
import {ConnectedRouter} from 'connected-react-router'
import {History} from 'history'

interface TConnectedRouterAppProps {
  history: History
}

const ConnectedRouterApp = ({history}:TConnectedRouterAppProps) => (
  <ConnectedRouter history={history}>
    <div style={{outline: 'solid 1px black', padding: '5px'}}>
      <div>Test router:</div>
      <ul>
        <li><Link to="/">Link to: /</Link></li>
        <li><Link to="/a">Link to: /page a</Link></li>
        <li><Link to="/does-not-exit">Link to: /does-not-exist</Link></li>
      </ul>
      <div>
        <Switch>
          <Route exact path="/"  component={()=><div>home</div>} />
          <Route exact path="/a" component={()=><div>Page a</div>} />
          <Route                 component={()=><div>No match</div>} />
        </Switch>
      </div>
    </div>
  </ConnectedRouter>
)

export default ConnectedRouterApp

