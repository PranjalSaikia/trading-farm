import React, { Component } from 'react';

class DateWiseBill extends Component {
  render() {
    let results = this.props.state;
    let i = [];
    if (results.length > 0) {
      i = results.map((el, index) =>
        <tr key={index}>
          <td>{ index + 1 }</td>
          <td>{el.inv_no}</td>
          <td>{el.date1}</td>
          <td>{el.cons_name}</td>
          <td>{el.cons_gstin}</td>
          <td>{el.cons_state}</td>
          <td>{el.cons_place}</td>
          <td>{el.cone_name}</td>
          <td>{el.cone_gstin}</td>
          <td>{el.cone_state}</td>
          <td>{el.cone_place}</td>
          <td>{el.mop_name}</td>
          <td>{el.gtot}</td>
          
        </tr>
      )
    } else {
      i = <tr>
        <td colSpan="12" align="center">No data in the table</td>
      </tr>
    }
    return (
      <div className="print-container">
        <table className="table table-bordered" width="90%" id="table-to-xls">

                <thead>
                    <tr className="alert-success">
                        <th>#</th>
                        <th>Bill No</th>
                        <th>Date</th>
                        <th>Consignor Name</th>
                        <th>Consignor Gstin</th>
                        <th>Consignor State</th>
                        <th>From (Place)</th>
                        <th>Consignee Name</th>
                        <th>Consignee Gstin</th>
                        <th>Consignee State</th>
                        <th>To (Place)</th>
                        <th>Mode of payment</th>
                        <th>Bill Amount</th>
                    </tr>
                </thead>
                <tbody>
                  {i}
                </tbody>
            </table>
      </div>
    )
  }
}

export default DateWiseBill;



