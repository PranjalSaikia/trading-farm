import React, { Component } from 'react';
import { PostData, GetData } from './../api/service';
import Loader from './Loader/Loader';

export default class BarContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields:{
                no_bars: '',
                st_bars: ''
            }, 
            isLoading: true,
            error: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    }

    onSubmit(e) {
        e.preventDefault();
        let data = this.state.fields;
        let no_bars = this.state.fields.no_bars;
        let st_bars = this.state.fields.st_bars;


        PostData('api/set_starting_number_barcode.php', data)
        .then((resp) => console.log(resp));


        this.props.history.replace('/barcode/' + no_bars + '/' + st_bars);
    }

    componentDidMount(){
        let initialState = this.state.fields;
        GetData('api/get_starting_number_barcode.php').then(function(data){
            if(data.status === '200'){
                initialState['st_bars'] =  data.data;
                this.setState({ fields: initialState, isLoading: false });
            }
        }.bind(this));
    }
  render() {
    return (
        <div className="container">

            <h1>Barcode Genaration</h1>
            <Loader show={this.state.isLoading} text="Loading data....Please wait" />
            <hr />
            {this.state.error ? <div className="alert alert-danger">this.state.error</div> : null}
            
            <form
                className="form"
                onSubmit={this.onSubmit}

            >

                <div className="form-group">
                    <label>No of labels</label>
                    <input
                        name="no_bars"
                        placeholder="No of barcodes needed"
                        type="number"
                        onChange={this.handleChange.bind(this, 'no_bars')}
                        value={this.state.fields['no_bars']}
                        className="form-control"
                        required={true}
                    />
                </div>

                <div className="form-group">
                    <label>Starting No</label>
                    <input
                        name="st_bars"
                        placeholder="Starting No"
                        type="number"
                        onChange={this.handleChange.bind(this, 'st_bars')}
                        value={this.state.fields['st_bars']}
                        className="form-control"
                        required={true}
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-sm" type="submit">Generate</button>
                </div>

            </form>

        </div>
    )
  }
}
