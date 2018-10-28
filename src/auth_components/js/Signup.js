import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  Notifications,{notify } from 'react-notify-toast';
import '../css/Login.css';
const APIURL = '/api/new/user/';
class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            emp_no : "",
            name : "",
            designation : "",
            email : "",
            dept_code : ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addUserReq = this.addUserReq.bind(this);
    }
    addUserReq(val) {
        console.log(val);
        fetch(APIURL, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(val)
        })
            .then(resp => {
                console.log(resp)
                if (!resp.ok) {
                    if (resp.status >= 400 && resp.stats < 500) {
                        return resp.json().then(data => {
                            let err = { errorMessage: data.message };
                            notify.show(err.errorMessage, "warning", 2000);
                            throw err;
                        })
                    }
                    else {
                        let err = { errorMessage: "Please try again later" };
                        notify.show('Something went Wrong!!', "warning", 2000);
                        throw err;
                    }
                }
                return resp.json()
            })
            .then((m) => {
                notify.show(m.message, "info", 5000);
                this.setState({
                    emp_no: "",
                    name: "",
                    designation: "",
                    email: "",
                    dept_code: ""
                });
            });
    }
    handleSubmit(e) {
        e.preventDefault();
        notify.show('Form Submitted! Please Wait ....', "success", 2000);
        this.addUserReq({
            emp_no: this.state.emp_no,
            name: this.state.name,
            designation: this.state.designation,
            email: this.state.email,
            dept_code: this.state.dept_code
        })
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            
            <section className="container_create">
                <Notifications />
                <section className="card card_create">
                    <header className="card-content card-header_create">
                        <h2>Indian Oil Corporation Limited</h2>
                        <h3>Request for an Account</h3>
                    </header>
                    <section className="card-content">
                        <div className="card-view">
                            <form 
                                className="card-form card-form_create"
                            >
                                <div className="c-flex">
                                    <input 
                                        type="number" 
                                        placeholder="Employee ID" 
                                        className="input-box" 
                                        value={this.state.emp_no}
                                        autoComplete="off"
                                        onChange={this.handleChange}
                                        name="emp_no"
                                        required
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Designation" 
                                        className="input-box"
                                        value={this.state.designation}
                                        autoComplete="off"
                                        onChange={this.handleChange}
                                        name="designation"
                                        required 
                                    />
                                </div>
                                <p>* Enter your unique ID and designation of your current post</p>
                                <div className="c-flex">
                                    <input 
                                        type="text" 
                                        placeholder="Full Name" 
                                        className="input-box" 
                                        value={this.state.name}
                                        autoComplete="off"
                                        onChange={this.handleChange}
                                        name="name" 
                                        required   
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Department" 
                                        className="input-box" 
                                        value={this.state.dept_code}
                                        autoComplete="off"
                                        onChange={this.handleChange}
                                        name="dept_code"
                                        required
                                    />
                                </div>
                                <input 
                                    type="email" 
                                    placeholder="E-mail address" 
                                    className="input-box" 
                                    value={this.state.email}
                                    autoComplete="off"
                                    onChange={this.handleChange}
                                    name="email"
                                    required
                                />
                                <p>* Enter your current valid email address</p>
                                <div className="c-flex">
                                    <Link to="/login"> <p className="highlight">Sign In instead</p> </Link>
                                    <button onClick={this.handleSubmit} >SUBMIT</button>
                                </div>
                            </form>
                            <div className="create-logo">
                                <img src="logo.png" alt="iocl" width="50%" /><br /><br />
                                <p>Account for Feedback and Webmail</p>
                            </div>
                        </div>
                    </section>
                </section>
                
            </section>
            
        );
    }
}
export default Signup;