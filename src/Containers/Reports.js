import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import BillReportDate from '../Components/Reports/BillReportDate';
import BillReportCustomer from '../Components/Reports/BillReportCustomer';
import ChallanReportDate from '../Components/Reports/ChallanReportDate';

class Reports extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} title="Reports" />
                <div className="main-body">

                    <div className="container-fluid">

                        <ul className="nav nav-tabs">
                            <li><NavLink to="/reports/billd" activeStyle={{  color: 'violet' }}>Bill Report (Date wise)</NavLink></li>
                            <li><NavLink to="/reports/billc" activeStyle={{  color: 'violet' }}>Bill Report (Customer wise)</NavLink></li>
                            <li><NavLink to="/reports/challand" activeStyle={{  color: 'violet' }}>Challan Report (Date wise)</NavLink></li>
                            
                        </ul>

                        <div className="container">
                            <br />
                            <Switch>
                                <Route name="reportbilld" path="/reports/billd" component={BillReportDate} />
                                <Route name="reportbillc" path="/reports/billc" component={BillReportCustomer} />
                                <Route name="reportchalland" path="/reports/challand" component={ChallanReportDate} />
                                
                            </Switch>
                        </div>


                    </div>




                </div>
            </div>
        )
    }
}

export default withAuth(Reports);