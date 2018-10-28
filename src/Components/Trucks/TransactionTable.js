import React, { Component } from 'react'

class TransactionTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            truck_no: this.props.truck,
            payment: [],
            isLoading: true
        }
    }

    componentDidMount(){
        //post truck no to get the data
    }
    
  render() {
    return (
      <div className="bglight">
            <div className="print-buttons">
                <button className="btn btn-sm"><i className="fa fa-print"></i></button> &nbsp;
                <button className="btn btn-sm"><i className="fa fa-file-excel-o"></i></button>
            </div>
            <h3>Transaction History</h3>
            <h6>Truck No: {this.state.truck_no}</h6>
            <hr/>

            1. Challan Generated: Rs. 10000.00<br/>
            2. Challan Advance Payment: Rs. 5000.00
            <br/>
            --------------------------------------------------
      </div>
    )
  }
}

export default TransactionTable;