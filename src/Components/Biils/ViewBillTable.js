import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-table/react-table.css';
import { GetData, PostData } from './../../api/service';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Notifications, { notify } from 'react-notify-toast';
import Loader from './../Loader/Loader';
class ViewBillTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true
        }
    }

    componentDidMount() {
        GetData('api/get_all_bills.php')
            .then((resp) => {
                
                if (resp.status === '200') {
                    this.setState({
                        data: resp.data,
                        isLoading: false
                    });
                }else{
                    this.setState({
                        isLoading: false
                    })
                }

            })
    }

    onDelete(inv_no, index) {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: this.onDeleteConfirm.bind(this, inv_no, index)
                },
                {
                    label: 'No',
                }
            ]
        })
    }

    onDeleteConfirm(inv_no, index) {
        const data = {
            "inv_no": inv_no
        };
        let initialData = this.state.data;

        PostData('api/invoice_delete.php', data)
            .then((resp) => {
                if (resp.data === '1') {
                    notify.show('Successfully Deleted', 'success', 3000);
                    initialData.splice(index, 1);
                    this.setState({
                        data: initialData
                    })
                } else {
                    notify.show('Operation failed!!', 'error', 3000);
                }
            })
    }



    render() {
        let items = this.state.data;
        let i = [];
        if (this.state.isLoading === false) {
            if (items.length > 0) {
                i = items.map((bill, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{bill.inv_no}</td>
                        <td>{bill.date1}</td>
                        <td>{bill.mop_name}</td>
                        <td>{bill.c_name}</td>
                        <td>{bill.cons_place}</td>
                        <td>{bill.cone_name}</td>
                        <td>{bill.cone_place}</td>
                        <td>{bill.gtot}</td>
                        <td><Link to={`/printbill/${bill.inv_no}`}><i className="fa fa-print"></i></Link></td>
                        <td><Link to={`/editbill/${bill.inv_no}`}><i className="fa fa-pencil"></i></Link></td>
                        <td><a onClick={this.onDelete.bind(this, bill.inv_no, index)}><i className="fa fa-trash"></i></a></td>
                    </tr>
                )
            } else {
                i = <tr>
                    <td colSpan="12" align="center">No data in the table</td>
                </tr>;
            }
        }
        return (
            <div>
                <Notifications />
                <Loader show={this.state.isLoading} text="Loading....Please Wait." />
                <table width="100%" className="table table-bordered">
                    <thead>
                        <tr className="alert-success">
                            <th>#</th>
                            <th>Bill No</th>
                            <th>Bill Date</th>
                            <th>Mode of Payment</th>
                            <th>Consignor Name</th>
                            <th>From</th>
                            <th>Consignee Name</th>
                            <th>To</th>
                            <th>Bill Total</th>
                            <td>Print</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {i}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ViewBillTable;