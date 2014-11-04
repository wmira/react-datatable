/** @jsx React.DOM */
var React = require('react');

var RDTCell = require('./cell.jsx');

/**
 * React Component as a row
 *
 */
var RDTRow = React.createClass({

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
            <tr  data-index={this.props.index}>
            {
                cols.map(function (col,idx) {
                    //FIXME, we need to parse the path to make it work for nested objects
                    return <RDTCell key={idx} onCellUpdated={this.onCellUpdated} ds={ds} col={col} property={col.property} record={data}/>
                }.bind(this))
            }
            </tr>
        )

    }
});


module.exports = RDTRow;