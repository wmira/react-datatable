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
var RDTCell = React.createClass({

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

    onClickHandler : function(event) {

        var target = event.target;

        if ( !this.state.isEditMode && this.props.editable ) {
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

        this.setState( { path: this.state.path, record : this.state.record, property : this.state.property, editMode : !this.state.editMode } );
    },

    getInitialState: function() {
        return { record : this.props.record, property : this.props.property, editMode : false, path: this.props.path  };
    },



    /**
     *
     *
     * @returns {XML}
     */
    createEditor : function() {
        var record,property = null,
            editable = this.props.col.editable || false,
            editMode = this.state.editMode;

        //we need to check here because at initial pass getDisplayStyle will not resolve to anything.
        //it has the be rendered first
        if ( !editable || !editMode  ) {
            return null;
        }

        record = this.state.record;
        property = this.state.property;

        return ( <input onKeyUp={this.onKeyUp} ref="input" onBlur={this.onBlur} className="rdt-editor"
            style={this.getDisplayStyle()} onKeyUp={this.onKeyUp} onChange={this.onInputChange} ref="input"  defaultValue={record[property]} /> );
    },



    render: function() {


        var record = this.state.record;
        var property = this.state.property;
        var path = this.state.path;
        var editMode = this.state.editMode;


        var value = "";

        /**
         * By default, we will use record[property] if path is not given.
         * If path is provided and is a string then will use record[path]
         * If path is provided and is a function then we will call the function.
         * else we dont do anything
         */
        if ( typeof property === 'string' ) {
            if ( !this.state.path ) {
                console.log("path is not defined.." + property);
                value = record[property];
            } else {
                //TODO: support for nested objects
                if ( typeof path === 'string' ) {
                    console.log('string path');
                    value = record[path];
                } else {
                    //TODO: function check
                    console.log('funciton path');
                    value = path(property,record);
                }
            }
        }

         //FIXME ensure its a function
        if ( this.props.col.formatter ) {
            value = this.props.col.formatter(value,property,record,React);
        }

        return (
            <td ref="td" onClick={this.onClickHandler} data-property={property} key={property}>
                <div>{value}</div>
                {this.createEditor()}
            </td>
        )
    }
});


module.exports = RDTCell;