import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import BarContainer from './../Components/BarContainer';
import BarcodePrinter from './BarcodePrinter';

class BarcodeConatiner extends Component {
    
    
  render() {
    return (
      <div>
        <Navbar history={this.props.history} title="BARCODES"/>
        <div className="main-body">

       
  

          <Switch>
                <Route exact path="/barcode" component={BarContainer} />
                <Route exact path="/barcode/:id/:st" component={BarcodePrinter} />
          </Switch>

         
        
        </div>
      </div>
    )
  }
}

export default withAuth(BarcodeConatiner);
