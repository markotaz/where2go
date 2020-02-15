import React from 'react';

import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const request = require('request');
const io = require('socket.io-client');


class KaficAdmin extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isUcitano: false,
            objekat: null,
            isAuth: localStorage.getItem('isAuthenticated'),
            brMesta: 1,
            brStola: 0,
            notifikacija: null
        }
        this.isAdmin = 0;
        this.dodajSto=this.dodajSto.bind(this);
        this.oslobodi = this.oslobodi.bind(this);
        this.zauzmi = this.zauzmi.bind(this);
        this.obrisiSto=this.obrisiSto.bind(this);
        this.soket = io.connect('http://localhost:5000/',{query:{naziv:this.props.objekat.naziv}});
        this.soket.on('zakazao',podaci=>{
        // console.log("Uspesno si zakazao stooo",podaci);
            // this.setState({notifikacija: podaci.stoId});
            var novi = this.props.objekat;
            novi.stolovi = podaci.stolovi;
            if(!this.isAdmin){
         toast("Rezervisan je sto broj "+(this.props.objekat.stolovi.findIndex(el=>el._id === podaci.stoId)+1));
            }else
            this.isAdmin=0;
            novi.ukupnoSlobodnihStolova = podaci.ukupnoSlobodnihStolova;
            this.setState({objekat: novi,stolovi: podaci.stolovi,notifikacija: podaci.stoId});  
        });
        this.soket.on('disconnect', (reason) => {
            if (reason === 'io server disconnect') {
              // the disconnection was initiated by the server, you need to reconnect manually
              this.soket.connect();
            }
          
            // else the socket will automatically try to reconnect
          });
          
    }


    obrisiSto(idSto)
    {
        

        request.delete("http://localhost:5000/objects/stolovi/"+idSto,{
            json: {
                    StoId: idSto,
                    naziv: this.state.objekat.naziv
            }
        }, (err, res, body) => {
            if (err) {
                console.error(err);
                return;
            } else {
              

            }
        });
        this.isAdmin =1;
    }
    dodajSto(brMesta)
    {
       
        request.post("http://localhost:5000/objects/stolovi", {
            json: {
                nazivObjekta: this.state.objekat.naziv,
               
                    brojMesta:brMesta,
                    isFree:true
            }
        }, (err, res, body) => {
            if (err) {
                console.error(err);
                return;
            } else {
                console.log("status kod: ", res.statusCode);
                console.log(body);
            }
        });
        this.isAdmin =1;
    }

    zauzmi(sto_id) {
       
        request.post("http://localhost:5000/objects/stolovi/zauzmi", {
            json: {
                stoId: sto_id,
                objectId: this.state.objekat._id
            }
        }, (err, res, body) => {
            if (err) {
                console.error(err);
                return;
            } else {
                console.log("status kod: ", res.statusCode);
                console.log(body);

            }
        });
        this.isAdmin =1;
    }
    oslobodi(sto_id) {


        request.post("http://localhost:5000/objects/stolovi/oslobodi", {
            json: {
                stoId: sto_id,
                objectId: this.state.objekat._id
            }
        }, (err, res, body) => {
            if (err) {
                console.error(err);
                return;
            } else {
                console.log("status kod: ", res.statusCode);
                console.log(body);

            }
        });

        this.isAdmin =1;
    }
    componentWillMount()
    { 
        this.setState({objekat: this.props.objekat});
    }

    componentWillUnmount()
    {
        
        this.soket.on('zakazao',podaci=>{
            // console.log("Uspesno si zakazao stooo",podaci);
                // this.setState({notifikacija: podaci.stoId});
                var novi = this.props.objekat;
                novi.stolovi = podaci.stolovi;
            
        
                toast("Rezervisan je sto broj"+this.props.objekat.stolovi.findIndex(el=>el._id === podaci.stolovi.stoId)+1);

                novi.ukupnoSlobodnihStolova = podaci.ukupnoSlobodnihStolova;
                this.setState({objekat: novi,stolovi: podaci.stolovi,notifikacija: podaci.stoId});  

            });
        this.soket.disconnect();
    }

    componentDidMount() {

        const id = this.props.objekat._id;
        fetch('/objects/' + id)
            .then(obj => obj.json())
            .then(obj => {
                this.setState({ objekat: obj }, () => console.log("state u kafic", this.state));
                this.setState({ isUcitano: true });
            });
    }
    render() {
        return (
            (this.state.isUcitano) ?
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-8" style={{minWidth:"400px"}}>

                            {<img src={'../../../'+ this.props.objekat.slikaPlanaObjekta} />
                            }
                        </div>
                        <div className="col-sm-4 justify-content-center">
                    <div className="col">
                <div className="row">
                        <div className="row" style={{ padding: "2%" }}>
                                <div className="col">
                                    <label>Broj mesta za sedenje:</label>
                                    <input id="dodajBrMesta" value={this.state.brMesta} 
                                    onChange={(e)=>this.setState({brMesta: e.target.value})}></input>
                                    <button onClick={()=>this.dodajSto(this.state.brMesta)} className="btn-primary">Dodaj sto</button>
                                </div>
                            </div>
                        <div className="row" style={{ padding: "2%" }}>
                            <div className="col">
                                <label>Broj stola za brisanje:</label>
                            <input id="obrisiBrStola"
                            onChange={(e)=>this.setState({brStola: e.target.value})}></input>
                                <button onClick={()=>this.obrisiSto(this.props.objekat.stolovi[this.state.brStola-1]._id)}
                                className="btn-primary">Obrisi sto</button>
                            </div>
                        </div>
                    </div>
                </div>
                            <div className="row justify-content-center" style={{ padding: "2%" }}>
                                <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Oslobodi sto
                                                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        {this.props.objekat.stolovi.map((sto, index) =>
                                            (!sto.isFree && !sto.isReserved) &&
                                            <button class="dropdown-item" type="button"
                                                onClick={() => this.oslobodi(sto._id)}>Br stola: {index + 1}, broj mesta:
                                                                                {sto.brojMesta}</button>)
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center" style={{ padding: "2%" }}>
                                <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Zauzmi sto
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        {this.props.objekat.stolovi.map((sto, index) =>
                                            (sto.isFree && !sto.isReserved) &&
                                            <button class="dropdown-item" type="button"
                                                onClick={() => this.zauzmi(sto._id)}>Br stola: {index + 1}, broj mesta:
                                                                            {sto.brojMesta}</button>)
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center" style={{ padding: "2%" }}>
                                <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                       Rezervisani:
                                                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        {this.props.objekat.stolovi.map((sto, index) =>
                                            (sto.isReserved) &&
                                            <button class="dropdown-item" type="button"
                                                onClick={() => this.oslobodi(sto._id)}>Br stola: {index + 1}, tajmer:
                                                                            {sto.brojMesta}</button>)
                                        }
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <ToastContainer />

                </div>

                :
               <div className='spiner'>
                    <Spinner animation="border" variant="primary" />
                </div>


        );
    }
}

export default KaficAdmin;