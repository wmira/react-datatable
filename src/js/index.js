'use strict';
var React = require("react");
var numeral = require("numeral"); //FIX the build and separate this
var RDT = require("./react-datatable/rdt.jsx");


var data = [
    { name: 'Airi Satou', position: 'Accountant', office: 'Tokyo', age: 33, salary: 162700},
    { name: 'Bradley Greer', position: 'Software Engineer', office: 'London', age: 41, salary: 132000},
    { name: 'Brielle Williamson', position: 'Integration Specialist', office: 'New York', age: 61, salary: 372000},
    { name: 'Caesar Vance', position: 'Pre-Sales Support', office: 'New York', age: 33, salary: 162700 },
    { name: 'Cara Stevens', position: 'Sales Assistant', office: 'New York', age: 46, salary: 145600},
    { name: 'Charde Marshall', position: 'Regional Director', office: 'San Francisco', age: 36, salary: 470600},
    { name: 'Dai Rios', position: 'Personnel Lead', office: 'Edinburgh', age: 35, salary: 217500},
    { name: 'Finn Camacho', position: 'Support Engineer', office: 'San Francisco', age: 47, salary: 87500},
    { name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', age: 63, salary: 170750},
    { name: 'Haley Kennedy', position: 'Senior Marketing Designer', office: 'London', age: 43, salary: 313500},
    { name: 'Herrod Chandler', position: 'Sales Assistant', office: 'San Francisco', age: 59, salary: 137500}

];
var datasource = {
    index: ['id'],
    data: data
};

var numberFormatter = function(value,property,record) {
    return "$" + numeral(value).format('0,0');
};

var computeTax = function(record) {
    return  record['salary'] * 0.30;
};

var config = {
    style: 'pure',
    cols: [
        { editable: true, property: "name", header: "Name"  },
        { property: "position", header: "Position"},
        { property: "office", header: "Office"},
        { property: "age", header: "Age"},
        { property: computeTax, header: "Tax", formatter: numberFormatter},
        { editable: true, property: "salary", header: "Salary", formatter: numberFormatter }
    ]
};

React.render(
    React.createElement(RDT, {
        config: config,
        datasource: datasource
    }),
    document.getElementById('content')
);

