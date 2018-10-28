import React, { Component } from 'react'

class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            truck_no: this.props.truck,
            date_of_payment: '',
            particulars: '',
            amount_paid: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.state;
        //post the data
    }

    render() {
        return (
            <div className="bgcornyellow">
                <h3>Initiate Payment</h3>
                <h6>Truck No: {this.state.truck_no}</h6>
                <hr />
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Date of Payment</label>
                        <input
                            className="form-control input-sm"
                            placeholder="Date of payment"
                            type="date"
                            name="date_of_payment"
                            onChange={this.handleChange}
                            value={this.state.date_of_payment}
                        />
                    </div>

                    <div className="form-group">
                        <label>Particulars</label>
                        <textarea
                            className="form-control input-sm"
                            placeholder="Particulars . . . ."
                            name="particulars"
                            onChange={this.handleChange}
                            value={this.state.particulars} ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Amount Paid</label>
                        <input
                            className="form-control input-sm"
                            placeholder="Amount Paid"
                            name="amount_paid"
                            onChange={this.handleChange}
                            value={this.state.amount_paid}
                        />
                    </div>

                    <div className="form-group">

                        <button type="submit" className="btn btn-sm btn-danger">Make Payment</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default PaymentForm;