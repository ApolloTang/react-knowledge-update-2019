import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
}from 'react-router-dom'
import {ConnectedRouter} from 'connected-react-router'
import {History} from 'history'

interface TConnectedRouterAppProps {
  history: History
}

const ConnectedRouterApp = ({history}:TConnectedRouterAppProps) => (
  <ConnectedRouter history={history}>
    <Router>
      <div style={{outline: 'solid 1px black', padding: '5px'}}>
        <div>Test router:</div>
        <ul>
          <li><Link to="/">Link to: /</Link></li>
          <li><Link to="/a">Link to: /success</Link></li>
        </ul>
        <div>
          <Route exact path="/"        component={()=>(<div>A</div>)} />
          <Route exact path="/a" component={()=>(<div>B</div>)} />
        </div>
      </div>
    </Router>
  </ConnectedRouter>
)

export default ConnectedRouterApp

