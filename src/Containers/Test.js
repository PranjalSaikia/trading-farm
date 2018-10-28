import React, { Component } from 'react'

export default class Test extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            test: []
        }
    }

    componentDidMount(){
        fetch('http://test.corexx.in/test/test.php',
        {
            'method': 'GET',
            'headers': new Headers({
                'Content-Type': 'application/json'
            })
        }).then((resp) => resp.json())
        .then((resp) => {
            console.log(resp);
        })
    }
    
  render() {
    return (
      <div>
        Test
      </div>
    )
  }
}
