import React, { Component } from 'react'
import WidgetCard from './WidgetCard';
import {GetData} from './../../api/service';

class TopFeatured extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: '0',
            revenue: '0.00',
            customers: '0'
        }
    }

    componentDidMount(){
        GetData('api/dashboard.php')
        .then((resp) => {
            if(resp.status === '200'){
                let data2 = '0.00';
                if(resp.data[1] === null){
                    data2 = '0.00'
                }else{
                    data2 = resp.data[1]
                }
                this.setState({
                    bills: resp.data[0],
                    revenue: data2,
                    customers: resp.data[2]
                })
            } 
        })
    }

  render() {
    return (
      <div style={{marginRight: '13px'}}>
            <div className="row">
            <div className="col-md-4">
                    <WidgetCard 
                        icon="database"
                        title="Bills"
                        value={this.state.bills}
                        color="#E0AAFF"
                    />
            </div>

                <div className="col-md-4">
                    <WidgetCard
                        icon="inr"
                        title="Revenue"
                        value={this.state.revenue}
                        color="#B6FFAA"
                    />
            </div>

                <div className="col-md-4">
                    <WidgetCard
                        icon="group"
                        title="Customers"
                        value={this.state.customers}
                        color="#AAFCFF"
                    />
            </div>

    
            </div>
      </div>
    )
  }
}

export default TopFeatured;
