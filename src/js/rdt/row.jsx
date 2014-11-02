/** @jsx React.DOM */
var React = require('react');


/**
 * React Component as a row
 *
 */
var RDTRow = React.createClass({

    getInitialState: function() {
        return { data : this.props.data };
    },

    render: function() {

        var cols = this.props.config.cols;
        var data = this.state.data;

        return (
            <tr  data-index={this.props.index}> {
                    cols.map(function (col) {
                        //FIXME, we need to parse the path to make it work for nested objects
                        return <td data-property={col.property} key={col.property}>{data[col.property]}</td>
                    })
                }

            </tr>
        )

    }
});


module.exports = RDTRow;