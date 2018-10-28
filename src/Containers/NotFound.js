import React, { Component } from 'react';
import './css/notfound.css';

class NotFound extends Component {
  render() {
    return (
      <div className="four-body">
      
      
      <div className="image-holder">
                <img src={require('./../assets/minon.png')} alt="minion" />
      </div>

      <div className="text-holder">
        <h1 className="four">404!</h1>
        <h3 className="nnt">Not Found</h3>
      </div>
        
      </div>
    )
  }
}
export default NotFound;