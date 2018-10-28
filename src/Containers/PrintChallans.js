import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import PrintView from '../Components/Challan/PrintView';
import ReactToPrint from 'react-to-print';

class PrintChallans extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} title="Print Challan" />
                <div className="main-body">

                    <div className="container">
                        <h1>Print Challan</h1>
                        <hr />
                        <div className="col-md-12" align="center">
                            <ReactToPrint
                                trigger={() => <button className="btn btn-primary btn-sm"><i className="fa fa-print"></i> Print</button>}
                                content={() => this.componentRef}
                            />
                            <Link to="/viewchallan"><button className="btn btn-default btn-sm">Go Back</button></Link>

                        </div>

                        <Switch>
                            <Route exact path="/printchallan/:id" render={(props) => <PrintView {...props} ref={el => (this.componentRef = el)} />} />
                        </Switch>

                    </div>






                </div>
            </div>
        )
    }
}

export default withAuth(PrintChallans);

