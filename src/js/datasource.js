/** @jsx React.DOM */
/*globals require,module */
"use strict";

var EventEmitter = require("events").EventEmitter;


/**
 * Create a new datasource using records array as a backing dataset
 * 
 * @param records
 * @constructor
 */
var DataSource = function(records,mapper) {
    
    if ( records instanceof Array ) {
        if (mapper) {
            this.records = records.map(mapper);
        } else {
            this.records = records;
        }
    } else {
        var dsRef =  records;
        var dataField = records["data"];
        var data = records["datasource"];
        this.records =  data[dataField];
    }
};


DataSource.prototype = EventEmitter.prototype;
DataSource.prototype.constructor = DataSource;

/**
 * Access the record at the given index
 *
 * @param index
 * @returns record
 */
DataSource.prototype.record = function(index) {
    return this.records[index];
};

DataSource.prototype.empty = function() {
   this.records = [];
    this.emit("recordsUpdated");
};
/**
 * Append a record
 *  
 * @param record
 */
DataSource.prototype.append = function(record) {
    this.records.push(record)
    this.emit("recordAdded",record);
};


DataSource.prototype.length = function() {
    return this.records.length;
};

/**
 * Maps the actual page
 * The mapper function gets the record, currentIndex and actual index
 */
DataSource.prototype.map = function(pageState,mapper) {
    if ( !pageState ) {
        return this.records.map(mapper);
    }


    var result = [];
    var counter = 0;

    for ( var i = pageState.startIdx; i < pageState.endIdx; i++ ) {

        result.push(mapper(this.records[i],counter++,i));
    }

    return result;
};

/**
 * Up
 *
 *
 * @param recordIdx
 * @param newValue
 */
DataSource.prototype.updateRecord = function(recordIdx,property,newValue,config) {

    var record = this.records[recordIdx];
    var path = config.path ? config.path : property;
    var setter = config.setter ?

        //setter can be a string or an actual function derp
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
    //FIXME, we should get current value and pass as old value
    this.emit("recordUpdated",record,recordIdx,property,newValue);
};


module.exports = DataSource;