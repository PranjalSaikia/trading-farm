import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { PostData, GetData } from './../../api/service';
import Loader from '../Loader/Loader';
import DateWiseBill from './Tables/DateWiseBill';

class BillReportCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datefrom: '',
            dateto: '',
            customer_type: '1',
            customer: '',
            results: [],
            isLoading: false,
            isLoadingCustomer: true,
            customers: {
                customer_id: '',
                customer_name: '',
                customer_gstin: '',
                customer_state: '',
                customer_contact: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        
        let initialData = [];
        GetData('api/initial_fetch_bills.php')
            .then(
                (resp) => {
                    initialData = resp.data;
                    this.setState({
                        customers: initialData[2],
                        isLoadingCustomer: false
                    })
                }
            );
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const data = {
            "type": 2,
            "customer_type": this.state.customer_type,
            "customer_id": this.state.customer,
            "date_from": this.state.date_from,
            "date_to": this.state.date_to
        }

        let results = this.state.results;

        //post the data
        PostData('api/reports.php', data)
            .then((resp) => {
                if (resp.status === '200') {
                    let initialData = resp.data;
                    if (initialData.length > 0) {
                        results = initialData;
                    }
                    this.setState({
                        results: results,
                        isLoading: false
                    })
                }else{
                    this.setState({
                        isLoading: false
                    })
                }
            })

    }

    render() {
        let customers = this.state.customers;
        let customerList = [];
        if(!this.state.isLoadingCustomer){
            if (customers.length > 0) {
                customerList = customers.map((customer) =>
                    <option key={customer.customer_id} value={customer.customer_id}>{customer.c_name}</option>
                );
            }
        }else{
            customerList = [];
        }
        
        
        return (
            <div>
                <h2>Bill Report (Customer Wise)</h2>
                <hr />
                <Loader show={this.state.isLoading} text="Loading data....Please wait" />
                <div className="container" align="center">
                    <form className="form-inline" onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label>Type &nbsp;</label>
                            <select className="form-control input-sm"
                                name="customer_type"
                                value={this.state.customer_type}
                                onChange={this.handleChange}
                                required={true}
                            >
                                <option value="2">Consingor</option>
                                <option value="1">Consignee</option>
                                <option value="3">Both</option>
                            </select>
                        </div>


                        <div className="form-group">
                            <label>&nbsp; Customer Name &nbsp;</label>
                            <select className="form-control input-sm"
                                name="customer"
                                value={this.state.customer}
                                onChange={this.handleChange}
                                required={true}
                            >
                                <option value="">Choose customer</option>
                                {customerList}
                            </select>
                        </div>


                        <div className="form-group">
                            <label>&nbsp; From &nbsp;</label>
                            <input
                                className="form-control input-sm"
                                type="date"
                                name="date_from"
                                value={this.state.date_from}
                                onChange={this.handleChange}
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <label>&nbsp; To &nbsp;</label>
                            <input
                                className="form-control input-sm"
                                type="date"
                                name="date_to"
                                value={this.state.date_to}
                                onChange={this.handleChange}
                                required={true}

                            />
                        </div>

                        <div className="form-group">

                            &nbsp;&nbsp;

                            <button className="btn btn-sm btn-primary" type="submit"><i className="fa fa-search"></i> Search</button>
                        </div>
                    </form>
                </div>
                <hr />
                <div align="center">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-primary btn-sm"><i className="fa fa-print"></i> Print</button>}
                        content={() => this.componentRef}
                    /> &nbsp;

                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="btn btn-sm btn-info"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Export to Excel" />
                </div>
                <hr />
                <DateWiseBill ref={el => (this.componentRef = el)} state={this.state.results} />
            </div>
        )
    }
}

export default BillReportCustomer;