
'use strict';

var Pager = require('./pager');

var DataSource = function(config,dsDef) {
    this.records = dsDef.data;
};


DataSource.prototype.dataAtIdx = function(index) {
    return this.data[index];
};

/**
 * If key is defined then this data can be accessed using the key
 *
 * @param key
 */
DataSource.prototype.get = function(key) {
    alert("get not implemented");
};


DataSource.prototype.length = function() {
    return this.data.length;
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

module.exports = DataSource;