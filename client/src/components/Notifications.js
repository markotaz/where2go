
import React from 'react';
import Component from 'react';
import styled from 'styled-components';
import ee from 'event-emiter';

const emiter=new ee();

export const notify=(msg){
    emiter.emit("notification",msg);
}
const Container = styled.div`

        background-color: #444;
        color:white;
        padding:16px;
        position:absolute;
        top: 16px;
        roght:16px;
        z-index:999;
        transition: top 0.5s ease;

        >i:{
            margin-left:8px;
        }
`;

class Notifications extends Component{
    constructor(props){
        super(props);
        this.state= {
            top:-100,

        };
        this.setTimeout=null;
    }
    onShow= ()=>{
        if(this.timeout){
            clearTimeouTimeout(this.timeout);
            this.setState({top:-100}), ()=>
            {
                this.timeout=this.setTimeout(()=>{
                    this.showNotification();
                })
            }
        }
    }
    showNotification= () =>{
        this.setState({top:16},()=>{
            setTimeout(()=>{
                this.setState({top:-100})
            },3000);   
        });

    }
    render(){
        return(
            <Container top={this.state.top}>notifikacija <i className="fa fa-bell"></i></Container>
            

        );
    }


}

export default Notifications;