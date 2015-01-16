/** @jsx React.DOM */
var React = require('react');
var RDTRow = require("./row");

/**
 * React Component for Body
 *
 */
var RDTBody = React.createClass({


    render: function() {

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
                        return <RDTRow datasource={this.props.datasource} index={id}  key={id}  record={data} config={this.props.config} />
                    }.bind(this))
                }
            </tbody>
        )

    }
});


module.exports = RDTBody;