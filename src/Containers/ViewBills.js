import React, { Component } from 'react';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import ViewBillTable from '../Components/Biils/ViewBillTable';

class ViewBills extends Component {
  render() {
    return (
      <div>
        <Navbar history={this.props.history} title="View Bills"/>
        <div className="main-body">

        <div className="container">
            <h1>Bills</h1>
            <hr/>
            <ViewBillTable />

        </div>
          
         
        
        </div>
      </div>
    )
  }
}

export default withAuth(ViewBills);