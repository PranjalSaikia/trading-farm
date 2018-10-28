import React, { Component } from 'react';
import {  PostData } from './../../api/service';
import Tracker from './Tracker';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


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

class TrackingChallanNo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challan_no: '',
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
      }
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let initailData = [];
    let result = this.state.result;
    let challan_no = this.state.challan_no;
    const data = {
      "type": '3',
      "challan_no": challan_no
    }
    if (challan_no !== "") {
      PostData('api/tracking.php', data)
        .then((resp) => {
          if (resp.status === '200') {
            initailData = resp.data;
            console.log(initailData);
            result['invoice_no'] = initailData[0].inv_no;
            result['item_code'] = initailData[0].item_code;
            result['item_qty'] = initailData[0].qty;
            result['item_unit'] = initailData[0].unit;
            result['item_wecharged'] = initailData[0].wtc;
            result['date1'] = initailData[0].date1;
            result['cone_place'] = initailData[0].cone_place;
            result['cons_place'] = initailData[0].cons_place;
            result['cons_name'] = initailData[0].cons_name;
            result['cone_name'] = initailData[0].cone_name;
            result['status'] = initailData[0].status;
            result['status_text'] = initailData[1];
            result['challan_no'] = initailData[0].challan_no;
            result['challan_date'] = initailData[0].date1;
            result['source'] = initailData[0].s_loc;
            result['truck_no'] = initailData[0].truck_no;
            result['destination'] = initailData[0].d_loc;

            this.setState({
              result: result
            })
          } else {
            confirmAlert({
              title: 'No Challan Found',
              message: 'Please enter valid Challan no',
              buttons: [
                {
                  label: 'Okay',
                  onClick: () => this.setState({ challan_no: '' })
                },

              ]
            })
          }

        });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }



  render() {
    return (
      <div>
        <h2>Track with Challan No</h2>
        <hr />

        <form className="form" onSubmit={this.onSubmit}>
          <table width="80%">
            <tbody>
              <tr>
                <td width="20%">
                  Enter your challan No
                        </td>
                <td>
                  <input
                    className="form-control input-sm"
                    type="text"
                    placeholder="Challan No"
                    name="challan_no"
                    onChange={this.handleChange}
                    value={this.state.challan_no}
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

            {/* <table width="100%" className="table">
              <tr>
                <td width="10%">
                  <h4>Item Code:</h4>
                </td>
                <td>
                  {this.state.result['item_code']}
                </td>

                <td width="10%">
                  <h4>Quantity:</h4>
                </td>
                <td>
                  {this.state.result['item_qty']} {this.state.result['item_unit']}
                </td>
              </tr>

              <tr>
                <td width="10%">
                  <h4>Particulars:</h4>
                </td>
                <td>
                  {this.state.result['item_particulars']}
                </td>

                <td width="10%">
                  <h4>Weight:</h4>
                </td>
                <td>
                  {this.state.result['item_wecharged']}
                </td>
              </tr>
            </table> */}

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

            <Tracker status={this.state.result['status']} source={this.state.result['source']} truck_no={this.state.result['truck_no']} destination={this.state.result['destination']} delivery={this.state.result['cone_name']} />
          </div>}
      </div>
    )
  }
}

export default TrackingChallanNo;