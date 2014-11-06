/** @jsx React.DOM */
var React = require('react');

var RDTCell = require('./cell.js');

/**
 * React Component as a row
 *
 */
var RDTRow = React.createClass({displayName: 'RDTRow',

    getInitialState: function() {
        return { data : this.props.data };
    },

    onCellUpdated : function() {
        this.setState( { data : this.props.data } ); //FIXME this should be a record
    },
    render: function() {

        var cols = this.props.config.cols;
        var data = this.state.data;
        var ds = this.props.ds;

        return (
            React.createElement("tr", {'data-index': this.props.index}, 
            
                cols.map(function (col,idx) {
                    //FIXME, we need to parse the path to make it work for nested objects
                    return React.createElement(RDTCell, {key: idx, onCellUpdated: this.onCellUpdated, ds: ds, col: col, property: col.property, record: data})
                }.bind(this))
            
            )
        )

    }
});


module.exports = RDTRow;