import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import TrackingItemCode from '../Components/Tracking/TrackingItemCode';
import TrackingChallanNo from '../Components/Tracking/TrackingChallanNo';
import TrackingBillNo from '../Components/Tracking/TrackingBillNo';

class Tracking extends Component {
  render() {
    return (
      <div>
        <Navbar history={this.props.history} title="Tracking"/>
        <div className="main-body">

            <div className="container-fluid">

                    <ul className="nav nav-tabs">
                        <li><NavLink to="/tracking/itemcode" activeStyle={{ fontWeight: 'bold', color: 'violet'}}>Item Code</NavLink></li>
                        <li><NavLink to="/tracking/billno" activeStyle={{ fontWeight: 'bold', color: 'violet'}}>Bill No</NavLink></li>
                        <li><NavLink to="/tracking/challanno" activeStyle={{ fontWeight: 'bold', color: 'violet'}}>Challan No</NavLink></li>
                    </ul>

                    <div className="container">
                    <br/>
                        <Switch>
                            <Route name="trackingitem" path="/tracking/itemcode" component={TrackingItemCode} />
                            <Route name="trackingitem" path="/tracking/billno" component={TrackingBillNo} />
                            <Route name="trackingitem" path="/tracking/challanno" component={TrackingChallanNo} />
                        </Switch>
                    </div>

                    
            </div>
          

         
        
        </div>
      </div>
    )
  }
}

export default withAuth(Tracking);