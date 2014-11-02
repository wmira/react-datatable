
'use strict';

var DataSource = function(config) {
    //FIXME check if array or a promise or a custom function
    this.data = config.data;
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


module.exports = DataSource;