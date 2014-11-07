RDT - DataTable Written in React
==============================

**RDT is still in early stages of development. Not even alpha quality.**

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
        { property: "name", editable: true, , header: "Name"  },
        { property: "position", header: "Position"},
        { property: "office", header: "Office"},
        { property: "age", header: "Age"},
        { property: "tax", path: computeTax, header: "Tax", formatter: numberFormatter},
        { editable: true, property: "salary", header: "Salary", formatter: numberFormatter }
    ]
};


React.render(
    React.createElement(RDT, {
        config: config,
        datasource: { data: data }

    }),
    document.getElementById('content')
);

```

Column Attributes
 Attribute        | Description
| ------------- |:-------------:|
| property      | unique key to refer to the column |
| path      | **optional** by default, the value is from record[property], if path is given then it is used. path can also be a function which can be used to create a dynamic cell      |
| header | the column header      |
| formatter | **optional** used to format a cell      |

