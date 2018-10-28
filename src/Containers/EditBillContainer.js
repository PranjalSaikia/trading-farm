import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import EditBill from '../Components/Biils/EditBill';

class EditBillContainer extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} title="Print Bill" />
                <div className="main-body">

                    <div className="container">
                        <h1>Edit Bill</h1>
                        <hr />
                        <Switch>
                            <Route exact path="/editbill/:id" component={EditBill} />
                        </Switch>

                    </div>






                </div>
            </div>
        )
    }
}

export default withAuth(EditBillContainer);

