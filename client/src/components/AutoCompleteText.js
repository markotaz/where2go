import React from 'react';
import './Footer.css';
import {Component} from "react";
import './AutoCompleteText.css';


class AutoCompleteText extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            objekti:[
                "night and day",
               "nemir",
               "vespa"
            ],
            predlozi:
            [

            ],
            text:""
            
        }
        this.onTextChanged=this.onTextChanged.bind(this);
        this.renderPredloge=this.renderPredloge.bind(this);
    } 


    onTextChanged(e)
    {
        const value=e.target.value;
        let suggestions=[];
        if(value.length>0){
            const regex=new RegExp(`^${value}`,'i');
            console.log("pozvan regex", regex);
            suggestions= this.state.objekti.sort().filter(v=>regex.test(v));
        }
        this.setState({predlozi: suggestions,text:value});
        console.log("nista");
    }
suggestionSelected (value){
    this.setState({text:value,predlozi:[]});
}

    renderPredloge(){
        if(this.state.predlozi.length===0)
        {
            console.log("pozvan");
            return null;
        }
        console.log("pozvan dole",this.state.predlozi);
        return(
            <ul>
            {this.state.predlozi.map((obj)=><li onClick={()=>this.suggestionSelected(obj)}>{obj}</li>)}
            </ul>

        );
       
    }
  
    
  render (){
    return (

        <div className="AutoCompleteText">
               <input value={this.state.text} onChange={(e)=>this.onTextChanged(e)} type="text"/>
              {this.renderPredloge()}
        </div>
  );
}

}

export default AutoCompleteText;
