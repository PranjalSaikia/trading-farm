import React, { Component } from 'react';
import './clientcard.css';

class ClientCard extends Component {
  render() {
    return (
      <div className="client-card">
        <div className="client-top-header">
            
        </div>
        
        <div className="client-card-body">
            Client ID: 1<br/>
            Company Name: Corexx Inc.<br />
            Concerned Person: Mr. Chandan Jyoti Nath<br />
            Address: Jalukbari Masijid<br />
            Email: info@corexx.in<br />
            Phone: +91-88763-71354<br/>
        </div>
        <hr/>
        <div className="client-card-footer">
            
        </div>
      </div>
    )
  }
}

export default ClientCard;