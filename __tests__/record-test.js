/*globals jest,describe,it,require,expect */
/* jshint -W097,-W055 */
"use strict";


jest.dontMock('../src/js/record');
jest.dontMock('../src/js/utils');


describe('record test', function() {

    var record = require('../src/js/record');
    var utils = require('../src/js/utils');
    var config = {
        cols : [
            { property: 'key', path: 'key3' },
            { property: 'key2'}
        ]
    };
    
    var colsMap = utils.colsToMap(config);
    
    it('get correct value', function() {
       
        var obj = {  key2: 2 ,key3: 'key3' };
        
        
        var wrappedObj =  new record(1,obj,colsMap);
        
        expect(wrappedObj.getValue('key')).toBe('key3');
        expect(wrappedObj.getValue('key2')).toBe(2);

    });

    it('updates record',function() {

        var obj = {  key2: 2 ,key3: 'key3' };

        var wrappedObj =  new record(1,obj,colsMap);
        
        wrappedObj.update('key','123');
        expect(wrappedObj.getValue('key')).toBe('123');
    });

    it('updates record via setter',function() {

        var configUp = {
            cols : [
                { property: 'key', setter : 'xsetter' },
                { property: 'key2', setter : function(newval) {
                    this.key2 = newval+"hey";
                }}
            ]
        };

        var colsMapUp = utils.colsToMap(configUp);
        
        var obj = {  key: 'key', key2: 'key2' ,key3: 'key3' , xsetter : function(v) {
            this.key = v;
        }};

        var wrappedObj =  new record(1,obj,colsMapUp);

        wrappedObj.update('key2','123');
        expect(wrappedObj.getValue('key2')).toBe('123hey');

        wrappedObj.update('key','y');
        expect(wrappedObj.getValue('key')).toBe('y');
    });
});