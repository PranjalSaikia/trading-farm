import React, { Component } from 'react';
import './loader.css';

class Loader extends Component {
  render() {
      if(this.props.show){
          return (
              <div className="loader">
                  <div className="loader-text">
                      <i className="fa fa-spinner fa-spin"></i> {this.props.text}
        </div>
              </div>
          )
      }else{
          return null;
      }
    
  }
}

export default Loader;