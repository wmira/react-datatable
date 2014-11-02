/** @jsx React.DOM */
var React = require('react');
var DataSource = require("./datasource");
var RDTRow = require("./row.jsx");
var RDTColumn = require("./column.jsx");
var RDTEditor = require("./editor.jsx");

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

    /**
     * React id here contains the actual aid
     *
     * TODO: we should have 2 clicks to activate the editor. 1 will focus then edit
     *
     * @param event
     * @param reactId
     */
    /*clickHandler: function (event, reactId) {
        event.preventDefault();
        var element = event.target;
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        var left = element.offsetLeft;
        var top = element.offsetTop;

        var parentTr = element.parentNode;
        var parentIdx = parentTr.dataset.index;
        //FIXME find a way to retrieve parent node in react, we need this to handle window clicks
        var property = element.dataset.property;

        //get the record from the datasource
        var record = this.ds.dataAtIdx(parentIdx);

        var editor = {
            display: {
                width: width,
                height: height,
                top: top,
                left: left
            },
            container: this.refs.container.getDOMNode(),
            record: record,
            property: property,
            target: element
        };

        this.setState({ editor: editor });
    },
    documentClickHandler: function (event) {
        var target = event.target;
        var editor = this.state.editor;

        if (editor && ( target === editor.container || !editor.container.contains(target))) {
            this.setState({editor: null});
        }
    },

    componentDidMount: function () {
        document.addEventListener('click', this.documentClickHandler);
    },
     */
    render: function () {
        var tableStyle = TABLE_CSS[this.props.config.style];
        var config = this.props.config;

        /*
        var editor = null;
        if (this.state.editor) {
            editor = <RDTEditor key="rdt-editor" editor={this.state.editor}/>
        }*/
        //console.log("editor:" + editor);
        return (
            <div className="rdt-container" ref="container">

                <table className={tableStyle['table']}>
                    <RDTColumn config={config} />
                    <tbody onClick={this.clickHandler}>
                    { this.ds.data.map(function (data, idx) {
                        //FIXME: we should do proper key check here
                        return <RDTRow key={idx} index={idx} data={data} config={config} />
                    })
                        }
                    </tbody>

                </table>

            </div>
            )

    }
});


module.exports = RDT;