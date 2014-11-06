/** @jsx React.DOM */
var React = require('react');


/**
 * React Component for Cell.
 *
 * TODO: We should be on edit mode on 2 clicks. 1st should have the td focused
 *
 *
 *
 */
var RDTCell = React.createClass({displayName: 'RDTCell',

    getDisplayStyle : function() {

        var element = this.refs.td.getDOMNode();
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        var left = element.offsetLeft;
        var top = element.offsetTop;

        return {
            width: width,
            height: height,
            top: top,
            left: left
        };

    },

    componentDidMount: function () {
        if ( this.refs.input ) {
            this.refs.input.getDOMNode().focus();
        }
    },

    componentDidUpdate: function () {
        if ( this.refs.input ) {
            this.refs.input.getDOMNode().focus();
        }
    },

    onClickHandler : function() {
        if ( !this.state.isEditMode ) {
            this.setState( { record : this.state.record, property : this.state.property, editMode : true  } );
        }

    },

    onKeyUp : function(event) {

        var type = event.type;
        var keyCode = event.which;

        if ( type==='keyup' && keyCode === 13 && this.refs.input ) {
            //update the value
            this.state.record[this.state.property] = this.refs.input.getDOMNode().value;
            this.setState( { record : this.state.record, property : this.state.property, editMode : false } );
            if ( this.props.onCellUpdated ) {
                this.props.onCellUpdated();
            }
        }

    },

    onInputChange : function(event) {

    },

    onBlur : function() {

        this.setState( { record : this.state.record, property : this.state.property, editMode : !this.state.editMode  } );
    },

    getInitialState: function() {
        return { record : this.props.record, property : this.props.property, editMode : false  };
    },


    createEditor : function() {

    },

    /**
     *
     *
     * @returns {XML}
     */
    createEditor : function() {
        var record = this.state.record;
        var property = this.state.property;


        return ( React.createElement("input", {onKeyUp: this.onKeyUp, ref: "input", onBlur: this.onBlur, className: "rdt-editor", 
            style: this.getDisplayStyle(), onKeyUp: this.onKeyUp, onChange: this.onInputChange, ref: "input", defaultValue: record[property]}) );
    },



    render: function() {

        var editable = this.props.col.editable || false;
        var record = this.state.record;
        var property = this.state.property;
        var editMode = this.state.editMode;


        var value = null;

        /**
         * If there is a resolve property, then this is probably a key.
         * The resolve property points to a key/value list where we can use to lookup
         * the value
         *
         */
        if ( typeof property === 'string' ) {
            value = record[property];
            //TODO: resolve
        } else {
            //FIXME assume its a function
            value = property(record);

        }
         //FIXME ensure its a function
        if ( this.props.col.formatter ) {
            value = this.props.col.formatter(value,property,record);
        }

        var editor = null;
        if ( editMode && editable   ) {
            editor = this.createEditor();
        }
        return (
            React.createElement("td", {ref: "td", onClick: this.onClickHandler, 'data-property': property, key: property}, 
                React.createElement("div", null, value), 
                editor
            )
        )
    }
});


module.exports = RDTCell;