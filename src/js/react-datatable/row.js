/** @jsx React.DOM */
var React = require('react');

var RDTCell = require('./cell.js');

/**
 * React Component as a row
 *
 */
var RDTRow = React.createClass({

    getInitialState: function() {
        return { record : this.props.record };
    },

    render: function() {

        var cols = this.props.config.cols;
        var record = this.state.record;
        var ds = this.props.ds;

        return (
            <tr  data-index={this.props.index}>
            {
                cols.map(function (col,idx) {
                    return <RDTCell index={this.props.index} key={idx} ds={ds} col={col} property={col.property} record={record} path={col.path}/>
                }.bind(this))
            }
            </tr>
        )

    }
});


module.exports = RDTRow;