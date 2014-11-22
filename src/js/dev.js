'use strict';
var React = require("react");
var numeral = require("numeral"); //FIX the build and separate this
var RDT = require("../../dist/js/react-datatable/rdt.js");


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

    { name: 'Herrod Chandler', position: 'Sales Assistant', office: 'San Francisco', age: 59, salary: 137500},
    { name: 'Jackson Bradshaw', position: 'Director', office: 'New York', age: 59, salary: 645750},
    { name: 'Jena Gaines', position: 'Office Manager', office: 'London', age: 30, salary: 90560},
    { name: 'Lael Greer', position: 'Systems Administrator', office: 'London', age: 21, salary: 103500},
    { name: 'Martena Mccray', position: 'Post-Sales support', office: 'Edinburgh', age: 46, salary: 324050},

    { name: 'Michael Bruce', position: 'Javascript Developer', office: 'Singapore', age: 29, salary: 183000},
    { name: 'Olivia Liang', position: 'Support Engineer', office: 'Singapore', age: 64, salary: 234500},
    { name: 'Herrod Chandler', position: 'Sales Assistant', office: 'San Francisco', age: 59, salary: 137500},
    { name: 'Paul Byrd', position: 'Chief Financial Officer (CFO)', office: 'New York', age: 64, salary: 725000},
    { name: 'Quinn Flynn', position: 'Support Lead', office: 'Edinburgh', age: 22, salary: 342000},

    { name: 'Rhona Davidson', position: 'Integration Specialist', office: 'Tokyo', age: function(){return -99;}, salary: 327900}


];
var datasource = {
    index: ['id'],
    data: data
};

var numberFormatter = function(value,property,record) {
    return "$" + numeral(value).format('0,0');
};

var computeTax = function(property,record) {
    return  record['salary'] * 0.30;
};

var config = {
    style: 'bootstrap',


    pager: {
      rowsPerPage: 5
    },

    cols: [
        { property: "action", header: "" , formatter : function(value,property,record,react) {return react.createElement("div",null,"Edit")}, clickHandler: function() { console.log("clicked") } },
        { editable: true, property: "name", header: "Name" },
        { property: "position", header: "Position"},
        { property: "office", resolve: "",  header: "Office" },
        { property: "age", header: "Age", editable: true, setter: function(newValue,property,config) {

            console.log("age was set..");
            if ( newValue <= 18 ) {
                alert("Too young!");
            } else {
                this.age = newValue;
            }

        }},
        { property: "tax", path: computeTax, header: "Tax", formatter: numberFormatter},
        { editable: true, property: "salary", header: "Salary", formatter: numberFormatter }
    ]
};

var rdt = React.createElement(RDT, {
    config: config,
    datasource: datasource,
    onChange: function() {
        console.log('hey was updated')
    }

});


React.render(
    rdt,
    document.getElementById('content')
);



