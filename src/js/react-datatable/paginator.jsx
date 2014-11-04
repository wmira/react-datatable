/** @jsx React.DOM */
var React = require('react');


/**
 * React Component for Columns
 *
 */
var Paginator = React.createClass({

    getInitialState: function() {
        return { page: this.props.page };
    },

    componentWillReceiveProps: function(props) {
        this.setState({ page : props.page });
    },

    pageSelectionHandler : function() {
        if ( this.props.pageChangedListener ) {
            this.props.pageChangedListener(this.refs.pageSelection.getDOMNode().value);
        }
    },

    /**
     * If rendered is called it means we have a paginator
     *
     * @returns {XML}
     */
    render: function() {

        var currentPage = this.state.page;

        var pages = [];
        var maxPages = parseInt(this.props.datasource.records.length / this.props.config.pager.rowsPerPage);
        for ( var i=1; i <= maxPages; i++ ) {
            pages.push(i);
        }
        return(
            <div>
                <select value={currentPage} ref="pageSelection" onChange={this.pageSelectionHandler}>
                {
                    pages.map(function (pageNum) {
                        return <option value={pageNum}>{pageNum}</option>
                    })
                }
                </select>
            </div>
        )

    }
});


module.exports = Paginator;