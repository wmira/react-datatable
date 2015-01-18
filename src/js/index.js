/*globals require,module */
/* jshint -W097, esnext: true */
"use strict";

var RDT = require("react-render-wrapper")(require("react"),require("./rdt"));


/**
 * Helpers
 *  
 * @type {{classname: Function}}
 */
var Decorator = {
    
    styles : function(clsname,style,cellClassname,cellStyle) {
        return function() {
            return {
                className : clsname,
                style : style,
                cellClassName: cellClassname,
                cellStyle : cellStyle
            };
        };
    }
    
};

module.exports = RDT;