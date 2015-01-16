/*globals jest,describe,it,require,expect */
/* jshint -W097,-W055 */
"use strict";


jest.dontMock('../src/js/utils');


describe('record test', function() {

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

        
        expect(utils.extractValue('key',colsMap.key.path,obj)).toBe('key3');
        expect(utils.extractValue('key2',colsMap.key2.path,obj)).toBe(2);

    });

    it('updates record',function() {

        var obj = {  key2: 2 ,key3: 'key3' };

        utils.updateRecord('key2','123',colsMap.key2,obj);
        expect(obj.key2).toBe('123');
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

        utils.updateRecord('key2','123',colsMapUp.key2,obj);
        expect(utils.extractValue('key2',colsMapUp.key2.path,obj)).toBe('123hey');

        utils.updateRecord('key','y',colsMapUp.key,obj);
        expect(utils.extractValue('key',colsMapUp.key.path,obj)).toBe('y');
    });
});