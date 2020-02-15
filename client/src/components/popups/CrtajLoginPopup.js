import React from 'react';
import LoginPopup from '../popups/LoginPopup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import  '../Header.css';

class CrtajLoginPopup extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = { modalShow: false };

      let handleRegisterShow= () =>
      {
        this.props.setData(()=>this.setState({modalShow: true}));
      };

      handleRegisterShow();
    }
  


    render() {
        let modalClose = () => this.setState({ modalShow: false });
        let modalOpen = () => this.setState({ modalShow: true });
    
     
      return (
     <span>
          <a className='btn'
            variant="primary"
            onClick={modalOpen}
            style={{color : 'white'}}
          >
            Login
          </a>
        
          <LoginPopup
            show={this.state.modalShow}
            showRegister={this.props.showRegister}
            onHide={modalClose}
            setAuth={this.props.setAuth}
          />
       </span>
      );
    }
  }

  export default CrtajLoginPopup;