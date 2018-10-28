import React, { Component } from 'react';
import { PostData } from './../api/service';
import Notifications, { notify } from 'react-notify-toast';


const error = {
    color: 'red'
}

export default class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                oldpassword: '',
                newpassword: '',
                confirmpassword: ''
            },
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this._validation = this._validation.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        const data = this.state.fields;
        if(this._validation()){
            PostData('api/change_password.php',data)
            .then(function(resp){
                if(resp.status === '200'){
                    notify.show(resp.data,"success", 3000);
                    
                }else{
                    notify.show(resp.data, "error", 3000);
                }
            }).catch(err=> {
                notify.show('Something went wrong', 'error', 3000);
            });

            this.setState({
                fields: {
                    oldpassword: '',
                    newpassword: '',
                    confirmpassword: ''
                }
            })
        };
    }

    onChange(field,e){
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    _validation(){
        let errors = [];
        let isValid = false;
        let fields = this.state.fields;
        
        if(fields['newpassword'] === fields['confirmpassword']){
            isValid = true;
        }else{
            isValid = false;
            errors['confirmpassword'] = "Password doesn't matched!!";
        }

        this.setState({errors});
        return isValid;
    }

    
    
  render() {
    return (
      <div>
          <Notifications />
            <form
                className="form"
                onSubmit={this.onSubmit}
            >

                <div className="form-group">
                    <label>Old Password</label>
                    <input
                        className="form-control"
                        name="oldpassword"
                        placeholder="Type your old password here"
                        onChange={this.onChange.bind(this, 'oldpassword')}
                        value={this.state.fields['oldpassword']}
                        
                    />
                </div>



                <div className="form-group">
                    <label>New Password</label>
                    <input
                        className="form-control"
                        name="newpassword"
                        placeholder="New Password "
                        onChange={this.onChange.bind(this,'newpassword')}
                        value={this.state.fields['newpassword']}
                        required={true}
                    />
                </div>



                <div className="form-group">
                    <label>Confirm New Password <span style={error}>{this.state.errors["confirmpassword"]}</span></label>
                    <input
                        className="form-control"
                        name="confirmpassword"
                        placeholder="Confirm Password"
                        onChange={this.onChange.bind(this,'confirmpassword')}
                        value={this.state.fields['confirmpassword']}
                        required={true}
                    />
                </div>


                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
      </div>
    )
  }
}
