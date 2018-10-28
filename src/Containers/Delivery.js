import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import DeliveryItemCode from '../Components/Delivery/DeliveryItemCode';
import DeliveryBillNo from '../Components/Delivery/DeliveryBillNo';
import DeliveryTable from '../Components/Delivery/DeliveryTable';

class Delivery extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} title="Delivery" />
                <div className="main-body">

                    <div className="container-fluid">

                        <ul className="nav nav-tabs">
                            <li><NavLink to="/delivery/itemcode" activeStyle={{ fontWeight: 'bold', color: 'violet' }}>Item Code</NavLink></li>
                            <li><NavLink to="/delivery/billno" activeStyle={{ fontWeight: 'bold', color: 'violet' }}>Bill No</NavLink></li>
                            <li><NavLink to="/delivery/viewall" activeStyle={{ fontWeight: 'bold', color: 'violet' }}>View All</NavLink></li>
                        </ul>

                        <div className="container">
                            <br />
                            <Switch>
                                <Route name="trackingitem" path="/delivery/itemcode" component={DeliveryItemCode} />
                                <Route name="trackingitem" path="/delivery/billno" component={DeliveryBillNo} />
                                <Route name="trackingitem" path="/delivery/viewall" component={DeliveryTable} />
                            </Switch>
                        </div>


                    </div>




                </div>
            </div>
        )
    }
}

export default withAuth(Delivery);