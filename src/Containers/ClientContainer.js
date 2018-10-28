import React, { Component } from 'react';
import ClientCard from './../Components/ClientCard';

class ClientContainer extends Component {
  render() {
    return (
      <div>
          <div className="row">
            <div className="col-md-2">
                <ClientCard />
            </div>

                <div className="col-md-2">
                    <ClientCard />
                </div>
          </div>
        
      </div>
    )
  }
}

export default ClientContainer;
