import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { SocialIcon } from 'react-social-icons';
const request = require('request');

class Kontakt extends Component{
    constructor(props) {
        super(props);
        this.state={
            objekat:null,
            sender:"",
            subject:"",
            text:"",    
            isUcitano: false
        }
        this.handleChange=this.handleChange.bind(this);
        // this.onHandleSubmit=this.onHandleSubmit.bind(this);
    }

    handleChange(e)
    {
        this.setState({[e.target.name]: e.target.value})
    }



componentWillMount()
{

    this.setState({objekat:this.props.objekat,isUcitano: true});
   
}

    render(){
        return(
            (this.state.isUcitano)?
<div className="container-fluid">
    
            <Form method="POST" action="http://localhost:5000/objects/send-mail" style={{borderBottom:"solid 1px #007bff", marginBottom:"2%"}}>
                <FormGroup >
                <label for="ime">naslov:</label>
                <Input type="text" name="subject" onChange={(e)=>this.handleChange(e)} />
                </FormGroup>

                <FormGroup >
                <label for="email">vas email:</label>
                <Input type="email" name="sender" onChange={(e)=>this.handleChange(e)} />
                </FormGroup>


                <FormGroup >
                <label for="poruke">poruka:</label>
                <Input type="textarea" name="text" onChange={(e)=>this.handleChange(e)} />
                </FormGroup>




                <Button type="submit" style={{backgroundColor:"#007bff",color:"white"}}>Posalji</Button>



            </Form>

            <div className="row" style={{marginTop:"10px"}}>
                <div className="col 9">
                <div className="row">
                    <div className="col 2">
                    <div className="row">
                        {(this.state.objekat.kontakti.facebook!=="#")&&
                <div className="col"><SocialIcon url={this.state.objekat.kontakti.facebook}/></div>
                  }
                   { (this.state.objekat.kontakti.instagram!=="#")&&
                <div className="col"><SocialIcon url={this.state.objekat.kontakti.instagram} /></div>
                  }
                </div></div>

                <div className="col 10"><div className="row align-bottom"><label>Telefon: {this.state.objekat.kontakti.telefon}</label></div></div>
                </div>
                </div><div className="col 3"></div>
            </div>
{/*{}
{this.state.objekat.kontakti.instagram}
{this.state.objekat.kontakti.telefon}
*/}
</div>
:
<p></p>

        );
    }
}

export default Kontakt;



