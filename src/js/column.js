/** @jsx React.DOM */
var React = require('react');

var DIRECTION_UP = "1";
var DIRECTION_DOWN = "-1";

var SortControl = React.createClass({
   

    
    getInitialState : function() {
        return { direction: this.props.direction, isSortedColumn : this.props.isSortedColumn };
    },
    
    componentWillReceiveProps : function(next) {
        if ( this.props.isSortedColumn !== next.isSortedColumn ) {
            this.setState({direction: next.direction, isSortedColumn : next.isSortedColumn });
        }
    },
    
    render : function() {
       
        var arrowUp = this.state.isSortedColumn && ( this.state.direction === DIRECTION_UP )
                ? "rdt-arrow-up-active" : "rdt-arrow-up-inactive";
        var arrowDown = this.state.isSortedColumn && ( this.state.direction === DIRECTION_DOWN )
            ? "rdt-arrow-down-active" : "rdt-arrow-down-inactive";
        

        
        return (<div style={ { float: "right"} }><div
            data-rdt-action="sort" data-col-property={this.props.col.property}   data-sort-direction={DIRECTION_UP} className={"rdt-arrow-up " + arrowUp}></div><div style={{"marginBottom": "5px"}}></div>
                <div data-rdt-action="sort" data-col-property={this.props.col.property}   data-sort-direction={DIRECTION_DOWN} className={"rdt-arrow-down " + arrowDown}></div></div>)
    } 
    
});

/**
 * React Component for Columns
 *
 */
var RDTColumn = React.createClass({
    
    
    getInitialState : function() {
      return { datasource : this.props.datasource };
    },

    render: function() {

        var cols = this.props.config.cols;
        var datasource = this.state.datasource;
        
        var sortedInfo = datasource.sortedInfo;
        console.log(datasource);
       
        return(
            <thead onClick={this.onClick}>
                <tr>{
                    cols.map(function(col,idx) {
                        var isSortedColumn = false;
                        var direction = null;

                        if ( sortedInfo && sortedInfo.property === col.property ) {
                            isSortedColumn = true;
                            direction = sortedInfo.direction;
                        }
                        return (
                            <td data-th-key={col.property} key={col.property + "-th-" + idx}>
                                <div><span>{col.header}</span><SortControl isSortedColumn={isSortedColumn} direction={direction} col={col} /></div>
                            </td>
                        )
                    }.bind(this))
                }
                </tr>
            </thead>
        )

    }
});


module.exports = RDTColumn;
