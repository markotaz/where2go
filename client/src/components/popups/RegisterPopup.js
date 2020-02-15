import React from 'react';
import {Link, BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Register from '../auth/Register';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../auth/auth.css';

class RegisterPopup extends React.Component {
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
           <div className='register-popup'>
            <Router>
              <Register showLogin={this.props.showLogin} onHide={this.props.onHide}></Register>
            </Router>
            </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
  }
  
  export default RegisterPopup;