import React from 'react';
import { Component } from 'react';
import './Header.css';
import CrtajRegisterPopup from '../components/popups/CrtajRegisterPopup';
import CrtajLoginPopup from '../components/popups/CrtajLoginPopup';


class Header extends Component {


  constructor(props) {
    super(props);
    this.state = {
      showRegister: null,
      showLogin: null,
      isAuth: false
    }

  }

  setRegisterShow = (func) => {
    this.setState({ showRegister: func });
  }

  setLoginShow = (func) => {
    this.setState({ showLogin: func });
  }

  setisAuth = (vr) => {
    this.setState({ isAuth: vr });
    localStorage.setItem('isAuthenticated', vr);
    if (!vr) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    }
  }

  showRegLog = (isReg) => {
    if (isReg) {
      if (this.state.showRegister != null)
        this.state.showRegister();
    }
    else {
      if (this.state.showLogin != null)
        this.state.showLogin();
    }

  }


  render() {

    return (
      <nav className="navbar fixed-top navbar-dark bg-primary">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="btn btn-primary" href="/">Where2Go</a>
          </div>
            <div className="pull-right">
           
            {
              (localStorage.getItem('isAuthenticated') === null || this.state.isAuth === false && localStorage.getItem('isAuthenticated') === "false") ?
                <span>
                  <CrtajRegisterPopup className="btn" setData={this.setRegisterShow} showLogin={this.showRegLog}></CrtajRegisterPopup>
                  <CrtajLoginPopup className="btn" setData={this.setLoginShow} showRegister={this.showRegLog} setAuth={this.setisAuth}></CrtajLoginPopup>
                </span>

                :
                <a className="btn btn-primary" href={document.location} onClick={() => this.setisAuth(false)} >Log out</a>

            }
          </div>

          </div>
        
   </nav>
     
   )
  }
}


export default Header;




