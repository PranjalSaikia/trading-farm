import React, { Component } from 'react';
import { PostData } from './../../api/service';
import Loader from '../Loader/Loader';


class DeliveryTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      type: '3',
      isLoading: true
    }

  }

  componentDidMount() {
    const data = {
      "type": this.state.type
    }

    PostData('api/delivery.php', data)
      .then((resp) => {
        if(resp.status === '200'){
          this.setState({
            data: resp.data,
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
    let items = this.state.data;
    let i = [];
    if (!this.state.isLoading) {
      if (items.length > 0) {
        i = items.map((item, index) =>
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.item_code}</td>
            <td>{item.parti}</td>
            <td>{item.inv_no}</td>
            <td>{item.challan_no}</td>
            <td>{item.cons_name}</td>
            <td>{item.cons_place}</td>
            <td>{item.cone_name}</td>
            <td>{item.cone_place}</td>
            <td>{item.status_text}</td>
          </tr>
        )
      } else {
        i = <tr>
          <td colSpan="10" align="center">No Data in the table</td>
        </tr>
      }
    }
    return (
      <div>
        <h2>Delivery Table</h2>
        <hr />
        <Loader show={this.state.isLoading} text="Loading data....Please wait" />
        <table className="table table-bordered">

          <thead>
            <tr className="alert-success">
              <th>#</th>
              <th>Item Code</th>
              <th>Particulars</th>
              <th>Invoice No</th>
              <th>Challan No</th>
              <th>From (Name)</th>
              <th>From (Place)</th>
              <th>To (Name)</th>
              <th>To (Place)</th>
              <th>Status</th>
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

export default DeliveryTable;