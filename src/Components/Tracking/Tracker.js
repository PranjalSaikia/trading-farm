import React, { Component } from 'react';
import './css/tracker.css';

class Tracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status : ''
        }
        
    }

    componentDidMount(){
        let status = this.props.status;

        this.setState({
            status: status
        })
    }
    
  render() {
      let status = this.props.status;
      const style = {
          backgroundColor: 'green'
      }

    return (
      <div className="tracker">
          
            
            <div className="tracker-dots">
                
                <Dot dotname="dot-one" initial="0" status={status} width="0px" text="At Source" progress="0%" details={this.props.source} />
                <Dot dotname="dot-two" initial="1" status={status} width="540px" text="In Transit" preogress="30%" details={this.props.truck_no} />
                <Dot dotname="dot-three" initial="2" status={status} width="930px" text="Reached Destination" progress="60%" details={this.props.destination} />
                <Dot dotname="dot-four" initial="3" status={status} width="1160px" text="Delivered" progress="83%" details={this.props.delivery} />
                
            </div>
            <div className="tracker-line"></div>
            <Progress status={this.state.status} />
      </div>
    )
  }
}

export default  Tracker;


export const Dot = (props) => {

    if(props.initial === props.status){
        return (
                <span className="dot-comb">
                
                <div className="truck-road" style={{width: props.width}}>
                    <i className="fa fa-truck" id="truck"></i><br />    
                </div>
            
                <div className={'dot '+ props.dotname + ' active-dot'}>
                    <br /><h5 align="center">{props.text}<br /><b>{props.details}</b></h5>
                </div>
                
                </span>
           
            )
    }else{
        return (
            <span className="dot-comb">
                <br />
            <br/>
            <div className={'dot ' + props.dotname}>
                    <br /><h5 align="center">{props.text}<br /><b>{props.details}</b></h5>
            </div>
            </span>
        )
    }
    
}

export const Progress = (props) => {
    let width='';
    switch (props.status) {
        case '0':
            width = '0%';
            break;

            case '1':
            width= '38%';
            break;

            case '2':
            width = '66%';
            break;

            case '3':
            width = '83%';
            break;

    
        default:
            break;
    }
    return (<div className={'sub-tracker-line t-'+ props.status} style={{width: width}}></div>)
}
    

