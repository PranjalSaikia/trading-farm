import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-table/react-table.css';
import { GetData, PostData } from './../../api/service';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Notifications, { notify } from 'react-notify-toast';
import Loader from '../Loader/Loader';
class ViewChallanTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true
        }
    }

    componentDidMount() {
        GetData('api/get_all_challan_off.php')
            .then((resp) => {
                //console.log(resp.status);
                if (resp.status === '200') {
                    this.setState({
                        data: resp.data,
                        isLoading:false
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

    onDeleteConfirm(challan_no, index) {
        const data = {
            "challan_no": challan_no
        };
        let initialData = this.state.data;

        PostData('api/delete_challan_off.php', data)
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



        let i = items.map((bill, index) =>
            <tr key={index}>
                <td>{bill.challan_no}</td>
                <td>{bill.date1}</td>
                <td>{bill.truck_no}</td>
                <td>{bill.source}</td>
                <td>{bill.destination}</td>
                <td><Link to={`/printchallan/${bill.challan_no}`}><i className="fa fa-print"></i></Link></td>
                <td><Link to={`/editchallan/${bill.challan_no}`}><i className="fa fa-pencil"></i></Link></td>
                <td><a onClick={this.onDelete.bind(this, bill.challan_no, index)}><i className="fa fa-trash"></i></a></td>
            </tr>
        )



        return (
            <div>
                <Loader show={this.state.isLoading} text="Loading data....Please wait" />
                <Notifications />
                <table width="100%" className="table table-bordered">
                    <thead>
                        <tr className="alert-success">
                            <th>Challan No</th>
                            <th>Challan Date</th>
                            <th>Truck No</th>
                            <th>Source</th>
                            <th>Destination</th>
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

export default ViewChallanTable;