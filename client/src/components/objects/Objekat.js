import React from 'react';
import { Component } from 'react';
import './object.css';
import Rating from 'react-rating';
import Spinner from 'react-bootstrap/Spinner'
import './Objekat.css';
import Kafic from "../Kafic";
import Recenzija from "../Recenzija";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RecenzijaPopup from '../popups/RecenzijaPopup';

import {Tabs, Tab} from "react-bootstrap";
import Kontakt from "../Kontakt";
const io = require('socket.io-client');

class Objekat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUcitano: false,
            objekat: null,
            isAuth: localStorage.getItem('isAuthenticated'),
            mojaOcena: null,
            ocena: null,
            mapa: ""
        }
        this.soket = io.connect('http://localhost:5000/',{query:{naziv: "recenzije"}});

    }

    
    componentWillMount()
    {
        const id = this.props.match.params.id;
        fetch('/objects/' + id)
            .then(response => {
                if(response.status==404) 
                throw new Error('Objekat ne postoji');
                
                return response.json()})
            .then(obj => {
           
                            var novi = obj;
                          
                novi.ocena = Number.parseFloat(novi.ocena.$numberDecimal.toString()).toFixed(2)
                this.setState({ objekat: obj,isUcitano: true ,ocena: novi.ocena,ukupnoRecenzija: obj.ukupnoRecenzija}, () => console.log(this.state));
                // console.log("OBJEKAT: ",novi.ocena);
               
              
                this.soket.on('dodata-recenzija',(podaci)=>{
                    // console.log("Uspesno si zakazao sto");
                    novi.recenzije = podaci.recenzije;
                    novi.ocena = Number.parseFloat(podaci.ocena.$numberDecimal.toString()).toFixed(2)

                    // console.log('errrrrrrrrrrrrrrrrrrr',novi);
                    this.setState({objekat: novi,ocena:novi.ocena,ukupnoRecenzija: podaci.recenzije.length});  
                });
            }).catch(err=>{document.location.pathname = '/notfound'});

    }
    componentWillUnmount()
    {
        var objekat = this.state.objekat;
        this.soket.off('dodata-recenzija',(podaci)=>{
     
            objekat.recenzije = podaci.recenzije;
        });
        this.soket.disconnect();
    }

        // componentDidMount()
        // {
        //     console.log("objekat u objekatjs",this.state.objekat);
        // }

    ostaviRecenziju(brojZvezda){
        this.setState({ modalShow: true, brZv: brojZvezda,mojaOcena: brojZvezda });
    
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false });
        return (

            (this.state.isUcitano) ?
                // <BrowserRouter>
                    <div className="container-fluid"> {
                        //cela
                    }

                        <div className="col">{
                            //nzm,sve
                        }

                            <div className="row">
                                <div className="col-sm-4" style={{ minWidth: "120px", minHeight: "120", paddingBottom: "2%", paddingTop: "1%" }} > {
                                    //slika
                                }
                                    <img alt="Slika Objekta" src={"../../../../../" + this.state.objekat.slikaObjekta} />
                                </div>
                                <div className="col-sm-8">{
                                    //desna strana
                                }
                                    <div className="row font-weight-bold"><h4>{this.state.objekat.naziv}</h4></div> {
                                        //naslov
                                    }
                                    <div className="row"> {
                                        //ocena
                                    }
                                        <div className="font-weight-bold"><span>{this.state.objekat.ocena}</span><span>/10 &nbsp;</span>
                                        </div>
                                        {
                                            (this.state.isAuth == 'true') ?
                                            <div>
                                                <Rating className="rating"
                                                    stop={10}
                                                    placeholderRating={this.state.objekat.ocena}
                                                    emptySymbol={<img alt="" src="http://dreyescat.github.io/react-rating/assets/images/star-grey.png" className="icon" />}
                                                    placeholderSymbol={<img alt="" src="http://dreyescat.github.io/react-rating/assets/images/star-red.png" className="icon" />}
                                                    fullSymbol={<img alt="" src="http://dreyescat.github.io/react-rating/assets/images/star-yellow.png" className="icon" />} 
                                                    onChange={(brojZvezda)=>this.ostaviRecenziju(brojZvezda)} />

                                                         <RecenzijaPopup  
                                                        show={this.state.modalShow}
                                                        onHide={modalClose}
                                                        nazivObjekta={this.state.objekat.naziv}
                                                        brojZv={this.state.brZv}
                                                        ></RecenzijaPopup>
                                                      
                                                        <label>{this.state.ukupnoRecenzija} recenzija</label>
                                                    </div>
                                                :
                                                <p><small>{this.state.ukupnoRecenzija} recenzija</small></p>
                                        }
                                    </div>
                                    <div className="row">
                                        <p className="text-justify">
                                            {this.state.objekat.opis}
                                            {
                                                //opis
                                            }
                                        </p>
                                    </div>
                                    <div className="row">{
                                        //navbar
                                    }
                                            
                                            
                                        {/* <Nav variant="tabs">
                                            <Nav.Item>
                                                <Nav.Link href={"/Objekat/" + this.state.objekat._id + "/kafic"}>Kafic</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link href={"/Objekat/" + this.state.objekat._id + "/recenzija"}>Recenzije</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link href={"/Objekat/" + this.state.objekat._id + "/recenzija"} >
                                                    Meni
                                            </Nav.Link>
                                            </Nav.Item>
                                        </Nav> */}


                                    </div>
                                </div>
                            </div>
                            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" style={{borderColor:"#007bff"}} >
                                            <Tab eventKey="home" title="Rezervacija" style={{padding:"20px"}}>
                                             <Kafic objekat={this.state.objekat} />
                                            </Tab>
                                            <Tab eventKey="recenzija" title="Recenzija" style={{padding:"20px"}}>
                                            <Recenzija objekat={this.state.objekat}></Recenzija>
                                            </Tab>
                                            <Tab eventKey="kontakt" title="Kontakt" style={{padding:"20px"}}>
                                            <Kontakt objekat={this.state.objekat}></Kontakt>
                                            </Tab>
                                            <Tab eventKey="mape" title="Mape" style={{padding:"20px"}}>
                                                <div dangerouslySetInnerHTML={{ __html: this.state.objekat.mapa }}>
                                                </div>
                                            </Tab>
                                        </Tabs>
                        </div>


                        {//sve ok sem sto ne ispisuje ocenu iz nepoznatih razloga i treba se sredi samo "raspored, css tj"
                        }











                        {/* <div className="row" style={{ padding: "10px" }}>

                            <Switch>
                                <Route path="/Objekat/:id/kafic" render={(props) => <Kafic objekat={this.state.objekat} />} />
                                <Route path="/Objekat/:id/recenzija" render={(props) => <Recenzija objekat={this.state.objekat}></Recenzija>} />
                                <Route path="/Objekat/:id" render={(props) => <Kafic objekat={this.state.objekat} />} />
                            </Switch>

                        </div> */}



                    </div>
              
                :
                <div className='spiner'>
                    <Spinner animation="border" variant="primary" />
                </div>

        );
    }
}

function loadScript(url){
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script,index);

}

export default Objekat;

