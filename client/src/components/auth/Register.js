import React, { Fragment, useState} from 'react';
import {Component} from 'react';
import './auth.css';
const request = require('request');

class Register extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      name: null,
      email: null,
      password: null,
      password2: null
    }
  }
  otvoriLogin = () =>
  {
  this.props.onHide();
  this.props.showLogin(false);
  }
  

render(){
    const onSubmit = e => {
        e.preventDefault();

        request.post('http://localhost:5000/user/signup',{json: {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        }},(err,res,body)=>{
          if(err)
          {
            console.error(err);
            return;
          }else{
            console.log(res);
            if(this.state.password===this.state.password2)
            {
            if(res.statusCode!==409)
              alert("Uspesno ste kreirali nalog.");
            else
              alert("Korisnik sa datim emailom vec postoji.");
            }
            else
              alert("Pogresili ste lozinku.");
          }
      

        });
    }
    return ( <Fragment>
    <h1 className="large text-primary">Sign up</h1>
    <p className="lead">
        <i className="fas fa-user"></i> Create Your Account</p>
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <input 
            type="text" 
            placeholder="Name" 
            name="name" 
            onChange={e=> this.setState({name: e.target.value})} 
            required />
      </div>
      <div className="form-group">
        <input 
            type="email" 
            placeholder="Email Address"
            name="email"
            onChange={e=> this.setState({email: e.target.value})} 
            required />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={e=> this.setState({password: e.target.value})}
          minLength="6"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          onChange={e=> this.setState({password2: e.target.value})}
          minLength="6"
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Register" />
    </form>
    <p className="my-1">
      Already have an account? <a href="#" onClick={this.otvoriLogin} >Login</a>
    </p>
    </Fragment>
    )
  }
}
export default Register;