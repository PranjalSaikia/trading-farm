import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PostData } from './../../api/service';

class OffLoadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challan_no: '',
            fields: {
                challan_no: '',
                date1: '',
                truck_no: '',
                source: '',
                destination: '',
                user: ''
            },
            items: []
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onFinalSubmit = this.onFinalSubmit.bind(this);

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        let fields = this.state.fields;
        let challan_no = this.state.challan_no;
        const data = {
            "challan_no": challan_no
        }
        PostData('api/get_single_data_challan.php', data)
            .then((resp) => {
                console.log(resp.data);
                let initialData = resp.data;
                if (initialData[0][0].status === '0') {
                    fields['challan_no'] = initialData[0][0].challan_no;
                    fields['date1'] = initialData[0][0].date1;
                    fields['truck_no'] = initialData[0][0].truck_no;
                    fields['source'] = initialData[0][0].source;
                    fields['destination'] = initialData[0][0].destination;
                    fields['user'] = initialData[0][0].user;

                    let items = resp.data[1];


                    this.setState({
                        fields: fields,
                        items: items
                    })
                } else {
                    confirmAlert({
                        title: 'Challan already off loaded',
                        message: 'Click okay to continue',
                        buttons: [
                            {
                                label: 'Okay',
                                onClick: () => window.location.reload()
                            },

                        ]
                    })
                }
            });

    }

    onFinalSubmit() {
        let challan_no = this.state.fields['challan_no'];
        let items = this.state.items;
        let sentItems = items.filter((el) => el.st === true);
        if (challan_no === "") {
            alert("please insert challan no first");
        } else {
            const data = {
                "challan_no": challan_no,
                items: sentItems
            }
            PostData('api/offload.php', data)
                .then((resp) => {
                    if (resp.data === '2') {
                        confirmAlert({
                            title: 'Successsfully Submitted',
                            message: 'Click okay to continue',
                            buttons: [
                                {
                                    label: 'Okay',
                                    onClick: () => window.location.reload()
                                },

                            ]
                        })
                    }
                });
        }
    }


    handleChangeBarcode(e) {
        let barcode = e.target.value;
        let items = this.state.items;
        items.forEach(function (el) {
            if (el.item_code === barcode) {
                el.st = true;
            }
            return el;
        })

        this.setState({
            items: items,
            barcode: ''
        })

    }

    render() {
        let items = this.state.items;
        let i = items.map((item, index) =>
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.item_code}</td>
                <td>{item.qty}</td>
                <td>{item.unit}</td>
                <td>{item.parti}</td>
                <td>{this.state.fields['source']}</td>
                <td>{this.state.fields['destination']}</td>
                <td>{item.st ? <i style={{ color: 'green' }} className="fa fa-check"></i> : null}</td>
            </tr>
        )
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit} >
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td width="10%">
                                    <b>Challan no</b>
                                </td>
                                <td valign="bottom">
                                    <input
                                        type="text"
                                        className="challan no"
                                        className="form-control input-sm"
                                        name="challan_no"
                                        onChange={this.handleChange}
                                        value={this.state.challan_no}
                                        required={true}
                                        placeholder="Type the challan no here"
                                    />
                                </td>
                                <td valign="bottom">
                                    <button className="btn btn-primary btn-sm" type="submit">Search</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <hr />
                <table width="100%">
                    <tbody>
                        <tr>
                            <td>Challan No: {this.state.fields['challan_no']}</td>
                            <td>Challan Date: {this.state.fields['date1']}</td>
                        </tr>

                        <tr>
                            <td>Truck No: {this.state.fields['truck_no']}</td>
                            <td>Source: {this.state.fields['source']}</td>
                        </tr>

                        <tr>
                            <td>Destination: {this.state.fields['destination']}</td>
                            <td>User: {this.state.fields['user']}</td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                <div className="">
                    <label>Scan barcode here</label>
                    <input
                        type="text"
                        name="barcode"
                        className="form-control"
                        placeholder="Scan barcode here . . . . . "
                        value={this.state.barcode}
                        onChange={this.handleChangeBarcode.bind(this)}

                    />
                </div>
                <hr />
                <table className="table table-bordered">
                    <thead>
                        <tr className="alert-info">
                            <th>#</th>
                            <th>Item Code</th>
                            <th>Qty</th>
                            <th>Method of packing</th>
                            <th>Particulars</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {i}
                    </tbody>
                </table>

                <div className="col-md-12" align="right">
                    <button className="btn btn-primary btn-sm" type="button" onClick={this.onFinalSubmit}>Submit</button>
                </div>




            </div>
        )
    }
}

export default OffLoadForm;