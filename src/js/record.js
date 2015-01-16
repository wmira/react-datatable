/** @jsx React.DOM */
/*globals require,module */
/* jshint -W097, esnext: true */
"use strict";

var utils = require("./utils");

/**
 * Wraps a record within a datasource
 *  
 */
var record = function(index,__record,config) {
    this.__record = __record;
    this.index = index;
    this.config = config;
    this.colsMap = {};
    
    this.config.cols.forEach( column => {
        this.colsMap[column.property] = column;
    });
};

/**
 * Retrieve the value
 *
 * @param property
 * @returns {*}
 */
record.prototype.getValue = function(property) {
   
    var path = this.colsMap[property].path;
    return utils.extractValue(property,path,this.__record);
};


record.prototype.update = function(property,newValue) {
    
    var config = this.colsMap[property];
    var record = this.__record;
    var path = config.path ? config.path : property;
    
    var setter = config.setter ?

        //setter can be a string or an actual function -- derp
        function(newValue,property,config) {
            var thesetter = config.setter;
            if ( typeof(config.setter) === 'string' ) {
                record[config.setter](newValue, property, config);
            } else {
                //assume function

                thesetter.call(record,newValue, property, config);
            }

        }:
        function() {
            path.split(".").reduce(function(prev,current,index,arr) {
                if ( index === (arr.length - 1) ) {
                    //we are at the end
                    if ( typeof prev[current] === 'function' ) {
                        prev[current](newValue);
                    } else {
                        prev[current] = newValue;
                    }
                } else {
                    return prev[current];
                }
            },record);
        } ;
    setter.call(record,newValue,property,config);
};
module.exports = record;