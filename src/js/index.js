'use strict';
var React = require("react");

var RDT = require("./react-datatable/rdt.jsx");


var data = [
    { name: 'Airi Satou', position: 'Accountant', office: 'Tokyo', age: 33, salary: '$162,700'},
    { name: 'Bradley Greer', position: 'Software Engineer', office: 'London', age: 41, salary: '$132,000'},
    { name: 'Brielle Williamson', position: 'Integration Specialist', office: 'New York', age: 61, salary: '$372,000'},
    { name: 'Caesar Vance', position: 'Pre-Sales Support', office: 'New York', age: 33, salary: '$162,700'},
    { name: 'Cara Stevens', position: 'Sales Assistant', office: 'New York', age: 46, salary: '$145,600'},
    { name: 'Charde Marshall', position: 'Regional Director', office: 'San Francisco', age: 36, salary: '$470,600'},
    { name: 'Dai Rios', position: 'Personnel Lead', office: 'Edinburgh', age: 35, salary: '$217,500'},
    { name: 'Finn Camacho', position: 'Support Engineer', office: 'San Francisco', age: 47, salary: '$87,500'},
    { name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', age: 63, salary: '$170,750'},
    { name: 'Haley Kennedy', position: 'Senior Marketing Designer', office: 'London', age: 43, salary: '$313,500'},
    { name: 'Herrod Chandler', position: 'Sales Assistant', office: 'San Francisco', age: 59, salary: '$137,500'}

];
var datasource = {
    index: ['id'],
    data: data
};

var config = {
    style: 'pure-striped',
    cols: [
        { property: "name", header: "Name"  },
        { property: "position", header: "Position"},
        { property: "office", header: "Office"},
        { property: "age", header: "Age"},
        { property: "salary", header: "Salary"}
    ]
};

React.render(
    React.createElement(RDT, {
        config: config,
        datasource: datasource
    }),
    document.getElementById('content')
);

