import React from 'react';
import { Component } from 'react';
import './Header.css';
import CrtajRegisterPopup from '../components/popups/CrtajRegisterPopup';
import CrtajLoginPopup from '../components/popups/CrtajLoginPopup';


class AdminHeader extends Component {


  constructor(props) {
    super(props);
    this.state = {
      showRegister: null,
      showLogin: null,
      isAuth: false
    }

  }

  setisAuth = (vr) => {
    this.setState({ isAuth: vr });
    localStorage.setItem('isAuthenticated-admin', vr);
    if (!vr) {
      localStorage.removeItem('token-admin');
      localStorage.removeItem('email-admin');
    }
  }

  

  render() {

    return (
      <nav class="navbar fixed-top navbar-dark bg-primary">
        <div class="container-fluid">
          <div class="navbar-header">
            <a className="btn btn-primary" href="/">Where2Go</a>
          </div>
            <div className="pull-right">
           
            {
              (localStorage.getItem('isAuthenticated-admin') === 'true' ) &&
                
                <a className="btn btn-primary" href="/" onClick={() => this.setisAuth(false)} >Log out</a>

            }
          </div>

          </div>
        
   </nav>
     
   )
  }
}


export default AdminHeader;




