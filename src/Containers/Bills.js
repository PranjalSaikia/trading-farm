import React, { Component } from 'react';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import BillsForm from '../Components/Biils/BillsForm';

class Bills extends Component {
  render() {
    return (
      <div>
        <Navbar history={this.props.history} title="BILLS"/>
        <div className="main-body">

       
          <div className="container">
            <h2>Bill Generation</h2>
            <hr/>
            <BillsForm history={this.props.history}/>
          </div>
         
        
        </div>
      </div>
    )
  }
}

export default withAuth(Bills);