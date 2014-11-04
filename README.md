RDT - DataTable Written in React
==============================

** RDT is still in early stages of development **

A simple datagrid/datatable written with Facebook's React view framework.

Features
=========
* Pagination
* Local And Remote Data Sources
* Grid Editor
* Custom Formatter / Renderer
* more to come

Development
==============

1. npm install -g gulp
2. npm install
3. gulp

Example Usage
==============


1. Displaying an array of data
```javascript
var data = ...[] //array
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
        datasource: data

    }),
    document.getElementById('content')
);

```

