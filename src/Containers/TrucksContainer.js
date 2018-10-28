import React, { Component } from 'react';
import { Link,Switch, Route } from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import TruckList from '../Components/Trucks/TruckList';
import TruckPayment from '../Components/Trucks/TruckPayment';

class TrucksContainer extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} title="Trucks" />
                <div className="main-body">


                    <div className="container">
                        <h2>Trucks <span className="pull-right"><Link to="/trucks"><button className="btn btn-sm">Go to Trucks</button></Link></span></h2>
                        <hr />
                        <Switch>
                            <Route name="trucks" exact path="/trucks" component={TruckList} />
                            <Route name="truckspayment" path="/trucks/details/:id" component={TruckPayment} />
                        </Switch>
                    </div>


                </div>
            </div>
        )
    }
}

export default withAuth(TrucksContainer);