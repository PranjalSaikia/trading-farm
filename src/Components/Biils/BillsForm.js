import React, { Component } from 'react'
import TopForm from './TopForm';
import { GetData, PostData } from './../../api/service';
import Loader from '../Loader/Loader';

const Style = {
    "error": {
        color: 'red',
        fontSize: '0.8em'
    }
}

class BillForm extends Component {
    constructor(props) {
        super(props);
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;
        this.state = {
            fields: {
                inv_no: '',
                date1: today,
                mop: '1',
                invoice_old: '',
                invoice_old_date: '',
                invoice_old_amount: '',
                cons_name: '',
                cons_gstin: '',
                cons_state: '',
                cons_contact: '',
                cons_place: '',
                cone_name: '',
                cone_gstin: '',
                cone_state: '',
                cone_contact: '',
                cone_place: '',
                sur_ch: '0.00',
                st_ch: '0.00',
                risk_ch: '0.00',
                dd_ch: '0.00',
                hamali: '0.00',
                other_ch: '0.00',
                bill_total: '0.00'
            },
            items: {
                item_code: '',
                item_qty: '',
                item_method: 'CKT',
                item_particulars: '',
                item_acweight: '',
                item_wecharged: '',
                item_rate: '',
                item_amount: ''
            },
            customers: {
                customer_id: '',
                customer_name: '',
                customer_gstin: '',
                customer_state: '',
                customer_contact: ''
            },
            mop: [],
            finalItems: [],
            errors: {},
            isLoading: false
        }


        this.addItem = this.addItem.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({
            fields
        });
    }


    handleTempChange(field, e) {
        let items = this.state.items;
        items[field] = e.target.value;
        this.setState({
            items
        });
    }

    calculateAmount() {
        let items = this.state.items;
        let qty = items['item_qty'];
        let rate = items['item_rate'];
        let amount = 0;
        items['item_amount'] = (parseFloat(qty) * parseFloat(rate)).toFixed(2);
        this.setState({
            items: items
        })
    }


    handleConsChange(e) {
        let fields = this.state.fields;
        let customers = this.state.customers;
        let gstin = e.target.value;
        const result = customers.filter((customer) => customer.gstin === gstin);
        if (result.length > 0) {

            fields['cons_name'] = result[0].c_name;
            fields['cons_state'] = result[0].state;
            fields['cons_contact'] = result[0].contact;
            fields['cons_gstin'] = result[0].gstin;

        } else {
            fields['cons_gstin'] = e.target.value;
        }
        this.setState({
            fields: fields
        })
    }


    handleConeChange(e) {
        let fields = this.state.fields;
        let customers = this.state.customers;
        let gstin = e.target.value;
        const result = customers.filter((customer) => customer.gstin === gstin);
        if (result.length > 0) {

            fields['cone_name'] = result[0].c_name;
            fields['cone_state'] = result[0].state;
            fields['cone_contact'] = result[0].contact;
            fields['cone_gstin'] = result[0].gstin;

        } else {
            fields['cone_gstin'] = e.target.value;
        }
        this.setState({
            fields: fields
        })
    }

    componentDidMount() {
        //initial fetch request
        this.setState({
            isLoading: true
        })
        let initialData = [];
        let fields = this.state.fields;
        GetData('api/initial_fetch_bills.php')
            .then(
                (resp) => {
                    console.log(resp);
                    initialData = resp.data;
                    fields['inv_no'] = initialData[0].inv_no;
                    this.setState({
                        mop: initialData[1],
                        customers: initialData[2],
                        fields: fields,
                        isLoading: false
                    })
                }
            );

    }

    _tempValidation() {
        let items = this.state.items;
        let errors = {};
        let formIsValid = true;

        if (!items["item_code"]) {
            formIsValid = false;
            errors["item_code"] = "Cannot be empty";
        }

        if (!items["item_qty"]) {
            formIsValid = false;
            errors["item_qty"] = "Cannot be empty";
        }

        if (!items["item_particulars"]) {
            formIsValid = false;
            errors["item_particulars"] = "Cannot be empty";
        }

        if (!items["item_rate"]) {
            formIsValid = false;
            errors["item_rate"] = "Cannot be empty";
        }


        if (!items["item_amount"]) {
            formIsValid = false;
            errors["item_amount"] = "Cannot be empty";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    addItem() {
        let fields = this.state.fields;
        let total = fields['bill_total'];
        let items = this.state.items;
        let finalItems = this.state.finalItems;
        if (this._tempValidation()) {
            total = parseFloat(total) + parseFloat(items['item_amount']);
            fields['bill_total'] = total.toFixed(2);
            finalItems.push(items);
            this.setState({
                items: {
                    item_code: '',
                    item_qty: '',
                    item_method: 'CKT',
                    item_particulars: '',
                    item_acweight: '',
                    item_wecharged: '',
                    item_rate: '',
                    item_amount: ''
                },
                fields: fields
            })
        }
    }

    deleteItem(index) {
        let finalItems = this.state.finalItems;
        let fields = this.state.fields;
        let total = fields['bill_total'];
        let result = finalItems.filter((item, index) => index === index);
        total = parseFloat(total) - parseFloat(result[0]['item_amount']);
        fields['bill_total'] = total.toFixed(2);
        finalItems.splice(index, 1);
        this.setState({
            finalItems: finalItems,
            fields: fields
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            isLoading: true
        })


        const data = [];
        let fields = this.state.fields;
        let finalItems = this.state.finalItems;

        data.push(fields);
        data.push(finalItems);

        PostData('api/invoice_p.php', data)
            .then((resp) => {
                this.setState({
                    isLoading: false
                })
                this.props.history.replace('/printbill/' + resp.data);
            });


    }




    render() {

        let customers = this.state.customers;
        let customerList = "";
        if (customers.length > 0) {
            customerList = customers.map((customer) =>
                <option key={customer.customer_id} value={customer.gstin}></option>
            );
        }
        return (
            <div>
                <Loader show={this.state.isLoading} text="Loading....Please Wait." />
                <form className="form"
                    onSubmit={this.onSubmit}
                >
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <label>C/Note No</label>
                                    <input
                                        className="form-control input-sm"
                                        name="inv_no"
                                        onChange={this.handleChange.bind(this, 'inv_no')}
                                        value={this.state.fields['inv_no']}
                                        readOnly={true}
                                        required={true}
                                    />
                                </td>

                                <td>
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        className="form-control input-sm"
                                        name="date1"
                                        onChange={this.handleChange.bind(this, 'date1')}
                                        value={this.state.fields['date1']}
                                        required={true}
                                    />
                                </td>

                                <td>
                                    <label>Mode of Payment</label>
                                    <select
                                        className="form-control input-sm"
                                        name="mop"
                                        onChange={this.handleChange.bind(this, 'mop')}
                                        value={this.state.fields['mop']}
                                        required={true}

                                    >
                                        {this.state.mop.map((mop1) =>
                                            <option key={mop1.mop_id} value={mop1.mop_id}>{mop1.mop_name}</option>
                                        )}
                                    </select>
                                </td>

                                <td>
                                    <label>Invoice No</label>
                                    <input
                                        className="form-control input-sm"
                                        name="invoice_old"
                                        onChange={this.handleChange.bind(this, 'invoice_old')}
                                        value={this.state.fields['invoice_old']}

                                    />
                                </td>
                                <td>
                                    <label>Invoice Date</label>
                                    <input
                                        type="date"
                                        className="form-control input-sm"
                                        name="invoice_old_date"
                                        onChange={this.handleChange.bind(this, 'invoice_old_date')}
                                        value={this.state.fields['invoice_old_date']}
                                    />
                                </td>
                                <td>
                                    <label>Invoice Amount</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        name="invoice_old_amount"
                                        onChange={this.handleChange.bind(this, 'invoice_old_amount')}
                                        value={this.state.fields['invoice_old_amount']}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <label>Consignor</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Name"
                                        name="cons_name"
                                        onChange={this.handleChange.bind(this, 'cons_name')}
                                        value={this.state.fields['cons_name']}
                                        required={true}
                                    />
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="GSTIN"
                                        list="gst_list"
                                        name="cons_gstin"
                                        onChange={this.handleConsChange.bind(this)}
                                        value={this.state.fields['cons_gstin']}
                                        required={true}
                                    />
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="State"
                                        name="cons_state"
                                        onChange={this.handleChange.bind(this, 'cons_state')}
                                        value={this.state.fields['cons_state']}
                                        required={true}
                                    />
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Contact No"
                                        name="cons_contact"
                                        onChange={this.handleChange.bind(this, 'cons_contact')}
                                        value={this.state.fields['cons_contact']}
                                        required={true}
                                    />
                                    <label>Place</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Place"
                                        name="cons_place"
                                        onChange={this.handleChange.bind(this, 'cons_place')}
                                        value={this.state.fields['cons_place']}
                                        required={true}
                                    />
                                </td>
                                <td width="5%">&nbsp;</td>
                                <td>
                                    <label>Consignee</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Name"
                                        name="cone_name"
                                        onChange={this.handleChange.bind(this, 'cone_name')}
                                        value={this.state.fields['cone_name']}
                                        required={true}
                                    />
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="GSTIN"
                                        list="gst_list"
                                        name="cone_gstin"
                                        onChange={this.handleConeChange.bind(this)}
                                        value={this.state.fields['cone_gstin']}
                                        required={true}
                                    />
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="State"
                                        name="cone_state"
                                        onChange={this.handleChange.bind(this, 'cone_state')}
                                        value={this.state.fields['cone_state']}
                                        required={true}
                                    />
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Contact No"
                                        name="cone_contact"
                                        onChange={this.handleChange.bind(this, 'cone_contact')}
                                        value={this.state.fields['cone_contact']}
                                        required={true}
                                    />
                                    <label>Place</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Place"
                                        name="cone_place"
                                        onChange={this.handleChange.bind(this, 'cone_place')}
                                        value={this.state.fields['cone_place']}
                                        required={true}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <datalist id="gst_list">
                        {customerList}
                    </datalist>
                    <hr />
                    <table width="100%" className="table">
                        <thead>
                            <tr className="alert-success">
                                <th>Item Code</th>
                                <th>No of Packets</th>
                                <th>Method of packing</th>
                                <th>Particulars (Said to contain)</th>
                                <th>Actual Weight</th>
                                <th>Weight Charged</th>
                                <th>Rate</th>
                                <th>Amount</th>
                                <th>&nbsp;</th>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Scan here.."
                                        name="item_code"
                                        onChange={this.handleTempChange.bind(this, 'item_code')}
                                        value={this.state.items['item_code']}
                                    />
                                    <span style={Style.error}>{this.state.errors['item_code']}</span>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control input-sm"
                                        placeholder="Qty"
                                        name="item_qty"
                                        onChange={this.handleTempChange.bind(this, 'item_qty')}
                                        value={this.state.items['item_qty']}
                                    />
                                    <span style={Style.error}>{this.state.errors['item_qty']}</span>
                                </td>
                                <td>
                                    <select
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Method"
                                        name="item_method"
                                        onChange={this.handleTempChange.bind(this, 'item_method')}
                                        value={this.state.items['item_method']}
                                    >
                                        <option value="CKT">CKT</option>
                                        <option value="PCS">PCS</option>
                                    </select>
                                    <span style={Style.error}>{this.state.errors['item_method']}</span>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Particulars"
                                        name="item_particulars"
                                        onChange={this.handleTempChange.bind(this, 'item_particulars')}
                                        value={this.state.items['item_particulars']}
                                    />
                                    <span style={Style.error}>{this.state.errors['item_particulars']}</span>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Actual Weight"
                                        name="item_acweight"
                                        onChange={this.handleTempChange.bind(this, 'item_acweight')}
                                        value={this.state.items['item_acweight']}
                                    />
                                    <span style={Style.error}>{this.state.errors['item_acweight']}</span>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Weight Charged"
                                        name="item_wecharged"
                                        onChange={this.handleTempChange.bind(this, 'item_wecharged')}
                                        value={this.state.items['item_wecharged']}
                                    />
                                    <span style={Style.error}>{this.state.errors['item_wecharged']}</span>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Rate"
                                        name="item_rate"
                                        onChange={this.handleTempChange.bind(this, 'item_rate')}
                                        value={this.state.items['item_rate']}
                                    />
                                    <span style={Style.error}>{this.state.errors['item_rate']}</span>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Amount"
                                        name="item_amount"
                                        onFocus={this.calculateAmount.bind(this)}
                                        value={this.state.items['item_amount']}
                                    />
                                    <span style={Style.error}>{this.state.errors['item_amount']}</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary btn-sm" type="button" onClick={this.addItem}><i className="fa fa-plus"></i></button>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.finalItems.map((item, index) => {
                                let item_amount = 0;
                                item_amount = parseFloat(item.item_qty) * parseFloat(item.item_rate);
                                return (
                                    <tr key={index} style={{ height: '40px' }}>
                                        <td>{item.item_code}</td>
                                        <td>{item.item_qty}</td>
                                        <td>{item.item_method}</td>
                                        <td>{item.item_particulars}</td>
                                        <td>{item.item_acweight}</td>
                                        <td>{item.item_wecharged}</td>
                                        <td>{item.item_rate}</td>
                                        <td>{item_amount.toFixed(2)}</td>
                                        <td><a onClick={this.deleteItem.bind(this, index)}><i className="fa fa-trash"></i></a></td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                    <hr />
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <label>Sur. Charge</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Sur. Ch."
                                        name="sur_ch"
                                        onChange={this.handleChange.bind(this, 'sur_ch')}
                                        value={this.state.fields['sur_ch']}
                                        required={true}
                                    />
                                </td>
                                <td>
                                    <label>St. Charge</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="St. Ch."
                                        name="st_ch"
                                        onChange={this.handleChange.bind(this, 'st_ch')}
                                        value={this.state.fields['st_ch']}
                                        required={true}
                                    />
                                </td>
                                <td>
                                    <label>Risk Charge</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Risk Ch."
                                        name="risk_ch"
                                        onChange={this.handleChange.bind(this, 'risk_ch')}
                                        value={this.state.fields['risk_ch']}
                                        required={true}

                                    />
                                </td>
                                <td>
                                    <label>D.D. Charge</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="D.D. Ch."
                                        name="dd_ch"
                                        onChange={this.handleChange.bind(this, 'dd_ch')}
                                        value={this.state.fields['dd_ch']}
                                        required={true}
                                    />
                                </td>
                                <td>
                                    <label>Hamali</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Hamali"
                                        name="hamali"
                                        onChange={this.handleChange.bind(this, 'hamali')}
                                        value={this.state.fields['hamali']}
                                        required={true}
                                    />
                                </td>
                                <td>
                                    <label>Other Ch.</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Other Ch."
                                        name="other_ch"
                                        onChange={this.handleChange.bind(this, 'other_ch')}
                                        value={this.state.fields['other_ch']}
                                        required={true}
                                    />
                                </td>
                            </tr>
                            <tr style={{ height: '40px' }}>
                                <td colSpan="5" align="right">
                                    <label>Total &nbsp;</label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Bill Total"
                                        name="bill_total"
                                        onChange={this.handleChange.bind(this, 'bill_total')}
                                        value={this.state.fields['bill_total']}
                                        required={true}
                                    />
                                </td>
                            </tr>

                            <tr style={{ height: '40px' }}>
                                <td colSpan="6" align="right">
                                    <button className="btn btn-primary btn-sm">Generate &amp; Print</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>



                </form>

            </div>
        )
    }
}

export default BillForm;