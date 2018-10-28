import React, { Component } from 'react'

class ChallanReportUnit extends Component {
    render() {
        return (
            <div>
                <h2>Challan Report (Unit wise)</h2>
                <hr />
                <table className="table table-bordered">

                    <thead>
                        <tr className="alert-success">
                            <th>#</th>
                            <th>Item Code</th>
                            <th>Particulars</th>
                            <th>Invoice No</th>
                            <th>Challan No</th>
                            <th>From (Name)</th>
                            <th>From (Place)</th>
                            <th>To (Name)</th>
                            <th>To (Place)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }
}

export default ChallanReportUnit;