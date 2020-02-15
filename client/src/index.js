import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Row from 'react-bootstrap/Row';

import AdminHeader from './components/AdminHeader';
// import { ToastContainer } from 'react-toastify';

ReactDOM.render(
<BrowserRouter>

<div className="App" style={{paddingTop:"55px"}}>
    
      <Switch>
        <Route path="/admin" component={AdminHeader}/>
        <Route exact path="/"  component={Header}/>}/>
        <Route  path="/adminObjekta"  component={AdminHeader}/>}/>
<Route path="/about" component={Header}/>
<Route path="/Objekat/:id" component={Header}/> 
<Route component={Header}/> 


      </Switch>
        
    
      <main>
        <Row className="red">
    
        <div className="col-lg-3 d-none d-lg-block">
            
         
            <div className="reklama-container" >
              <a href="https://www.coca-cola.rs/sr/home/">
              <img alt='reklama' src="https://i.pinimg.com/474x/35/c9/b5/35c9b5b1a63d211b5f8c75e2b2277d1a--vintage-signs-vintage-ads.jpg"
               className="img-responsive" style={{maxWidth:"245px",paddingBottom:"10px"}}/></a>
            </div>
    
        
     
    
            <div  className="reklama-container" >
            <a href="https://www.mi-srbija.rs/">
              <img alt='reklama' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/768px-Xiaomi_logo.svg.png"
               className="img-responsive" style={{maxWidth:"245px",paddingBottom:"10px"}}/></a>
              
            </div>
  
         
    
          </div>
  
          

          <div  className="col-lg-6">
          
        <App />
        
        </div>
          <div  className="col-lg-3 d-none d-lg-block">
            
            
            <div className="reklama-container">
            <a href="https://www.adidas.com/us">
              <img alt='reklama' src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/98002629127133.55e41cf123b77.jpg"
               className="img-responsive" style={{minWidth:"180px",maxWidth:"245px",paddingBottom:"10px"}}/></a>
            </div>
            <div className="reklama-container">
              <a href="https://www.heineken.com/rs">
              <img alt='reklama' src="https://i.pinimg.com/564x/f4/ee/14/f4ee1490ee0bbc43e7189e2153b9e666.jpg"
               className="img-responsive" style={{minWidth:"180px",maxWidth:"245px",paddingBottom:"10px"}}/></a>
            </div>
            
            </div>
        </Row>
      </main>
      <footer>
        <Footer/>
      </footer>

    </div>
    </BrowserRouter>


, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
