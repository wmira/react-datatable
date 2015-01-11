/** @jsx React.DOM */
/*globals require,module */
"use strict";
var Datasource = require("./datasource");
var Promise = require("bluebird");

var ds = {
    
    fromArray : function(inArray,mapper) {

        return new Promise(function(resolve,reject) {
            var array = inArray || [];
            var records = array;
            if ( mapper ){
                records = array.map( mapper );
            }
            resolve(new Datasource(records));
        });
    },
    
    fromPromise : function(promise) {
        //promise of a promise of a promise.
        return new Promise(function(resolve,reject) {
            promise.then(function(records) {
                resolve(new Datasource(records));
            });
        });
        
    },

    /**
     *
     *
     * @param inArray
     * @param mapper
     * @returns {DataSource}
     */
    create : function(inArray,mapper) {
        return new Datasource(mapper ? inArray.map(mapper) : inArray);
    }
};

module.exports = ds;