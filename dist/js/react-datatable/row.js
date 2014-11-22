/** @jsx React.DOM */
var React = require('react');

var RDTCell = require('./cell.js');

/**
 * React Component as a row
 *
 */
var RDTRow = React.createClass({displayName: 'RDTRow',

    getInitialState: function() {
        return { record : this.props.record };
    },

    render: function() {

        var cols = this.props.config.cols;
        var record = this.state.record;
        var ds = this.props.ds;

        return (
            React.createElement("tr", {'data-index': this.props.index}, 
            
                cols.map(function (col,idx) {
                    return React.createElement(RDTCell, {index: this.props.index, key: idx, ds: ds, col: col, property: col.property, record: record, path: col.path})
                }.bind(this))
            
            )
        )

    }
});


module.exports = RDTRow;