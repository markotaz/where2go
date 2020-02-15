import React, { Fragment} from 'react';
import {Component} from 'react';


import './auth.css';
const request = require('request')

class Login extends Component{
constructor(props)
{
super(props);
this.state={
  email: null,
  password: null
}

}
otvoriRegistraciju = ()=>
{
this.props.onHide();
this.props.showRegister(true);
}

render(){

    const onSubmit = e => {
        e.preventDefault();
       


        request.post('http://localhost:5000/user/login',{json: {
          email: this.state.email,
          password: this.state.password
        }},(err,res,body)=>{
          if(err)
          {
            console.error(err);
            return;
          }else{
            console.log("status kod: ",res.statusCode);
            console.log(body);
            if(res.body.isAuthenticated){
            localStorage.setItem('token',res.body.token);
            localStorage.setItem('isAuthenticated', true);
            this.props.setAuth(true);
            localStorage.setItem('email',res.body.email);
        
            document.location.href=document.location;
            }else{
              localStorage.setItem('isAuthenticated', false);
              this.props.setAuth(false);
            }
          }
      

        });
 
    }



    return  (
      <Fragment>
    <h1 className="large text-primary">Log in</h1>
    <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account</p>
    <form className="form" onSubmit={e => onSubmit(e)}>
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
      <input type="submit"  className="btn btn-primary" value="Login" />
    </form>
    <p className="my-1">
      Don't have an account? <a href='#' onClick={this.otvoriRegistraciju}>Sign Up</a>
     
    </p>
    </Fragment>
    )
}

}
export default Login;