import React from 'react';
import { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const request = require('request');

class RecenzijaPopup extends Component{
constructor(props)
{
    super(props);
    this.state = {
        show : true,
        opis: "",
       objekat: null,
       onHide: null 
    }

}
componentWillMount()
{
  var objekat={
    opis: this.state.opis,
    ocena: this.props.brojZv,
    naziv: this.props.nazivObjekta,
  }
  this.setState({objekat: objekat,onHide: this.props.onHide ,show: this.props.show});
}
dodajRecenziju = () =>
{
    var user = localStorage.getItem('email');
   user = user.split('@')[0].toLowerCase();
   console.log("KKKK",this.state.opis);

request.post('http://localhost:5000/objects/recenzija',{json:{
  nazivObjekta: this.props.nazivObjekta,
  email: user,
  ocena: this.props.brojZv,
  opis: this.state.opis

}},(err,res,body)=>{
  if(err)
  { 
    console.log("Greska prilikom dodavanja recenzije",err);
    return;
  }else
  {
    if(res.statusCode===201)
    {
      

      console.log(res.body.poruka);
    }else
    {
      console.log(res.body.poruka);
    }
  }
});
this.props.onHide();

}


render()
{
  var email = localStorage.getItem('email');
  email = email.split('@')[0].toLowerCase();

    return(
        <Modal 
        show={this.props.show}
        onHide = {this.props.onHide}
        
        >
          <Modal.Header closeButton>
            <Modal.Title>{email}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Dali ste ocenu:{this.props.brojZv}/10
            <br></br>
            <textarea type="text" rows="4" cols="60" value={this.state.opis} onChange={(e)=>this.setState({opis: e.target.value})}></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={()=>this.dodajRecenziju()}>
              Dodaj recenziju
            </Button>
          </Modal.Footer>
        </Modal>
    );
}

}

export default RecenzijaPopup;