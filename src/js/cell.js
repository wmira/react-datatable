/** @jsx React.DOM */
/*globals require,module */
/* jshint -W097, esnext: true */
"use strict";
    
var React = require('react');

var utils = require("./utils");

/**
 * React Component for Cell.
 *
 * TODO: We should be on edit mode on 2 clicks. 1st should have the td focused
 *
 *
 *
 */
var RDTCell = React.createClass({
    componentWillReceiveProps : function(newProps) {
        this.setState({ editMode : false });
    },

    /**
     * problem is if this is null
     *
     * @param currentValue
     * @param newValue
     * @returns {*}
     */
    convertToType : function(currentValue,newValue) {
        if ( (typeof currentValue) === "number" ) {
            if ( currentValue % 1 === 0 ) {
                return parseInt(newValue);
            } else {
                return parseFloat(newValue);
            }
        } else {
            //assume it is a number for now
            //FIXME do for other types, move to a function
            return newValue;
        }
    },

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

        if ( !this.state.editMode && this.props.col.editable ) {
            this.setState( {  editMode : true  } );
        }

    },

    onKeyUp : function(event) {

        var type = event.type;
        var keyCode = event.which;
        var ENTER_KEY = 13;
        if ( type==='keyup' && keyCode === ENTER_KEY && this.refs.input ) {

            /**
             * FIXME: if we can't determine the type we should get it from the config as an option
             *
             */
            var newValue = this.convertToType(this.props.record[this.props.property],this.refs.input.getDOMNode().value);
            var datasource = this.props.datasource;
            var index = this.props.index;

            datasource.updateRecord(this.props.index,this.props.property,newValue,this.props.col);

            this.setState( {  editMode : false } );
            if ( this.props.onCellChange ) {
                this.props.onCellChange();
            }


        }

    },


    onBlur : function() {
        this.setState({ editMode : false });
    },

    getInitialState: function() {
        return { editMode : false };
    },



    /**
     *
     *
     * @returns {XML}
     */
    createEditor : function() {
        var //record,property = null,
            editable = this.props.col.editable || false,
            editMode = this.state.editMode;

        //we need to check here because at initial pass getDisplayStyle will not resolve to anything.
        //it has the be rendered first
        if ( !editable || !editMode  ) {
            return null;
        }

        //TODO: either use built in editors or use the one returned by editor attribute
        //editor can be a react component
        //

        return ( <input  onBlur={this.onBlur} className="rdt-editor"
            style={this.getDisplayStyle()} onKeyUp={this.onKeyUp} onChange={this.onInputChange} ref="input"  defaultValue={this.getValue()} /> );
    },
    
    getValue : function() {
        var property = this.props.property;
        return utils.extractValue(property,this.props.datasource.propertyConfigMap[property].path,this.props.record);
    },

    render: function() {


        var record = this.props.record;
        var property = this.props.property;

        var value = this.getValue();

         //FIXME ensure its a function
        if ( this.props.col.formatter ) {
            //pass the underlying record
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
