/** @jsx React.DOM */
/*globals require,module */
/* jshint -W097 */
"use strict";
    
var React = require('react');

var RDTCell = require('./cell.js');

/**
 * React Component as a row
 *
 */
var RDTRow = React.createClass({
    
    /*
    componentWillReceiveProps: function(nextProps) {
        this.setState({record : nextProps.record});
    },

    getInitialState: function() {
        return { record : this.props.record  };
    },
    


    onCellChange : function() {
       this.setState( { record : this.props.record });
    },*/

    render: function() {

        var cols = this.props.config.cols;
        var record = this.props.record;

        return (
            <tr  data-index={this.props.index}>
            {
                cols.map(function (col,idx) {
                    return <RDTCell config={this.props.config} onCellChange={this.onCellChange} index={this.props.index} key={idx} datasource={this.props.datasource} col={col} property={col.property} record={record} path={col.path}/>
                }.bind(this))
            }
            </tr>
        )

    }
});


module.exports = RDTRow;