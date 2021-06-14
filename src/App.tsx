import React, {useState} from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Authenticated from './components/Authenticated';

const App = () => {
  const [token, setToken] = useState(false);

  const checkToken = () => {
    if(!token){
      return <Login setToken={setToken} />
    }else{
      return <Authenticated />
    }
  }

  return (
    <Router>
      <Switch>
        <Route exact path= '/'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login setToken={setToken}/>
        </Route>
        <Route path='/authenticated'>
          {checkToken()}
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
