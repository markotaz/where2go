import React from 'react';
import { Component } from 'react';
import './object.css';
import Rating from 'react-rating';
const io = require('socket.io-client');


class Object extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isUcitano: false,
      isAuth: localStorage.getItem('isAuthenticated'),
      objekat: null
    };
    this.soket = io.connect('http://localhost:5000/',{query:{naziv: this.props.objekat.naziv}});

    this.soket.on('zaPocetnu',podaci=>{
      if(podaci.objekat.naziv===this.props.objekat.naziv){
       var novi = {
        id: podaci.objekat._id,
        naziv: podaci.objekat.naziv,
        tip: podaci.objekat.tipObjekta,
        opis: podaci.objekat.opis,
        slikaObjekta: podaci.objekat.slikaObjekta,
        brStolova: podaci.objekat.brSlobodnihStolova,
        ocena: Number.parseFloat(podaci.objekat.ocena.$numberDecimal.toString()).toFixed(2)
       }
     this.setState({objekat: novi});
      }
    });
   
  }

  napraviObjekat = () =>
  {
    return {
      id: this.props.objekat._id,
      naziv: this.props.objekat.naziv,
      tip: this.props.objekat.tipObjekta,
      opis:this.props.objekat.opis,
      slikaObjekta: this.props.objekat.slikaObjekta,
      brStolova: this.props.objekat.ukupnoSlobodnihStolova,
      ocena: this.props.ocena
    }
  }
componentWillMount()
{
  var objekatt = this.napraviObjekat();
  this.setState({objekat: objekatt,isUcitano: true});
}
componentWillUnmount()
{
  this.soket.off('zakazao',podaci=>{

    this.setState({objekat: podaci.objekat});  
});
this.soket.disconnect();
}

  render() {

    return (
      (this.state.isUcitano)&&
<div className="row" style={{paddingBottom: "20px",paddingTop: "20px", borderTop:"solid #007BFF 1px"}}>
      <div className="col-sm-7">
         <div className="row">
              <div className="col-sm-4" style={{minWidth:"120px",minHeight:"120"}}>
              <a href={"/Objekat/" + this.state.objekat.id}><img alt='logo ugostiteljskog objekta'  src={this.state.objekat.slikaObjekta} className="img-responsive"/></a>
              </div>
              <div className="col-sm-8 text-left">
                   <a href={"/Objekat/" + this.state.objekat.id}> <h4>{this.state.objekat.naziv}</h4>
                   </a>
                <label>Tip objekta: {this.state.objekat.tip}</label>
                <br></br>
                <label>Slobodnih stolova: {this.state.objekat.brStolova}</label>
                <br></br>

                <div className="">
              <div><span>{this.state.objekat.ocena}</span><span>/10</span>
              </div>
              
              
                  <Rating className="rating"
                    stop={10}
                    readonly

                    placeholderRating={this.state.objekat.ocena}
                    emptySymbol={<img src="http://dreyescat.github.io/react-rating/assets/images/star-grey.png" className="icon" />}
                    placeholderSymbol={<img src="http://dreyescat.github.io/react-rating/assets/images/star-red.png" className="icon" />}
                    fullSymbol={<img src="http://dreyescat.github.io/react-rating/assets/images/star-yellow.png" className="icon" />} />
                  
              
                 </div>





             </div>
            </div>
          </div>
            
        <div className="col-sm-5 text-left">
          {this.state.objekat.opis}<p>   </p>
        </div>


        </div>
   

    );

  }

}



export default Object;