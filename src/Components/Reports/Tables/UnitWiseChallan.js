import React, { Component } from 'react';

class UnitWiseChallan extends Component {
    render() {
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
                            <th>Mode of payment</th>
                            <th>Bill Amount</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }
}

export default UnitWiseChallan;



