import React, { Component } from 'react';
import { GetData, PostData } from './../../api/service';

class EditChallan extends Component {
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
                challan_no: '',
                date1: '',
                truck_no: '',
                source: '',
                destination: '',
                owner_name: '',
                driver_name: '',
                driver_license: '',
                total_lorry_hire: '',
                labour_charge: '',
                total: '',
                advance_paid: '',
                balance_lorry_hire: '',
                total_weight: '',
                previous_date: '',
                previous_truck_no: ''
            },
            items: [],
            tempItems: [],
            finalItems: [],
            barcode: '',
            owner: [],
            tempDesitination: [],
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;

        if (field === 'labour_charge') {
            fields['total'] = parseFloat(fields['total_lorry_hire']) + parseFloat(fields['labour_charge']);
        }
        this.setState({
            fields: fields
        })
    }


    handleTruckChange(e) {
        let fields = this.state.fields;
        fields['truck_no'] = e.target.value;
        let owner = this.state.owner;
        let result = owner.filter((item) => item.truck_no === e.target.value);
        if (result.length > 0) {
            fields['owner_name'] = result[0].owner_name;
        } else {
            fields['owner_name'] = "";
        }
        this.setState({
            fields
        })
    }

    handleBarcodeChange(e){
        this.insertToFinal(e.target.value);
    }

    insertToFinal(value) {
        let barcode = value;

        let tempItems = this.state.tempItems;
        let finalItems = this.state.finalItems;
        let result = tempItems.filter((item) => item.item_code === barcode);
        //insert into items
        //console.log(result[0].item_code)
        let items1 = {};
        if (result.length > 0) {
            items1['item_code'] = result[0].item_code;
            items1['item_qty'] = result[0].qty;
            items1['item_method'] = result[0].unit;
            items1['item_particulars'] = result[0].parti;
            items1['item_acweight'] = result[0].wt;
            items1['item_wecharged'] = result[0].wtc;
            items1['item_source'] = result[0].cons_place;
            items1['item_destination'] = result[0].cone_place;

            let check_res = finalItems.filter((item) => item.item_code === barcode);
            if (check_res.length === 0) {
                finalItems.push(items1);
            }
        }
        barcode = '';
        this.setState({
            items: items1,
            barcode: barcode,
            finalItems: finalItems
        })
        return null;
    }


    componentDidMount() {

        //initial fetch
        let tempItems = this.state.tempItems;
        GetData('api/item_load_all_edit.php')
            .then((resp) => {
                tempItems = resp.data;
                console.log(tempItems);
                this.setState({
                    tempItems: tempItems
                })
            });

        let challan_no = this.props.match.params.id;
        const data1 = {
            "challan_no": challan_no
        }
        
        let fields = this.state.fields;
        PostData('api/get_single_data_challan.php',data1)
        .then((resp) => {
            let initialData = resp.data;
            //console.log(initialData[0][0].challan_no);
            fields['challan_no'] = initialData[0][0].challan_no;
            fields['date1'] = initialData[0][0].date1;
            fields['previous_date'] = initialData[0][0].date1;
            fields['previous_truck_no'] = initialData[0][0].truck_no;
            fields['truck_no'] =initialData[0][0].truck_no;
            fields['source'] = initialData[0][0].source;
            fields['destination'] = initialData[0][0].destination;
            fields['owner_name'] = initialData[0][0].owner_name;
            fields['driver_name'] = initialData[0][0].driver_name;
            fields['driver_license'] = initialData[0][0].driver_license;
            fields['total_weight'] = initialData[0][0].total_weight;
            fields['total_lorry_hire'] = initialData[0][0].total_lorry_hire;
            fields['labour_charge'] = initialData[0][0].labour_charge;
            fields['total'] = initialData[0][0].total;
            fields['advance_paid'] = initialData[0][0].advance;
            fields['balance_lorry_hire'] = initialData[0][0].balance;
            let data1 = initialData[1];
            
            data1.map((bar) =>
                this.insertToFinal(bar.item_code)
            )      

            this.setState({
                fields: fields
            })
        });


        GetData('api/fetch_truck_details.php')
            .then((resp) => {
                //console.log(resp);
                this.setState({
                    isLoadingUnit: false,
                    owner: resp.data[0],
                    tempDesitination: resp.data[1]
                })
            })
    }

    onDelete(index) {
        let finalItems = this.state.finalItems;
        finalItems.splice(index, 1);
        this.setState({
            finalItems: finalItems
        })
    }

    onSubmit(e) {
        e.preventDefault();
        let fields = this.state.fields;
        let finalItems = this.state.finalItems;
        let item_code_send = [];
        finalItems.map((item) => {
            item_code_send.push(item.item_code);
        }
        );
        const data = [];
        data.push(fields);
        data.push(item_code_send);

        //console.log(data);
        //send this to server
        PostData('api/edit_challan.php', data)
            .then((resp) => {
                this.props.history.replace('/printchallan/'+resp.data)
            })
    }

    render() {
        let i = this.state.finalItems.map((item, index) =>
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.item_code}</td>
                <td>{item.item_unit}</td>
                <td>{item.item_qty}</td>
                <td>{item.item_particulars}</td>
                <td>{item.item_source}</td>
                <td>{item.item_destination}</td>
                <td><a onClick={this.onDelete.bind(this, index)}><i className="fa fa-trash"></i></a></td>
            </tr>
        )

        let j = [];

        let tt = this.state.tempDesitination;
        if (!this.state.isLoadingUnit) {
            tt.forEach(el => {
                j.push(<option key={el.unit_id} value={el.unit_id}>{el.location}</option>)
            });
        } 
        return (
            <div>
                <form
                    onSubmit={this.onSubmit}
                >
                    <table width="100%">

                        <tr>
                            <td>
                                <label>Challan No</label>
                                <input
                                    type="text"
                                    className="form-control input-sm"
                                    placeholder="Challan No"
                                    name="date"
                                    onChange={this.handleChange.bind(this, 'challan_no')}
                                    value={this.state.fields['challan_no']}
                                    readOnly={true}
                                />
                            </td>
                            <td>
                                <label>Date</label>
                                <input
                                    type="date"
                                    className="form-control input-sm"
                                    placeholder="Date"
                                    name="date"
                                    onChange={this.handleChange.bind(this, 'date')}
                                    value={this.state.fields['date1']}
                                />
                            </td>

                            <td>
                                <label>Truck No</label>
                                <input
                                    type="text"
                                    className="form-control input-sm"
                                    placeholder="Truck No"
                                    name="truck_no"
                                    onChange={this.handleTruckChange.bind(this)}
                                    value={this.state.fields['truck_no']}
                                />
                            </td>

                            <td>
                                <label>Owner Name</label>
                                <input
                                    type="text"
                                    className="form-control input-sm"
                                    placeholder="Owner Name"
                                    name="owner_name"
                                    onChange={this.handleChange.bind(this, 'owner_name')}
                                    value={this.state.fields['owner_name']}
                                />
                            </td>

                            <td>
                                <label>Driver's Name</label>
                                <input
                                    type="text"
                                    className="form-control input-sm"
                                    placeholder="Driver's Name"
                                    name="driver_name"
                                    onChange={this.handleChange.bind(this, 'driver_name')}
                                    value={this.state.fields['driver_name']}
                                />
                            </td>

                            <td>
                                <label>Driver's License</label>
                                <input
                                    type="text"
                                    className="form-control input-sm"
                                    placeholder="Driver's License No"
                                    name="driver_license"
                                    onChange={this.handleChange.bind(this, 'driver_license')}
                                    value={this.state.fields['driver_license']}
                                />
                            </td>

                            {/* <td>
                                    <label>Source</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Source"
                                        name="source"
                                        onChange={this.handleChange.bind(this, 'source')}
                                        value={this.state.fields['source']}
                                    />
                                </td> */}

                            <td>
                                <label>Destination</label>
                                <select className="form-control input-sm" onChange={this.handleChange.bind(this, 'destination')}
                                    value={this.state.fields['destination']} >
                                    <option value="">Choose</option>
                                    {j}
                                </select>
                            </td>
                        
                        </tr>

                    </table>
                    <hr />
                    <div className="">
                        <label>Scan barcode here</label>
                        <input
                            type="text"
                            name="barcode"
                            className="form-control"
                            placeholder="Scan barcode here . . . . . "
                            onChange={this.handleBarcodeChange.bind(this)}
                            value={this.state.barcode}
                        />
                    </div>
                    <hr />


                    <table className="table table-bordered" width="100%">
                        <thead>
                            <tr className="alert-success">
                                <th>#</th>
                                <th>Item Code</th>
                                <th>Qty</th>
                                <th>Unit</th>
                                <th>Particulars</th>
                                <th>Source</th>
                                <th>Destination</th>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {i}
                        </tbody>
                    </table>

                    <hr />
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <label>Total Weight</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Total Weight"
                                        name="total_weight"
                                        onChange={this.handleChange.bind(this, 'total_weight')}
                                        value={this.state.fields['total_weight']}
                                    />
                                </td>
                                <td>
                                    <label>Total Lorry hire</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Total Lorry Hire"
                                        name="total_lorry_hire"
                                        onChange={this.handleChange.bind(this, 'total_lorry_hire')}
                                        value={this.state.fields['total_lorry_hire']}
                                    />
                                </td>

                                <td>
                                    <label>Labour Charge</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Labour Charge"
                                        name="labour_charge"
                                        onChange={this.handleChange.bind(this, 'labour_charge')}
                                        value={this.state.fields['labour_charge']}
                                    />
                                </td>

                                <td>
                                    <label>Total</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Total"
                                        name="total"
                                        onChange={this.handleChange.bind(this, 'total')}
                                        value={this.state.fields['total']}
                                    />
                                </td>

                                <td>
                                    <label>Advance Paid</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Advance Paid"
                                        name="advance_paid"
                                        onChange={this.handleChange.bind(this, 'advance_paid')}
                                        value={this.state.fields['advance_paid']}
                                    />
                                </td>

                                <td>
                                    <label>Balance Lorry Hire</label>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Balance Lorry Hire"
                                        name="balance_lorry_hire"
                                        onChange={this.handleChange.bind(this, 'balance_lorry_hire')}
                                        value={this.state.fields['balance_lorry_hire']}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table><br/>
                    <div align="right">
                        <button type="submit" className="btn btn-primary btn-sm">Generate &amp; Print</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default EditChallan;