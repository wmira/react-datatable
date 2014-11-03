/** @jsx React.DOM */
var React = require('react');
var DataSource = require("./datasource");
var RDTRow = require("./row.jsx");
var RDTColumn = require("./column.jsx");


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
 *       index: ['id'], // row index to use to get to a row other than index
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

    getInitialState: function () {
        this.ds = new DataSource(this.props.datasource);
        return { editor: null };
    },

    render: function () {
        var tableStyle = TABLE_CSS[this.props.config.style];
        var config = this.props.config;


        return (
            <div className="rdt-container" ref="container">

                <table className={tableStyle['table']}>
                    <RDTColumn config={config} />
                    <tbody onClick={this.clickHandler}>
                    { this.ds.data.map(function (data, idx) {
                        //FIXME: we should do proper key check here
                        return <RDTRow ds={this.ds} key={idx} index={idx} data={data} config={config} />
                    }.bind(this))
                        }
                    </tbody>

                </table>

            </div>
        )

    }
});


module.exports = RDT;