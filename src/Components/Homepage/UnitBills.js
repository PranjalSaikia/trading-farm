import React, { Component } from 'react'
import WidgetCard from './WidgetCard';
import UnitCard from './UnitCard';

class UnitBills extends Component {
    render() {
        return (
            <div style={{ marginRight: '13px' }}>
                <div className="row">
                    <div className="col-md-4">

                        <UnitCard
                            number="1"
                            title="Unit 1 Bills"
                            value="1622"
                        />
                    </div>

                    <div className="col-md-4">
                        <UnitCard
                            number="2"
                            title="Unit 2 Bills"
                            value="2290"
                        />
                    </div>

                    <div className="col-md-4">
                        <UnitCard
                            number="3"
                            title="Unit 3 Bills"
                            value="50"
                        />
                    </div>


                </div>
            </div>
        )
    }
}

export default UnitBills;
