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
       


        request.post('http://localhost:5000/user/admin/login',{json: {
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
            if(res.body.isAuthenticated&&res.body.tip==='admin'){
            localStorage.setItem('tip',res.body.tip);
            localStorage.setItem('token-admin',res.body.token);
            localStorage.setItem('isAuthenticated-admin', res.body.isAuthenticated);
            localStorage.setItem('email-admin',res.body.email);
            document.location.pathname = '/adminObjekta/'+res.body.objectId;
            }else{
              localStorage.setItem('isAuthenticated-admin', res.body.isAuthenticated);
            }
          }
      

        });
 
    }



    return  (
      (!(localStorage.getItem('isAuthenticated-admin') === 'true') )?
      <Fragment>
    <h1 className="large text-primary">Log in</h1>
    <p className="lead">
        <i className="fas fa-user"></i> Sign In As Admin</p>
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
      <input type="submit" className="btn btn-primary" value="Login" />
    </form>
   
    </Fragment>

    :
    document.location.pathname = '/'
    )
}

}
export default Login;