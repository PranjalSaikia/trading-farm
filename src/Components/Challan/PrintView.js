import React, { Component } from 'react';
import { PostData } from './../../api/service';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



class PrintView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: {},
            invoiceDet: [],
            isLoading: false
        }
    }

    componentDidMount() {
        let challan_no = this.props.match.params.id;
        const data = {
            "challan_no": challan_no
        }
        PostData('api/get_single_data_challan.php', data)
            .then((resp) => {

                if (resp.status === "200") {
                    this.setState({
                        invoice: resp.data[0][0],
                        invoiceDet: resp.data[1]
                    });
                } else {
                    confirmAlert({
                        title: 'No challan found!!',
                        message: 'Go back to the challans',
                        buttons: [
                            {
                                label: 'Yes',
                                onClick: () => this.props.history.replace('/viewchallans')
                            }
                        ]
                    })
                }


            })
    }

    render() {
        let invoice_det = this.state.invoiceDet
        let i = invoice_det.map((det) =>
            <tr key={det.item_code}>
                <td>{det.item_code}</td>
                <td>{det.qty}</td>
                <td>{det.unit}</td>
                <td>{det.parti}</td>
                <td>{det.wt}</td>
                <td>{det.wtc}</td>
            </tr>
        )
        return (
            <div>




                <div style={{ margin: '20px' }}>
                    <table width="100%">
                        <tr>
                            <td align="center"><h3>Trading Farm / Challan</h3></td>
                        </tr>
                        <tr>
                            <td align="center">Office Address</td>
                        </tr>
                        <tr>
                            <td align="center">Email Address, Phone No</td>
                        </tr>
                    </table>
                    <hr />
                    <table width="100%">
                        <tr>
                            <td>Challan No: <b>{this.state.invoice.challan_no}</b></td>
                            <td align="right">Date <b>{this.state.invoice.date1}</b></td>
                        </tr>
                    </table>
                    <hr />
                    <table width="100%">
                        <tr>
                            <td>
                                <h4>Source</h4>
                                <h4>{this.state.invoice.source}</h4>
                            </td>

                            <td align="right">
                                <h4>Destination</h4>
                                <h4>{this.state.invoice.destination}</h4>
                            </td>
                        </tr>
                    </table>
                    <hr />
                    <table width="100%" className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Item Code</th>
                                <th>Qty</th>
                                <th>Unit</th>
                                <th>Particulars</th>
                                <th>Actual Weight</th>
                                <th>Weight Charged</th>
                            </tr>
                        </thead>
                        <tbody>
                            {i}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default PrintView;