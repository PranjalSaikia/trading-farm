import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import DateWiseChallan from './Tables/DateWiseChallan';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { PostData } from './../../api/service';
import Loader from '../Loader/Loader';

class ChallanReportDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date_from: '',
            date_to: '',
            results: [],
            isLoading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const data = {
            "type": 3,
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
                }
            })

    }

    render() {
        return (
            <div>
                <h2>Challan Report (Date Wise)</h2>
                <hr />
                <Loader show={this.state.isLoading} text="Loading data....Please wait" />
                <div className="container" align="center">
                    <form className="form-inline" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>From &nbsp;</label>
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
                <DateWiseChallan ref={el => (this.componentRef = el)} state={this.state.results} />
            </div>
        )
    }
}

export default ChallanReportDate;