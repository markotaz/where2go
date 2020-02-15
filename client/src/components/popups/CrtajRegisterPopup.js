import React from 'react';
import RegisterPopup from '../popups/RegisterPopup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import '../Header.css';
class CrtajRegisterPopup extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = { modalShow: false };

     let handleLoginShow = () =>
        {
          this.props.setData(()=>this.setState({modalShow: true}));
        };

        handleLoginShow();
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
            Sign up
          </a>
        
          <RegisterPopup
            show={this.state.modalShow}
            showLogin={this.props.showLogin}
            onHide={modalClose}
          />
       </span>
      );
    }
  }

  export default CrtajRegisterPopup;