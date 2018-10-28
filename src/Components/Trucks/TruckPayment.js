import React, { Component } from 'react'
import PaymentForm from './PaymentForm';
import TransactionTable from './TransactionTable';

class TruckPayment extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
            <PaymentForm truck={this.props.match.params.id} />
        </div>

        <div className="col-md-6">
            <TransactionTable truck={this.props.match.params.id} />
        </div>
      </div>
    )
  }
}

export default TruckPayment;