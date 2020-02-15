import React from 'react';
import Rating from 'react-rating';
const io = require('socket.io-client');

class Recenzija extends React.Component {
constructor(props)
{
super(props);
this.state={
objekat: null

}
this.soket = io.connect('http://localhost:5000/',{query:{naziv: "recenzije"}});



}
componentDidMount()
{
var objekat = this.state.objekat;


    this.soket.on('dodata-recenzija',(podaci)=>{
        console.log("Uspesno si zakazao sto");
        objekat.recenzije = podaci.recenzije;
        this.setState({objekat: objekat});  
    });
    
}
componentWillUnmount()
{
    var objekat = this.state.objekat;
    this.soket.off('dodata-recenzija',(podaci)=>{
        console.log("Uspesno si zakazao sto");
        objekat.recenzije = podaci.recenzije;
    });
    this.soket.disconnect();
}

    componentWillMount() {
this.setState({objekat: this.props.objekat });

    }
    render() {
       
        var re;
        return (
            <div className="container-fluid" >

                {
                    this.state.objekat.recenzije.map(rec => (

                        <div key={rec._id} className="col-sm-12 text-left" style={{borderBottom: "solid #007bff 1px", paddingTop:"3px", paddingBottom: "3px" }}>

                            
                            <div className="row">
                            <h5>  
                            {
                                (rec.ime) ?

                                re = rec.ime

                                :
                                re = "noname"}
                            </h5>
                            </div>
                            <div className="row"> 
                            <label>{rec.opis}</label> 
                            </div>
                           <div className="row">
                           <span>{rec.ocena}</span><span>/10</span>
                           <Rating className="rating"
                            readonly
                            stop={10}
                            placeholderRating={rec.ocena}
                            emptySymbol={<img alt="" src="http://dreyescat.github.io/react-rating/assets/images/star-grey.png" className="icon" />}
                            placeholderSymbol={<img alt="" src="http://dreyescat.github.io/react-rating/assets/images/star-red.png" className="icon" />}
                            fullSymbol={<img alt="" src="http://dreyescat.github.io/react-rating/assets/images/star-yellow.png" className="icon" />} />
                            </div>
                        </div>
                    ))
                }
            </div>
        );
            
}

}
export default Recenzija;