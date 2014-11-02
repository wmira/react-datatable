/** @jsx React.DOM */
var React = require('react');


/**
 * Editor component.
 *
 */
var RDTEditor = React.createClass({

    createState: function (props) {
        var inputStyle = {
            width: props.editor.display.width,
            height: props.editor.display.height
        };

        var displayStyle = props.editor.display;
        displayStyle["zIndex"] = 10;

        var value = props.editor.record[props.editor.property];
        console.log({ inputStyle: inputStyle, displayStyle: displayStyle, value: value });
        return { inputStyle: inputStyle, displayStyle: displayStyle, value: value };
    },

    getInitialState: function () {
        return this.createState(this.props);
    },

    componentWillReceiveProps: function (props) {
        this.setState(this.createState(props));
    },

    componentDidMount: function () {
        this.refs.input.getDOMNode().focus();
    },

    componentDidUpdate: function () {
        this.refs.input.getDOMNode().focus();
    },

    onInputChange: function (event) {
        console.log("input change..");
        //this.setState({value: event.target.value});
    },

    /**
     * Listen to keyboard events
     *
     * @param event
     */
    onKeyUp : function(event) {
        var keyCode = event.charCode;

        if ( keyCode === 13 ) {
            //update the value

        }
    },

    render: function () {

        var inputStyle = this.state.inputStyle;
        var displayStyle = this.state.displayStyle;

        return (
            <div  className="rdt-editor" style={displayStyle}>
                <input onKeyUp={this.onKeyUp} onChange={this.onInputChange} ref="input" style={inputStyle} defaultValue={this.state.value} />
            </div>
            );

    }
});


module.exports = RDTEditor;