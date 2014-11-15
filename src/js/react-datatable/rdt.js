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
        this.ds.records.push(record);
        var pagerState = null;
        if ( this.pager ) {
            pagerState = this.pager.state()
        }

        this.setState({ pager : pagerState });
    },



    getInitialState: function () {

        this.ds = new DataSource(this.props.config,this.props.datasource);
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


/*
 <tbody>
 {
 this.ds.map(this.state.pager,function(data,idx,realIdx) {

 //if this is a normal array map function, then realIdx here is the array
 //ths is why we do the check here
 //FIXME: we might want to move this
 var id = idx;
 if ( realIdx && !Array.isArray(realIdx)) {
 id = realIdx;
 }
 return  <RDTRow ds={this.ds} key={id}  data={data} config={config} />
 }.bind(this))
 }
 </tbody>
 */