import React, { Component } from 'react';
import withAuth from './../auth_components/js/withAuth';
import { GetData } from './../api/service';

class FetchingH extends Component {
    constructor(Props) {
        super(Props);
        this.state = {
            data: {}
        }
    }
    
    componentDidMount(){
        GetData('api/hey.php')
        .then((resp) => 
            {this.setState({data: resp})}
        );
    }
  render() {
    return (
      <div>
        fetch
      </div>
    )
  }
}

export default withAuth(FetchingH);