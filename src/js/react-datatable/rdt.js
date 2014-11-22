/** @jsx React.DOM */
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
}

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
            pagerState = this.pager.state()
        }

        this.setState({ pager : pagerState });
    },

    onDsChangeEvent : function() {
        //listen and then notify listener
        if ( this.props.onChange ) {
            this.props.onChange();
        }
    },

    getInitialState: function () {

        this.ds = new DataSource(this.props.config,this.props.datasource);
        this.ds.on("recordAdded",this.onDsChangeEvent);
        this.ds.on("recordUpdated",this.onDsChangeEvent);
        if ( this.props.config.pager ) {
            this.pager = new Pager(1,this.props.config.pager.rowsPerPage,this.ds);
            return { pager : this.pager.state()  }
        }
        return { pager : null };
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

        var paginator = null;
        if ( this.pager ) {
            paginator =  <Paginator datasource={this.ds} config={this.props.config} pageChangedListener={this.pagerUpdated}/> ;

        }
        return (
            <div>
                <div className="rdt-container" ref="container">
                    <table className={tableStyle['table']}>
                        <RDTColumn config={config} />
                        <RDTBody config={config} datasource={this.ds} pager={this.state.pager}/>
                    </table>
                </div>
                {paginator}
            </div>
        )

    }
});


module.exports = RDT;
