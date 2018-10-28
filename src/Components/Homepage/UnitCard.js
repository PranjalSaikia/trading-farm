import React, { Component } from 'react';
import './css/widgetcard.css';

class UnitCard extends Component {
  render() {
    return (
      <div className="widget-card">
        <div className="widget-card-grid">
            <div className="widget-image-unit">
                    <span class="fa-stack">
                        <span class="fa fa-circle-o fa-5x fa-stack-2x"></span>
                        <strong class="fa-stack-1x">
                            {this.props.number}
                        </strong>
                    </span>
            </div>

            <div className="widget-text">
                <div className="widget-header">
                    {this.props.title}
                </div>
                <div className="widget-value">
                    {this.props.value}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default UnitCard;