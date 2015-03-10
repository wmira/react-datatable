/** @jsx React.DOM */
/*globals require,module */
/* jshint -W097, esnext: true */
"use strict";

var React = require('react');

var DataSource = require("./datasource");
var Pager = require("./pager");

var RDTRow = require("./row");
var RDTColumn = require("./column");
var RDTBody = require("./body");
var Paginator = require("./paginator");



var TABLE_CSS = {
    pure: {
        table: 'pure-table pure-table-bordered'
    },
    'pure-striped': {
        table: 'pure-table pure-table-bordered pure-table-striped'
    },
    bootstrap: {
        table: 'table table-bordered'
    },
    foundation: {
        table: ''
    },
    starter: {
        table: 'table2'
    }
};

/**
 * Simple Data Table using react.
 *
 *
 *  var datasource = {
 *       data: []
 *   };
 *
 *  var config = {
 *      style : 'pure',
 *       cols : [
 *           { editable: true, property: "path" , header: "First Name"  }
        ]
    };
 *
 */
var RDT = React.createClass({
    
    
    onClick : function(e) {

        var el = e.target;
        var action = el.getAttribute("data-rdt-action");
        if ( action === "sort" ) {
            var property= el.getAttribute("data-col-property");
            var direction = el.getAttribute("data-sort-direction");
            this.state.datasource.sort(property,direction);
            this.forceUpdate();
        }
    },
    
    componentWillReceiveProps : function(nextProps) {
        this.setState(this._createStateFromProps(nextProps));
    },
    nextPage : function() {
        if ( this.state.pager ) {
           // this.pager = this.pager.next();
            this.setState({ pager : this.state.pager.next() });
        }
    },

    onDsRecordUpdated : function(recordIdx,record,property,newValue) {
        if ( this.props.onDsRecordUpdated ) {
            this.props.onDsRecordUpdated(recordIdx,record,property,newValue);
        }
    },

    onDsRecordAdded : function(record) {
        if ( this.props.onDsRecordAdded ) {
            this.props.onDsRecordAdded(record);
        }
    },
    
    _createStateFromProps : function(props) {

        var state = {};

        state.datasource = new DataSource(props.data || [],props.config);
        state.datasource.on(DataSource.EVENTS.RECORD_ADDED,this.onDsRecordAdded);
        state.datasource.on(DataSource.EVENTS.RECORD_UPDATED,this.onDsRecordUpdated);
        
        if (props.config.pager  ) {
            state.pager = new Pager(1, props.config.pager.rowsPerPage, state.datasource);
        }

        return  state;
    },

    /**
     * 
     *
     * @returns {*}
     */
    getInitialState: function () {
        return this._createStateFromProps(this.props);
    },

    pagerUpdated : function(page) {
        if ( this.state.pager ) {
           // this.pager = this.pager.toPage(page);
            this.setState({ pager : this.state.pager.toPage(page) });
        }
    },

    render: function () {

        var tableStyle = TABLE_CSS[this.props.config.style];
        var config = this.props.config;
        var datasource = this.state.datasource;
        var pagerState = null;
        var paginator = null;
        /*jshint ignore:start */
        if ( this.state.pager ) {
            paginator =  <Paginator pagerState={this.state.pager.state()} datasource={datasource} config={this.props.config} pageChangedListener={this.pagerUpdated}/>

        }
        return (
            <div onClick={this.onClick} style={ {width: '100%'}}>
                <div className="rdt-container" ref="container">
                    <table className={tableStyle['table']}>
                        <RDTColumn {...this.props} datasource={datasource} />
                        <RDTBody config={config} datasource={datasource} pager={this.state.pager}/>
                    </table>
                </div>
                {paginator}
            </div>
        )
        /*jshint ignore:end */
    }


});


module.exports = RDT;
