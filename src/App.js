import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { Component } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
class App extends Component {
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="/login" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/map" component={MapView}/>
        </Switch>
      </Router>
    )
  }
}
export default App