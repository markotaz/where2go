import React from 'react';
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Rating from 'react-rating';


import Spinner from 'react-bootstrap/Spinner'

import KaficAdmin from "./KaficAdmin";
import Recenzija from "./Recenzija";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import {Tabs, Tab} from "react-bootstrap";

class AdminObjekat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUcitano: false,
            objekat: null,
            isAuth: localStorage.getItem('isAuthenticated')
        }
        console.log("ovooo", this.state)
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch('/objects/' + id)
            .then(obj => obj.json())
            .then(obj => {

                this.setState({ objekat: obj }, () => console.log(this.state));
                this.setState({ isUcitano: true });
                this.setState({ ocena: Number.parseFloat(this.state.objekat.ocena.$numberDecimal.toString()).toFixed(2) });
            });
    }

  
    render() {
       
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
                                    <img src={"../../../../../" + this.state.objekat.slikaObjekta} />
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
                                        <div className="font-weight-bold"><span>{this.state.ocena}</span><span>/10</span>
                                        </div>
                                        {
                                           
                                            <div>
                                                <Rating className="rating"
                                                    readonly
                                                    stop={10}
                                                    placeholderRating={this.state.ocena}
                                                    emptySymbol={<img src="http://dreyescat.github.io/react-rating/assets/images/star-grey.png" className="icon" />}
                                                    placeholderSymbol={<img src="http://dreyescat.github.io/react-rating/assets/images/star-red.png" className="icon" />}
                                                    fullSymbol={<img src="http://dreyescat.github.io/react-rating/assets/images/star-yellow.png" className="icon" />} 
                                                     />

                                                   
                                                    </div>
                                               
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
                               
                                </div>
                            



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


                                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" style={{borderColor:"#007bff"}} >
                                            <Tab eventKey="home" title="Rezervacija" style={{paddingTop:"2%"}}>
                                             <KaficAdmin objekat={this.state.objekat} />
                                            </Tab>
                                            <Tab eventKey="recenzija" title="Recenzija" >
                                            <Recenzija objekat={this.state.objekat}></Recenzija>
                                            </Tab>
                                           
                                        </Tabs>


                    </div>
                    {/* <ToastContainer/> */}
              </div>
                :
                <div className='spiner'>
                    <Spinner animation="border" variant="primary" />
                </div>

        );
    }
}

export default AdminObjekat;

