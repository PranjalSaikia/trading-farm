import React, { Component } from 'react';
import { PostData } from './../../api/service';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from '../Loader/Loader';


export const style = {
    "head": {
        backgroundColor: '#f2f2f2',
        width: '120px',
        paddingLeft: '5px'
    },
    "bod": {
        border: 'solid thin #f2f2f2',
        width: '200px',
        paddingLeft: '5px'
    }

}

class DeliveryBillNo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inv_no: '',
            result: {
                item_code: '',
                item_qty: '',
                item_unit: '',
                item_particulars: '',
                item_wecharged: '',
                invoice_no: '',
                date1: '',
                cone_place: '',
                cons_place: '',
                challan_no: '',
                challan_date: '',
                truck_no: '',
                source: '',
                destination: '',
                status: '',
                status_text: ''
            },
            fields: {
                date1: '',
                delivered_to: '',
            },
            item_code_array: [],
            isLoading: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.finalSubmit = this.finalSubmit.bind(this);
    }

    initialState() {
        this.setState({
            item_code: '',
            result: {
                item_code: '',
                item_qty: '',
                item_unit: '',
                item_particulars: '',
                item_wecharged: '',
                invoice_no: '1',
                date1: '',
                cone_place: '',
                cons_place: '',
                challan_no: '',
                challan_date: '',
                truck_no: '',
                source: '',
                destination: '',
                status: '',
                status_text: ''
            },
            fields: {
                date1: '',
                delivered_to: '',
            },
            items: [],
            item_code_array: [],
            isLoading: false
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        let inv_no = this.state.inv_no;
        let result = this.state.result;
        if (inv_no !== "") {
            const data = {
                "type": 2,
                "invoice_no": inv_no
            }
            PostData('api/delivery.php', data)
                .then((resp) => {
                    if (resp.status === '200') {
                        let initailData = resp.data;
                        if (initailData.length > 0) {
                            result['invoice_no'] = initailData[0].inv_no;
                            result['item_code'] = initailData[0].item_code;
                            result['item_particulars'] = initailData[0].parti;
                            result['item_qty'] = initailData[0].qty;
                            result['item_unit'] = initailData[0].unit;
                            result['item_wecharged'] = initailData[0].wtc;
                            result['date1'] = initailData[0].date1;
                            result['cone_place'] = initailData[0].cone_place;
                            result['cons_place'] = initailData[0].cons_place;
                            result['cons_name'] = initailData[0].cons_name;
                            result['cone_name'] = initailData[0].cone_name;
                            result['challan_no'] = initailData[0].challan_no;
                            result['source'] = initailData[0].source;
                            result['truck_no'] = initailData[0].truck_no;
                            result['destination'] = initailData[0].d_loc;
                            result['challan_date'] = initailData[0].date1;
                            result['status'] = initailData[0].status;
                            result['status_text'] = initailData[0].status_text;
                            let dat = resp.data;
                            let iit = dat.map(a => a.item_code);
                            this.setState({
                                item_code_array: iit,
                                result: result,
                                isLoading: false
                            })
                        }
                    } else {
                        confirmAlert({
                            title: 'No Items Found',
                            message: 'Item is not in stock or not reached destination',
                            buttons: [
                                {
                                    label: 'Okay',
                                    onClick: () => this.initialState()
                                },

                            ]
                        })
                    }
                })
        }
    }

    finalSubmit(e) {
        e.preventDefault();
        let date1 = this.state.fields['date1'];
        let delivered_to = this.state.fields['delivered_to'];
        const data = {
            "date1": date1,
            "delivered_to": delivered_to,
            "item_code_array": this.state.item_code_array
        }
        console.log('Sent request', data);

        PostData('api/delivery_final.php', data)
            .then((resp) => {
                console.log('Received Request', resp);
            })

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFinalChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({
            fields: fields
        })
    }




    render() {
        return (
            <div>
                <h2>Deliver with Bill No</h2>
                <hr />

                <Loader show={this.state.isLoading} text="Loading data....Please wait" />

                <form className="form" onSubmit={this.onSubmit}>
                    <table width="80%">
                        <tbody>
                            <tr>
                                <td width="20%">
                                    Enter your Bill no
                        </td>
                                <td>
                                    <input
                                        className="form-control input-sm"
                                        type="text"
                                        placeholder="Enter your Bill No"
                                        name="inv_no"
                                        onChange={this.handleChange}
                                        value={this.state.inv_no}
                                        required={true}
                                    />
                                </td>
                                <td>
                                    <button className="btn btn-primary btn-sm" type="submit"><i className="fa fa-map-marker"></i> Track</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>

                <hr />
                {this.state.result['invoice_no'] !== "" &&
                    <div>


                        <table width="100%" className="table">
                            <tbody>
                                <tr>
                                    <td style={style.head}><h4>Invoice No</h4></td>
                                    <td style={style.bod}><h4>{this.state.result['invoice_no']}</h4></td>
                                    <td style={style.head}><h4>Date</h4></td>
                                    <td style={style.bod}><h4>{this.state.result['date1']}</h4></td>
                                    <td style={style.head}><h4>From</h4></td>
                                    <td style={style.bod}><h4>{this.state.result['cons_name']}</h4></td>
                                    <td style={style.head} ><h4>To</h4></td>
                                    <td style={style.bod}><h4>{this.state.result['cone_name']}</h4></td>
                                </tr>
                                <tr>
                                    <td style={style.head}><h4>Challan No</h4></td>
                                    <td style={style.bod}><h4>{this.state.result['challan_no']}</h4></td>
                                    <td style={style.head}><h4>Date</h4></td>
                                    <td style={style.bod}><h4>{this.state.result['challan_date']}</h4></td>
                                    <td style={style.head}><h4>Truck No</h4></td>
                                    <td style={style.bod}><h4>{this.state.result['truck_no']}</h4></td>
                                    <td style={style.head}><h4>Destination</h4></td>
                                    <td style={style.bod}><h4>{this.state.result['destination']}</h4></td>
                                </tr>
                            </tbody>
                        </table>

                        <h4>Current Status: <b>{this.state.result['status_text']}</b></h4>

                        <hr />
                        <form className="form" onSubmit={this.finalSubmit}>
                            <table width="100%" className="table">
                                <tbody>
                                    <tr>
                                        <td valign="top">
                                            <label>Date of delivery</label>
                                            <input
                                                className="form-control"
                                                type="date"
                                                name="date1"
                                                value={this.state.fields['date1']}
                                                onChange={this.handleFinalChange.bind(this, 'date1')}
                                                required={true}

                                            />
                                        </td>

                                        <td>
                                            <label>Delivered to</label>
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                rows="5"
                                                placeholder="Delivered to"
                                                name="delivered_to"
                                                onChange={this.handleFinalChange.bind(this, 'delivered_to')}
                                                value={this.state.fields['delivered_to']}
                                                required={true}

                                            ></textarea>
                                        </td>
                                    </tr>

                                    <tr style={{ height: '50px' }}>
                                        <td colSpan="2" align="right"><button className="btn btn-sm btn-primary" type="submit">Submit</button></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />

                        </form>

                    </div>}
            </div>
        )
    }
}

export default DeliveryBillNo;