import React, { Component } from 'react';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import { GetData } from './../api/service';
import fileDownload from 'js-file-download';

class Backup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      error: ''
    }

    this.handleChange = this.handleChange.bind(this);
    
  }
  
  onButtonClick(){

    let password = this.state.password;
    if(password === 'backmeup'){
      GetData('api/backup.php')
        .then((resp) => {
          fileDownload(resp.data, 'filename.sql');
          this.setState({
            password: ''
          })
        });
    }else{
      this.setState({
        error: 'Please enter the correct password before continue',
        password: ''
      })
    }

    
  }

  handleChange(e){
    this.setState({
      password: e.target.value
    })
  }


  render() {
    return (
      <div>
        <Navbar history={this.props.history}/>
        <div className="main-body">

       
          <div className="container">

              <h1>Backup Database</h1>
              <hr/>

              <p>Enter password and before continue. Please contact your administrator if you don't have it.</p>

              <div style={{color: 'red', fontSize: '0.9em', fontWeight: 'bold'}}> {this.state.error} </div>
              <input 
                  type="password"
                  className="form-control"
                  placeholder="Password for backup"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
                <br/>
              <button 
                    className="btn btn-primary"
                    onClick={this.onButtonClick.bind(this)}
                    ><i className="fa fa-download"></i> Backup Database</button>

          </div>

         
        
        </div>
      </div>
    )
  }
}

export default withAuth(Backup);