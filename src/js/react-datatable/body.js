/** @jsx React.DOM */
var React = require('react');

var RDTRow = require("./row");

/**
 * React Component for Columns
 *
 */
var RDTBody = React.createClass({

    componentWillReceiveProps : function(newprops) {
        this.setState({ pager: newprops.pager, ds : newprops.datasource});
    },

    getInitialState: function() {
        return { pager: this.props.pager, ds : this.props.datasource};
    },

    render: function() {


        return(
            <tbody>
                        {
                            this.state.ds.map(this.state.pager,function(data,idx,realIdx) {

                                //if this is a normal array map function, then realIdx here is the array
                                //ths is why we do the check here
                                //FIXME: we might want to move this
                                var id = idx;
                                if ( realIdx && !Array.isArray(realIdx)) {
                                    id = realIdx;
                                }
                                return  <RDTRow ds={this.state.ds} key={id}  data={data} config={this.props.config} />
                            }.bind(this))
                            }
            </tbody>
        )

    }
});


module.exports = RDTBody;