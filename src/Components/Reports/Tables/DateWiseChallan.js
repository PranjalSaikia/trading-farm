import React, { Component } from 'react';

class DateWiseChallan extends Component {
    render() {
        let results = this.props.state;
        let i = [];
        if (results.length > 0) {
            i = results.map((el, index) =>
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.challan_no}</td>
                    <td>{el.date1}</td>
                    <td>{el.truck_no}</td>
                    <td>{el.s_loc}</td>
                    <td>{el.d_loc}</td>
                </tr>
            )
        } else {
            i = <tr>
                <td colSpan="6" align="center">No data in the table</td>
            </tr>
        }
        return (
            <div className="print-container">
                <table className="table table-bordered" width="90%" id="table-to-xls">

                    <thead>
                        <tr className="alert-success">
                            <th>#</th>
                            <th>Challan No</th>
                            <th>Date</th>
                            <th>Truck No</th>
                            <th>Source</th>
                            <th>Destination</th>
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

export default DateWiseChallan;



