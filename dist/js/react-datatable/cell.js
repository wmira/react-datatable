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
    componentWillReceiveProps : function(newProps) {

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
            this.setState( { record : this.state.record, property : this.state.property, editMode : true  } );
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
            var newValue = this.convertToType(this.state.record[this.state.property],this.refs.input.getDOMNode().value);
            var datasource = this.props.ds;
            var index = this.props.index;

            datasource.updateRecord(this.props.index,this.props.property,newValue,this.props.col);

            this.setState( { record : this.state.record,  editMode : false } );

        }

    },

    onInputChange : function(event) {
        //what the hell is this one doing here..
    },

    onBlur : function() {
        this.setState(this.state);
    },

    getInitialState: function() {
        return { record : this.props.record, editMode : false };
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


        return ( React.createElement("input", {onKeyUp: this.onKeyUp, ref: "input", onBlur: this.onBlur, className: "rdt-editor", 
            style: this.getDisplayStyle(), onKeyUp: this.onKeyUp, onChange: this.onInputChange, ref: "input", defaultValue: this.getValue()}) );
    },

    getValue : function() {
        var value = "";
        var path = this.props.path;
        var record = this.state.record;
        var property = this.props.property;
        /**
         * By default, we will use record[property] if path is not given.
         * If path is provided and is a string then will uspltle record[path]
         * If path is provided and is a function then we will call the function.
         * else we dont do anything
         */
        if ( typeof property === 'string' ) {
            if ( !path ) {
                value = record[property];
                if ( typeof(value) === 'function' ) {
                    value = value.call(record);
                }
            } else {
                if ( typeof path === 'string' ) {
                    value =  path.split(".").reduce(function(previous,current) {
                        if ( !previous || !current ) {
                            return null;
                        }
                        return previous[current];
                    },record);// record[path];
                } else {
                    //TODO: function check
                    value = path(property,record);
                }
            }
        }
        return value;
    },

    render: function() {


        var record = this.state.record;
        var property = this.props.property;

        var value = this.getValue();

         //FIXME ensure its a function
        if ( this.props.col.formatter ) {
            value = this.props.col.formatter(value,property,record,React);
        }

        return (
            React.createElement("td", {ref: "td", onClick: this.onClickHandler, 'data-property': property, key: property}, 
                React.createElement("div", null, value), 
                this.createEditor()
            )
        )
    }
});


module.exports = RDTCell;
