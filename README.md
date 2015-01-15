RDT - DataTable Written in React
==============================

**RDT is still in early stages of development. Not even alpha quality.**

Demo: [http://wmira.github.io/react-datatable/](http://wmira.github.io/react-datatable/)

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


1. Install live-server 
   npm install -g live-server
2. Install dependencies 
   $ npm install
3. Run watcher to do auto package of javascript
   npm run watch
4. live-server
   Browser will open and you should be able to edit index.html that contains the demo usage and src/js and browser will automatically update.
5. npm run build, npm run build-min builds source and minified source

Install
================

1. npm install --save-dev react-datatable

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
==================
|Attribute      | Description                       |
| ------------- |---------------------------------- |
| property      | unique key to refer to the column |
| path          | **optional** by default, the value is from record[property], if path is given then it is used. path can also be a function which can be used to create a dynamic cell      |
| header        | the column header                 |
| formatter     | **optional** used to format a cell      |

