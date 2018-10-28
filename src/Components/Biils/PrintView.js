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
        let inv_no = this.props.match.params.id;
        const data = {
            "inv_no": inv_no
        }
        PostData('api/get_single_data.php', data)
            .then((resp) => {

                if (resp.status === "200") {
                    this.setState({
                        invoice: resp.data[0],
                        invoiceDet: resp.data[1]
                    });
                } else {
                    confirmAlert({
                        title: 'No invoice found!!',
                        message: 'Go back to the bills',
                        buttons: [
                            {
                                label: 'Yes',
                                onClick: () => this.props.history.replace('/viewbills')
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
                <td>{det.rate}</td>
                <td>{det.amount}</td>
            </tr>
        )
        return (
            <div>




                <div style={{ margin: '20px' }}>
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td align="center"><h3>Trading Farm</h3></td>
                            </tr>
                            <tr>
                                <td align="center">Office Address</td>
                            </tr>
                            <tr>
                                <td align="center">Email Address, Phone No</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td>C/Note No: <b>{this.state.invoice.inv_no}</b></td>
                                <td align="center">Date <b>{this.state.invoice.date1}</b></td>
                                <td align="right">Payment Mode: <b>{this.state.invoice.mop_name}</b></td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <h4>Consigor</h4>
                                    <p>{this.state.invoice.cons_name}</p>
                                    <p>GSTIN: {this.state.invoice.cons_gstin} State: {this.state.invoice.cons_state}</p>
                                    <p>Contact: {this.state.invoice.cons_contact}</p>
                                    <h5><b>Place: {this.state.invoice.cons_place}</b></h5>
                                </td>

                                <td>
                                    <h4>Consignee</h4>
                                    <p>{this.state.invoice.cone_name}</p>
                                    <p>GSTIN: {this.state.invoice.cone_gstin} State: {this.state.invoice.cone_state}</p>
                                    <p>Contact: {this.state.invoice.cone_contact}</p>
                                    <h5><b>Place: {this.state.invoice.cone_place}</b></h5>
                                </td>
                            </tr>
                        </tbody>
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
                                <th>Rate</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {i}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="7" align="right">Sur. Ch.</td>
                                <td>{this.state.invoice.sur_ch}</td>
                            </tr>
                            <tr>
                                <td colSpan="7" align="right">St. Ch.</td>
                                <td>{this.state.invoice.st_ch}</td>
                            </tr>
                            <tr>
                                <td colSpan="7" align="right">Risk Ch.</td>
                                <td>{this.state.invoice.risk_ch}</td>
                            </tr>
                            <tr>
                                <td colSpan="7" align="right">DD Ch.</td>
                                <td>{this.state.invoice.dd_ch}</td>
                            </tr>
                            <tr>
                                <td colSpan="7" align="right">Hamali</td>
                                <td>{this.state.invoice.hamali}</td>
                            </tr>
                            <tr>
                                <td colSpan="7" align="right">Other Ch.</td>
                                <td>{this.state.invoice.other_ch}</td>
                            </tr>
                            <tr className="alert-danger">
                                <td colSpan="7" align="right"><b>Grand Total</b></td>
                                <td><b>{this.state.invoice.gtot}</b></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }
}
export default PrintView;