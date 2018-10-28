import React, { Component } from 'react';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import ChangePasswordForm from '../Components/ChangePasswordForm';

class ChangePassword extends Component {
  render() {
    return (
      <div>
        <Navbar history={this.props.history}/>
        <div className="main-body">

       
          <div className="container">

            <h1>Change Password</h1>
            <hr />

            <ChangePasswordForm />

          </div>

         
        
        </div>
      </div>
    )
  }
}

export default withAuth(ChangePassword);