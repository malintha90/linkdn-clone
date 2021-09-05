import React, { useEffect } from 'react';
import { getUserAuth } from './actions/userAction';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Register from './components/Register';
import Home from './components/Home';
import './App.css';
import { useSelector } from 'react-redux';
import Profile from './components/Profile';
import Chat from './components/Chat';

function App() {

  useEffect(() => {
    getUserAuth();
  },[])

  


  return (
    <BrowserRouter>
      <Switch>
      {/* {!Object.keys(user).length ? (<Home/>) : ( */}
        <div className="app">    

            <Route exact path="/chat" component={Chat}></Route>
            <Route exact path="/profile" component={Profile}></Route>           
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/" component={Home}></Route>
         
        </div>         
        {/* )} */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
