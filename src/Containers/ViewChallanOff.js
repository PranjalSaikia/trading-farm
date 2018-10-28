import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import ViewChallanTable from '../Components/OffLoad/ViewChallanTable';

class viewChallanOff extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} title="BILLS" />
                <div className="main-body">


                    <div className="container">
                        <h2>Challan View (off Load)<span className="pull-right"><Link to="/offloading"><button className="btn btn-primary btn-sm" type="button">Off Loading</button></Link></span></h2>
                        <hr />

                        <ViewChallanTable />
                    </div>


                </div>
            </div>
        )
    }
}

export default withAuth(viewChallanOff);