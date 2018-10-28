import React, { Component } from 'react';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';
import './css/barcode.css';


class BarcodePrint extends Component {
    render(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + mm + dd;
        var st = this.props.st;
        if (st === 'undefined'){
            st = 0;
        }
        
        let length1 = this.props.noBar;
        let items = [];
        for(let n=0; n < length1; n++){
            var a = parseFloat(st) + parseFloat(n);
            var b = today + a;
            items.push(b);
        }
        let i = items.map((bar, index) => 
        <div key={index}>
            <div className="barcode-style">
                <Barcode value={bar} />
            </div>
            <p className="page-breaks"></p>
        </div>

    );


        return (
            <div>
                {i}
            </div>
        )
    }
}




class BarcodePrinter extends Component {
  render() {
    return (
      <div className="container">
        <h1>Printing {this.props.match.params.id} barcodes....</h1>
            
        <hr/>
        
        <div align="center">
                <ReactToPrint
                    trigger={() => <button className="btn btn-primary btn-sm"><i className="fa fa-print"></i> Print</button>}
                    content={() => this.componentRef}
                />
                <hr/>
                <div className="barcode-viewer">
                    <BarcodePrint noBar={this.props.match.params.id} st={this.props.match.params.st} ref={el => (this.componentRef = el)} />
                </div>
        </div>
      </div>
    )
  }
}

export default BarcodePrinter;

