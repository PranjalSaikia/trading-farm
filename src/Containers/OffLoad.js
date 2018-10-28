import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import OffLoadForm from '../Components/OffLoad/OffLoadForm';

class OffLoad extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} title="Off Load" />
                <div className="main-body">


                    <div className="container">
                        <h2>Off Load <span className="pull-right"><Link to="/viewchallanoff"><button className="btn btn-primary btn-sm" type="button">View Off Load Challan</button></Link></span></h2>
                        <hr />

                        <OffLoadForm history={this.props.history} />
                    </div>


                </div>
            </div>
        )
    }
}

export default withAuth(OffLoad);