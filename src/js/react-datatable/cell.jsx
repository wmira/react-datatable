/** @jsx React.DOM */
var React = require('react');


/**
 * React Component for Columns
 *
 */
var RDTCell = React.createClass({

    onClickHandler : function() {
        if ( !this.state.isEditMode ) {
            //set to edit mode
        }
        this.setState();
    },

    getInitialState: function() {
        return { record : this.props.record, property : this.props.property  };
    },

    render: function() {


        var record = this.state.record;
        var property = this.state.property;
        var editMode = this.state.isEditMode;

        return (
           <td onClick={this.onClickHandler} data-property={property} key={property}>
            <div>{record[property]}</div>
           </td>
        )

    }
});


module.exports = RDTCell;