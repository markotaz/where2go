import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const request = require('request');
const io = require('socket.io-client');



class Kafic extends React.Component { 
//saznaj url od soket konektuj
//

    constructor(props) {
        super(props);
        this.state = {
            isUcitano: false,
            objekat: null,
            isAuth: localStorage.getItem('isAuthenticated'),
            stolovi: null
        }
        this.soket = io.connect('http://localhost:5000/',{query:{naziv:this.props.objekat.naziv}});

        this.soket.on('connected',(poruka)=>{

         
    });
    this.soket.on('zakazao',podaci=>{
  
        this.setState({stolovi: podaci.stolovi});  
    });
    this.soket.on('disconnect', (reason) => {
        if (reason === 'io server disconnect') {
          // the disconnection was initiated by the server, you need to reconnect manually
          this.soket.connect();
        }
      
        // else the socket will automatically try to reconnect
      });
// console.log();
        this.rezervisi = this.rezervisi.bind(this);
    }

componentWillUnmount()
{
    this.soket.off('zakazao',podaci=>{
   
        this.setState({objekat: podaci.objekat});  
    });
    this.soket.disconnect();
}
    rezervisi(sto_id) {
    
        request.post("http://localhost:5000/objects/stolovi/rezervisi", {
            json: {
                stoId: sto_id,
                objekatId: this.state.objekat._id
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
    }

    componentDidMount() {

        const id = this.props.objekat._id;
        fetch('/objects/' + id)
            .then(obj => obj.json())
            .then(obj => {
                this.setState({objekat: obj,stolovi:obj.stolovi}, () => console.log("state u kafict", this.state));
                this.setState({ isUcitano: true });
            });
      

    }
    render() {
  
        return (
            (this.state.isUcitano) ?
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-8">

                            {<img src={'../../../' + this.props.objekat.slikaPlanaObjekta} />
                            }
                        </div>
                        <div className="col-sm-4">
                            <div className="row">
                            {(this.state.isAuth == 'true')?
                                <div className="dropdown">
                                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Slobodni stolovi
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        {this.state.stolovi.map((sto, index) =>
                                            (sto.isFree && !sto.isReserved) &&
                                            <button className="dropdown-item" type="button" onClick={()=>this.rezervisi(sto._id)}>Br stola: {index + 1}, broj mesta:
                                     {sto.brojMesta}</button>)
                                        }

                                    </div>
                                </div>
                                :
                                <div>Ulogujte se da bi ste rezervisali sto.</div>
}
                            </div>

                        </div>
                    </div>


                </div>
                :
                <div className='spiner'>
                    <Spinner animation="border" variant="primary" />
                </div>
 
        );
    }
}

export default Kafic;