/** @jsx React.DOM */
/*globals require,module */
/* jshint -W097, esnext: true */
"use strict";

var EventEmitter = require("events").EventEmitter;
var utils = require("./utils");


var EVENTS = {
    RECORD_UPDATED : "RECORD_UPDATED",
    RECORD_ADDED : "RECORD_ADDED",
    RECORDS_SORTED : "RECORDS_SORTED"
};


var indexRecords = function() {
    
    var colsMap = this.propertyConfigMap;
    var records = this.records;
    var i;
    
    var indexdb = {};
    
    for ( i=0; i < records.length; i++ ) {
        var record= records[i];
        Object.keys(colsMap).forEach( key => {
            var col = colsMap[key];
            var property = col.property;
            var index = indexdb[property] || ( indexdb[property] ={} );
            
            var value = utils.extractValue(property,col.path,record);
            var arr = index[value] || ( index[value] = []);
            arr.push(i);
        });
    }
    
    //console.log(indexdb);
    
};

/**
 * Create a new datasource using records array as a backing dataset
 * 
 * @param records
 * @constructor
 */
var DataSource = function(records,config) {
    
    //the hell is this doing here
    this.id = new Date();

    if ( records instanceof Array ) {
        this.records = records;
    } else {
        var dataField = records.data;
        var data = records.datasource;
        this.records =  data[dataField];
    }
    this.config = config;
    if ( this.config ) {
        this.propertyConfigMap = {};
        this.config.cols.forEach( col => {
            this.propertyConfigMap[col.property] = col;
        });
    }

    //indexRecords.call(this);
};


DataSource.EVENTS = EVENTS;

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
        var col = this.propertyConfigMap[property];
        
        var v1 = utils.extractValue(property,col.path,o1);
        var v2 = utils.extractValue(property,col.path,o2);
        
         
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
DataSource.prototype.updateRecord = function(recordIdx,property,newValue) {

    var record = this.records[recordIdx];
    utils.updateRecord(property,newValue,this.propertyConfigMap[property],record);
    //FIXME, we should get current value and pass as old value
    this.emit(EVENTS.RECORD_UPDATED,recordIdx,record,property,newValue);
};


module.exports = DataSource;