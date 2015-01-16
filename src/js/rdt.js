/** @jsx React.DOM */
/*globals require,module */
/* jshint -W097 */
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
        if ( this.pager ) {
            this.pager = this.pager.next();
            this.setState({ pager : this.pager.state() });
        }
    },

    add : function(record) {
        this.ds.add(record);
        var pagerState = null;
        if ( this.pager ) {
            pagerState = this.pager.state();
        }

        this.setState({ pager : pagerState });
    },

    onDsChangeEvent : function() {
        if ( this.props.onChange ) {
            this.props.onChange();
        }
    },
    
    _createStateFromProps : function(props) {

        var datasource = null;
        var pager =  null;
        if ( props.data  ) {
            datasource = new DataSource(props.data,props.mapper,props.config);

        } else if ( props.datasource ) {
            datasource = props.datasource;
        } 
        if ( !datasource ) {
            datasource = new DataSource([],props.mapper,props.config);
        }

        
        if (props.config.pager  ) {
            if (props.config.pager) {
                pager = new Pager(1, props.config.pager.rowsPerPage, datasource);
            }
        }
        return { datasource: datasource,pager :pager };
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
        if ( this.pager ) {
            this.pager = this.pager.toPage(page);
            this.setState({ pager : this.pager.state() });
        }
    },

    render: function () {

        var tableStyle = TABLE_CSS[this.props.config.style];
        var config = this.props.config;
        var datasource = this.state.datasource;

        var paginator = null;
        /*jshint ignore:start */
        if ( this.state.pager ) {

            paginator =  <Paginator datasource={datasource} config={this.props.config} pageChangedListener={this.pagerUpdated}/> ;

        }

        return (
            <div onClick={this.onClick}>
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
