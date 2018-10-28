import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import EditChallan from '../Components/Challan/EditChallan';

class EditChallanContainer extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} title="Edit Challan" />
                <div className="main-body">

                    <div className="container">
                        <h1>Edit Challan</h1>
                        <hr />
                        <Switch>
                            <Route exact path="/editchallan/:id" component={EditChallan} />
                        </Switch>

                    </div>






                </div>
            </div>
        )
    }
}

export default withAuth(EditChallanContainer);

