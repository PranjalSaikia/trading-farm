import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './css/truck.css';

class TruckList extends Component {
    render() {
        return (
            <div className="trucklist-grid">
                
                <TruckCard truck_no="AS123456" owner_name="Mr. PK Saikia" wallet_balance="2589.00" link="/trucks/details/AS123456" />

            </div>
        )
    }
}

export default TruckList;


export const TruckCard = (props) => (
    <div className="truck-card">
        <i className="fa fa-truck fa-3x"></i>
        <div className="truck-name">{props.truck_no}</div>
        <div className="truck-name">{props.owner_name}</div>

        <div className="truck-wallet">
            &#8377; {props.wallet_balance}
        </div>

        <div className="truckcard-footer">
            <div>
                <Link to={props.link}><i className="fa fa-recycle"></i>Show transactions</Link>
            </div>

            <div>
                <Link to={props.link}><i className="fa fa-money"></i> Initiate Payment</Link>
            </div>
        </div>
    </div>
)