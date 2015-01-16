/** @jsx React.DOM */
/*globals require,module */
/* jshint -W097, esnext: true */
"use strict";

var record = require("./record");

var EventEmitter = require("events").EventEmitter;
var utils = require("./utils");


var EVENTS = {
    RECORD_UPDATED : "RECORD_UPDATED",
    RECORD_ADDED : "RECORD_ADDED",
    RECORDS_SORTED : "RECORDS_SORTED"
};

var createMapper = function(__userMapper,config) {
    return function(rawRec,index) {
        var recToMap = null;
        if ( typeof __userMapper === 'function' ) {
            recToMap = __userMapper(rawRec);
        } else {
            recToMap = rawRec;
        }
        return new record(index,recToMap,config);
    };  
};

/**
 * Create a new datasource using records array as a backing dataset
 * 
 * @param records
 * @constructor
 */
var DataSource = function(records,userMapper,config) {
    this.id = new Date();
    var mapper = createMapper(userMapper,config);
    if ( records instanceof Array ) {
        if (mapper) {
            this.records = records.map(mapper);
        } else {
            this.records = records;
        }
    } else {
        var dataField = records.data;
        var data = records.datasource;
        this.records =  data[dataField];
    }
    this.config = config;
    if ( config ) {
        this.properyConfigMap = {};
        this.config.cols.forEach( col => {
            this.properyConfigMap[col.property] = col;
        });
    }
    this.sortedInfo = null;
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


/**
 * Append a record
 *  
 * @param record
 */
DataSource.prototype.append = function(record) {
    this.records.push(record);
    this.emit(EVENTS.RECORD_ADDED,record);
};


DataSource.prototype.length = function() {
    return this.records.length;
};

/**
 * FIXME: Still broken, we need to be able to sort depending on type
 *
 * @param property
 * @param direction
 */
DataSource.prototype.sort = function(property,direction) {
    
    this.records.sort(  ( o1,o2 ) => {
        var reverseDir = 1;
        if ( direction === "-1" ) {
             reverseDir = -1;
        }
        var col = this.properyConfigMap[property];
        
        var v1 = utils.extractValue(property,col.path,o1.__record);
        var v2 = utils.extractValue(property,col.path,o2.__record);
        
         
        var type = utils.extractSortableType(v1,v2);
        return utils.compare(type,v1,v2,reverseDir);
        
    });
    
    this.emit(EVENTS.RECORDS_SORTED, { property: property, direction : direction});


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
    record.update(property,newValue);

    //FIXME, we should get current value and pass as old value
    this.emit(EVENTS.RECORD_UPDATED,record,recordIdx,property,newValue);
};


module.exports = DataSource;