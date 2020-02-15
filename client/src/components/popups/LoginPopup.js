import React from 'react';
import Login from '../auth/Login';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../auth/auth.css';

class LoginPopup extends React.Component {
  constructor(props)
  {
    super(props);

  }
    render() {
        return (
          <Modal
            show= {this.props.show}
            onHide = {this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Welcome
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
           <div className='login-popup'>
           
              <Login showRegister={this.props.showRegister} onHide={this.props.onHide} setAuth={this.props.setAuth}></Login>
           
            </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide} >Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
  }
  
  export default LoginPopup;