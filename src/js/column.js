/** @jsx React.DOM */
/*globals require,module */
/* jshint -W097 */
"use strict";

var React = require('react');

var DIRECTION_UP = "1";
var DIRECTION_DOWN = "-1";




var SortControl = React.createClass({
   

    
    render : function() {

        var arrowUp = (  this.props.isSortedColumn && this.props.direction === DIRECTION_UP ) ?
            "rdt-arrow-up-active" : "rdt-arrow-up-inactive";
        var arrowDown = ( this.props.isSortedColumn &&  this.props.direction === DIRECTION_DOWN ) ?
            "rdt-arrow-down-active" : "rdt-arrow-down-inactive";
        /*jshint ignore:start */
        return (<div style={ { float: "right"} }><div
            data-rdt-action="sort" data-col-property={this.props.col.property}   data-sort-direction={DIRECTION_UP} className={"rdt-arrow-up " + arrowUp}></div><div style={{"marginBottom": "5px"}}></div>
                <div data-rdt-action="sort" data-col-property={this.props.col.property}   data-sort-direction={DIRECTION_DOWN} className={"rdt-arrow-down " + arrowDown}></div></div>)
        /*jshint ignore:end */
    } 
    
});

/**
 * React Component for Columns
 *
 */
var RDTColumn = React.createClass({
    
    
    recordsSorted : function(sortedInfo) {
        this.setState({sortInfo: sortedInfo})
    },
    getInitialState : function() {
        var datasource =this.props.datasource;
        datasource.on("RECORDS_SORTED",this.recordsSorted);
        return { datasource : this.props.datasource, showFilter: false };
    },
    componentWillReceiveProps: function(nextProps) {
        if ( nextProps.datasource ) {
            nextProps.datasource.on("RECORDS_SORTED", this.recordsSorted);
        }
    },

    render: function() {

        var cols = this.props.config.cols;
        var datasource = this.state.datasource;

        var sortedInfo = this.state.sortInfo; //datasource.sortedInfo;
        /*jshint ignore:start */
        return(
            
            <thead onClick={this.onClick}>
                <tr>{
                    cols.map(function(col,idx) {
                        var isSortedColumn = false;
                        var direction = null;
                        var sortable = col.sortable;
                        var sortControl = null;
                        
                        if ( col.sosortedInfo && sortedInfo.property === col.property ) {
                            isSortedColumn = true;
                            direction = sortedInfo.direction;
                        }
                        
                        if ( sortable ) {
                            sortControl = <SortControl isSortedColumn={isSortedColumn} direction={direction} col={col} />
                        }
                        return (
                            <td data-th-key={col.property} key={col.property + "-th-" + idx}>
                                <div><span>{col.header}</span>{sortControl}</div>
                            </td>
                        )
                    }.bind(this))
                }
                </tr>
            </thead>
            
        )
        /*jshint ignore:end */

    }
});


module.exports = RDTColumn;
