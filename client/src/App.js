import React from 'react';
import './App.css';
import {Component} from 'react';
import AdminLogin from "./components/auth/AdminLogin";
import AdminObjekta from "./components/AdminObjekta";
import About from "./components/About";
import Objekat from "./components/objects/Objekat";
import Home from './components/Home';
import Error from "./components/Error";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

class App extends Component {
  render(){
  return (
<BrowserRouter>
    <Switch>
        <Route exact path="/"  component={Home}/>}/>
        <Route path="/about" component={About}/>
        <Route path="/Objekat/:id" component={Objekat}/> 
        <Route path="/admin" component={AdminLogin}/>
        {
          (localStorage.getItem('isAuthenticated-admin')==='true')&&
        <Route path="/AdminObjekta/:id" component={AdminObjekta}/>
        }
        <Route component={Error}/> 

    </Switch>
</BrowserRouter>)
  }

}

export default App;
