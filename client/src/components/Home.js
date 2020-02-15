import  React from 'react';
import {Component} from 'react';
import './Home.css';
import Object from './objects/object';
import Spinner from 'react-bootstrap/Spinner'



class Home extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            isUcitano: false,
            isAuth: null,
            tip:"",
            text:""
        }

        this.onTextChanged=this.onTextChanged.bind(this);
        this.testiraj=this.testiraj.bind(this);


// this.soket.emit('zauzeo',(po)=>console.log(po));

    } 


    testiraj(text)
    {
      const regex=new RegExp(`^${this.state.text}`,'i');
      return regex.test(text);
    }

    onTextChanged(e)
    {
      this.setState({text:e.target.value});}

    setAuth = (vred)=>
  {
      // this.forceUpdate();
    this.setState({isAuth: vred});
  }
     componentDidMount()
    {
        fetch('/objects')
        .then(obj=>obj.json())
        .then(obj=>{
            
            this.setState(obj,()=>console.log(this.state));
            this.setState({isUcitano:true});
        });
    }
    render(){
  return (
      (this.state.isUcitano) ?
      <div className="container-fluid">
         <div className="row"> <h2 className="text-uppercase text-left">Lista ugostiteljskih objekata: </h2> </div>
         <div className="row">
           <label>Filter po tipu: </label>
            <select id="filterSelekt" onChange={()=>this.setState({tip: document.getElementById("filterSelekt").value})} className="primary">
              <option value="" >sve</option>
              <option value="Restoran" >restoran</option>
              <option value="Kafic" >kafic</option>
              <option value="Kafana">kafana</option>
              <option value="Pivnica">pivnica</option>
              <option value="Picerija">picerija</option>
            </select>
            </div>
            <div className="row"><label>Pretraga:</label>  
        <div className="AutoCompleteText float-right">  
        <input className="" value={this.state.text} onChange={(e)=>this.onTextChanged(e)} type="text" aria-label="Pretraga"/>
         {/* {this.renderPredloge()}</div>  */}</div>
     

         </div>
            <div className="col" >
            { 
            this.state.objects.map((obj,index)=>
              
            
            (obj.tipObjekta==this.state.tip || this.state.tip=="") &&
            (this.state.text=="" || this.testiraj(obj.naziv)) &&
            <Object 
            isAuth ={this.state.isAuth}
            ocena={Number.parseFloat(obj.ocena.$numberDecimal.toString()).toFixed(2) }
            key={index}//ovo ili ID,
            objekat={obj}
            > 
            
           
            </Object>)
            }
    </div>
    </div>
    :
    <div className='spiner'>
    <Spinner  animation="border" variant="primary" />
    </div>

  
  )

}}

export default Home;

//dete prosledi svoj this metodu koji je dobio od roditelja
//metod roditelja 
