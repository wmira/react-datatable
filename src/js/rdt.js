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
    /**
     * Sort using the property
     * @param property
     */
    sort : function(property) {

    },
    
    componentWillReceiveProps : function(newProps) {
        this.componentDidMount(newProps);
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
            pagerState = this.pager.state()
        }

        this.setState({ pager : pagerState });
    },

    onDsChangeEvent : function() {
        if ( this.props.onChange ) {
            this.props.onChange();
        }
    },


    getInitialState: function () {

        var propsToUse = this.props;
        var datasource =null;
        if ( propsToUse.data  ) {
            datasource = new DataSource(propsToUse.data,this.props.mapper,this.props.config);
        } else if ( propsToUse.datasource ) {
            datasource = propsToUse.datasource;
        }
        
        var pager =  null; 
        if (this.props.config.pager  )
        if ( this.props.config.pager ) {
            pager = new Pager(1, this.props.config.pager.rowsPerPage, this.ds);
        }
        return { datasource: datasource,pager :pager };
        
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
        
        if ( this.state.pager ) {
            paginator =  <Paginator datasource={datasource} config={this.props.config} pageChangedListener={this.pagerUpdated}/> ;

        }

        return (
            <div onClick={this.onClick}>
                <div className="rdt-container" ref="container">
                    <table className={tableStyle['table']}>
                        <RDTColumn datasource={datasource} config={config} />
                        <RDTBody config={config} datasource={datasource} pager={this.state.pager}/>
                    </table>
                </div>
                {paginator}
            </div>
        )

    }



    /**
     * Return the underlying datasource if argument is null or use the new datasource provided
     *
     *
     * @returns {*|Function|datasource|RDT.getInitialState.datasource|paginator.datasource|RDT.render.datasource}
     */
    
/*
    setDataSource : function(datasource) {

        if ( typeof datasource.then === "function" ) {
            datasource.then(function(data) {
                this.setState({datasource: new DataSource(data,this.props.mapper,this.props.config)});
            }.bind(this));
        } else {
            this.setState({datasource: datasource});

        }
    }*/
    
});


module.exports = RDT;
