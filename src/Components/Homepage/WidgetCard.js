import React, { Component } from 'react';
import './css/widgetcard.css';

class WidgetCard extends Component {
  render() {
    return (
      <div className="widget-card" style={{backgroundColor: this.props.color}}>
        <div className="widget-card-grid">
            <div className="widget-image">
                <i className={'fa fa-' + this.props.icon + ' fa-5x'}></i>
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

export default WidgetCard;