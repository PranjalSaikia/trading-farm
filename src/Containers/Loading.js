import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import ChallanForm from '../Components/Challan/ChallanForm';

class Loading extends Component {
  render() {
    return (
      <div>
        <Navbar history={this.props.history} title="BILLS"/>
        <div className="main-body">

       
          <div className="container">
            <h2>Lorry Challan Generation <span className="pull-right">

              <Link to="/trucks"><button className="btn btn-primary btn-sm" type="button">Trucks</button></Link> &nbsp;
              <Link to="/viewchallan"><button className="btn btn-primary btn-sm" type="button">View Challan</button></Link>
            
            </span></h2>
            <hr/>

            <ChallanForm history={this.props.history}/>
          </div>
         
        
        </div>
      </div>
    )
  }
}

export default withAuth(Loading);