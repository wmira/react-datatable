/** @jsx React.DOM */
/*globals require,module */
/* jshint -W097, esnext: true */
"use strict";

var React = require('react');
var RDTRow = require("./row");

/**
 * React Component for Body
 *
 */
var RDTBody = React.createClass({
    
    handleRecordUpdate : function(record,recordIdx,property,newValue) {
        this.refs[recordIdx].forceUpdate();
    },
    
    componentDidMount : function() {
        this.props.datasource.on("RECORD_UPDATED",this.handleRecordUpdate);
    },

    render: function() {
        /*jshint ignore:start */
        return(
            <tbody>
                {
                    this.props.datasource.map(this.props.pager, function (data, idx, realIdx) {

                        //if this is a normal array map function, then realIdx here is the underlying array
                        //if the map came from us, then realIdx is the real index. if we are on a page, then idx will point to
                        //the index on the current view
                        var id = idx;
                        if (realIdx && !Array.isArray(realIdx)) {
                            id = realIdx;
                        }
                        return <RDTRow ref={id} datasource={this.props.datasource} index={id}  key={id}  record={data} config={this.props.config} />
                    }.bind(this))
                }
            </tbody>
        )
        /*jshint ignore:end */

    }
});


module.exports = RDTBody;