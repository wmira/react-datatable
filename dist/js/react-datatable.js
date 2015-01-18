(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["RDT"] = factory(require("react"));
	else
		root["RDT"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*globals require,module */
	/* jshint -W097, esnext: true */
	"use strict";

	var RDT = __webpack_require__(3)(__webpack_require__(1),__webpack_require__(2));


	/**
	 * Helpers
	 *  
	 * @type {{classname: Function}}
	 */
	var Decorator = {
	    
	    styles : function(clsname,style,cellClassname,cellStyle) {
	        return function() {
	            return {
	                className : clsname,
	                style : style,
	                cellClassName: cellClassname,
	                cellStyle : cellStyle
	            };
	        };
	    }
	    
	};

	module.exports = RDT;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/*globals require,module */
	/* jshint -W097, esnext: true */
	"use strict";

	var React = __webpack_require__(1);

	var DataSource = __webpack_require__(4);
	var Pager = __webpack_require__(5);

	var RDTRow = __webpack_require__(6);
	var RDTColumn = __webpack_require__(7);
	var RDTBody = __webpack_require__(8);
	var Paginator = __webpack_require__(9);



	var TABLE_CSS = {
	    pure: {
	        table: 'pure-table pure-table-bordered'
	    },
	    'pure-striped': {
	        table: 'pure-table pure-table-bordered pure-table-striped'
	    },
	    bootstrap: {
	        table: 'table table-bordered'
	    },
	    foundation: {
	        table: ''
	    }
	};

	/**
	 * Simple Data Table using react.
	 *
	 *
	 *  var datasource = {
	 *       data: []
	 *   };
	 *
	 *  var config = {
	 *      style : 'pure',
	 *       cols : [
	 *           { editable: true, property: "path" , header: "First Name"  }
	        ]
	    };
	 *
	 */
	var RDT = React.createClass({displayName: "RDT",
	    
	    
	    onClick : function(e) {

	        var el = e.target;
	        var action = el.getAttribute("data-rdt-action");
	        if ( action === "sort" ) {
	            var property= el.getAttribute("data-col-property");
	            var direction = el.getAttribute("data-sort-direction");
	            this.state.datasource.sort(property,direction);
	            this.forceUpdate();
	        }
	    },
	    
	    componentWillReceiveProps : function(nextProps) {
	        this.setState(this._createStateFromProps(nextProps));
	    },
	    nextPage : function() {
	        if ( this.state.pager ) {
	           // this.pager = this.pager.next();
	            this.setState({ pager : this.state.pager.next() });
	        }
	    },

	    /* REMOVING FOR NOW
	    add : function(record) {
	        this.ds.add(record);
	        var pagerState = null;
	        if ( this.pager ) {
	            pagerState = this.pager.state();
	        }

	        this.setState({ pager : pagerState });
	    },
	    */
	    onDsChangeEvent : function() {
	        if ( this.props.onChange ) {
	            this.props.onChange();
	        }
	    },
	    
	    _createStateFromProps : function(props) {

	        var state = {};
	        
	        if ( props.data  ) {
	            state.datasource = new DataSource(props.data,props.config);
	        }
	        
	        
	        if (props.config.pager  ) {
	            state.pager = new Pager(1, props.config.pager.rowsPerPage, state.datasource);
	        }

	        return  state; //{ datasource: datasource, pager : this.state.pager, pagerState: this.pager.state() };
	    },

	    /**
	     * 
	     *
	     * @returns {*}
	     */
	    getInitialState: function () {
	        return this._createStateFromProps(this.props);
	    },

	    pagerUpdated : function(page) {
	        if ( this.state.pager ) {
	           // this.pager = this.pager.toPage(page);
	            this.setState({ pager : this.state.pager.toPage(page) });
	        }
	    },

	    render: function () {

	        var tableStyle = TABLE_CSS[this.props.config.style];
	        var config = this.props.config;
	        var datasource = this.state.datasource;
	        var pagerState = null;
	        var paginator = null;
	        /*jshint ignore:start */
	        if ( this.state.pager ) {
	            paginator =  React.createElement(Paginator, {pagerState: this.state.pager.state(), datasource: datasource, config: this.props.config, pageChangedListener: this.pagerUpdated})

	        }
	        return (
	            React.createElement("div", {onClick: this.onClick}, 
	                React.createElement("div", {className: "rdt-container", ref: "container"}, 
	                    React.createElement("table", {className: tableStyle['table']}, 
	                        React.createElement(RDTColumn, React.__spread({},  this.props, {datasource: datasource})), 
	                        React.createElement(RDTBody, {config: config, datasource: datasource, pager: this.state.pager})
	                    )
	                ), 
	                paginator
	            )
	        )
	        /*jshint ignore:end */
	    }


	});


	module.exports = RDT;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*globals require,module,React */
	"use strict";

	/**
	 * React instance creation is a bit noisy. Use this on react a library such
	 * that its more direct to the point when creating new instance. E.g.
	 *
	   React.render(React.createElement(ViewPager,{ views : ["page11","page22","page33"], visible:"page11"}),
	            document.getElementById("viewpager-container2"));
	 * 
	 * to something like
	 *
	 * ViewPager.render({ views : ["page1","page2","page3"], visible:"page1"},"viewpager-container");
	 * or
	 * ViewPager.render("viewpager-container");
	 * 
	 * If your are exposing a library then :
	 * 
	 * var renderWrapper = require("react-render");
	 * var MyReactComponent = React.createClass... 
	 * 
	 * module.exports = renderWrapper(React,MyReactComponent)
	 *
	 */

	/**
	 * 
	 * Shortcut to React.createElement(cls,option) 
	 *
	 */
	var elWrapper = function(React,ReactClass,option) {
	    return React.createElement(ReactClass,option);
	};
	    
	var renderWrapper = function(React,ReactClass,options,el) {
	    
	    var ouroption = {};
	    //if he passed an html element or a string on the first argument
	    //then we assume he wants no options
	    var ourEl = null;
	    
	    //check if its actually an element
	    if ( ( options.tagName && options.nodeName && (typeof options.nodeType === 'number') ) 
	        || ( typeof options === 'string' ) ) {
	        ourEl = options;
	    } else {
	        ouroption = options;
	        ourEl = ( typeof el === 'string') ? document.getElementById(el) : el;
	    }

	    return React.render(elWrapper(React,ReactClass,ouroption), ourEl);
	};

	var RenderWrapper = function(React,ReactClass) {

	    return {
	        cls : ReactClass,
	        el : function(options) {
	            return elWrapper(React,ReactClass,options);
	        },
	        render : function(options,el) {
	            return renderWrapper(React,ReactClass,options,el)
	        }
	    }

	};

	module.exports = RenderWrapper;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/*globals require,module */
	/* jshint -W097, esnext: true */
	"use strict";

	var EventEmitter = __webpack_require__(12).EventEmitter;
	var utils = __webpack_require__(10);


	var EVENTS = {
	    RECORD_UPDATED : "RECORD_UPDATED",
	    RECORD_ADDED : "RECORD_ADDED",
	    RECORDS_SORTED : "RECORDS_SORTED"
	};


	var indexRecords = function() {
	    
	    var colsMap = this.propertyConfigMap;
	    var records = this.records;
	    var i;
	    
	    var indexdb = {};
	    
	    for ( i=0; i < records.length; i++ ) {
	        var record= records[i];
	        Object.keys(colsMap).forEach( function(key)  {
	            var col = colsMap[key];
	            var property = col.property;
	            var index = indexdb[property] || ( indexdb[property] ={} );
	            
	            var value = utils.extractValue(property,col.path,record);
	            var arr = index[value] || ( index[value] = []);
	            arr.push(i);
	        });
	    }
	    
	    //console.log(indexdb);
	    
	};

	/**
	 * Create a new datasource using records array as a backing dataset
	 * 
	 * @param records
	 * @constructor
	 */
	var DataSource = function(records,config) {
	    
	    //the hell is this doing here
	    this.id = new Date();

	    if ( records instanceof Array ) {
	        this.records = records;
	    } else {
	        var dataField = records.data;
	        var data = records.datasource;
	        this.records =  data[dataField];
	    }
	    this.config = config;
	    if ( this.config ) {
	        this.propertyConfigMap = {};
	        this.config.cols.forEach( function(col)  {
	            this.propertyConfigMap[col.property] = col;
	        }.bind(this));
	    }

	    //indexRecords.call(this);
	};


	DataSource.prototype = EventEmitter.prototype;
	DataSource.prototype.constructor = DataSource;

	/**
	 * Access the record at the given index
	 *
	 * @param index
	 * @returns record
	 */
	DataSource.prototype.record = function(index) {
	    return this.records[index];
	};


	/**
	 * Append a record
	 *  
	 * @param record
	 */
	DataSource.prototype.append = function(record) {
	    this.records.push(record);
	    this.emit(EVENTS.RECORD_ADDED,record);
	};


	DataSource.prototype.length = function() {
	    return this.records.length;
	};

	/**
	 * FIXME: Still broken, we need to be able to sort depending on type
	 *
	 * @param property
	 * @param direction
	 */
	DataSource.prototype.sort = function(property,direction) {
	    
	    this.records.sort(  function( o1,o2)   {
	        var reverseDir = 1;
	        if ( direction === "-1" ) {
	             reverseDir = -1;
	        }
	        var col = this.propertyConfigMap[property];
	        
	        var v1 = utils.extractValue(property,col.path,o1);
	        var v2 = utils.extractValue(property,col.path,o2);
	        
	         
	        var type = utils.extractSortableType(v1,v2);
	        return utils.compare(type,v1,v2,reverseDir);
	        
	    }.bind(this));
	    
	    this.emit(EVENTS.RECORDS_SORTED, { property: property, direction : direction});


	};

	/**
	 * Maps the actual page
	 * The mapper function gets the record, currentIndex and actual index
	 */
	DataSource.prototype.map = function(pageState,mapper) {
	    if ( !pageState ) {
	        return this.records.map(mapper);
	    }

	    var result = [];
	    var counter = 0;
	    console.log(pageState.endIdx);
	    for ( var i = pageState.startIdx; i < pageState.endIdx; i++ ) {

	        result.push(mapper(this.records[i],counter++,i));
	    }

	    return result;
	};

	/**
	 * Up
	 *
	 *
	 * @param recordIdx
	 * @param newValue
	 */
	DataSource.prototype.updateRecord = function(recordIdx,property,newValue) {

	    var record = this.records[recordIdx];
	    utils.updateRecord(property,newValue,this.propertyConfigMap[property],record);
	    //FIXME, we should get current value and pass as old value
	    this.emit(EVENTS.RECORD_UPDATED,record,recordIdx,property,newValue);
	};


	module.exports = DataSource;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/*globals require,module */
	/* jshint -W097, esnext: true */
	"use strict";

	/**
	 *
	 *
	 * @param config The common config
	 * @param datasource The datasource containing array of data
	 * @param page The page to view
	 * @constructor
	 */
	var Pager = function(page,rowsPerPage,datasource) {
	    this.datasource= datasource;
	    this.page = page;
	    this.rowsPerPage = rowsPerPage;
	    this.startIdx = (this.page - 1 ) * rowsPerPage;
	    this.endIdx = ( this.startIdx + this.rowsPerPage ) < this.datasource.records.length ?
	        ( this.startIdx + this.rowsPerPage ) : ( this.startIdx + ( this.datasource.records.length - this.startIdx ));
	};


	/**
	 * Moves this pager forward and returns another pager
	 *
	 *
	 * @param page
	 * @returns Pager
	 */
	Pager.prototype.next = function() {

	    return this.move(1);
	};

	Pager.prototype.previous = function() {
	    return this.move(-1);
	};
	Pager.prototype.toPage = function(page) {
	    return this.move(page - this.page);
	};

	Pager.prototype.maxPage= function() {
	    var maxPage = parseInt(this.datasource.records.length / this.rowsPerPage);
	    if ( ( this.datasource.records.length % this.rowsPerPage ) > 0 ) {
	        maxPage += 1;
	    }
	    return maxPage;
	};

	Pager.prototype.move = function(movement) {
	    var maxPage = this.maxPage();

	    if ( ( this.page + movement ) > maxPage  || ( this.page + movement ) < 0 ) {
	        return this;
	    }
	    return new Pager(this.page + movement,this.rowsPerPage,this.datasource);
	};

	Pager.prototype.state = function() {
	    return {
	        page : this.page,
	        startIdx : this.startIdx,
	        endIdx : this.endIdx,
	        rowsPerPage: this.rowsPerPage,
	        totalRecords : this.datasource.records.length,
	        totalPage : this.maxPage()
	    };
	};


	module.exports = Pager;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/*globals require,module */
	/* jshint -W097 */
	"use strict";
	    
	var React = __webpack_require__(1);

	var RDTCell = __webpack_require__(11);

	/**
	 * React Component as a row
	 *
	 */
	var RDTRow = React.createClass({displayName: "RDTRow",
	    
	    /*
	    componentWillReceiveProps: function(nextProps) {
	        this.setState({record : nextProps.record});
	    },

	    getInitialState: function() {
	        return { record : this.props.record  };
	    },
	    


	    onCellChange : function() {
	       this.setState( { record : this.props.record });
	    },*/

	    render: function() {

	        var cols = this.props.config.cols;
	        var record = this.props.record;

	        return (
	            React.createElement("tr", {"data-index": this.props.index}, 
	            
	                cols.map(function (col,idx) {
	                    return React.createElement(RDTCell, {config: this.props.config, onCellChange: this.onCellChange, index: this.props.index, key: idx, datasource: this.props.datasource, col: col, property: col.property, record: record, path: col.path})
	                }.bind(this))
	            
	            )
	        )

	    }
	});


	module.exports = RDTRow;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/*globals require,module */
	/* jshint -W097 */
	"use strict";

	var React = __webpack_require__(1);

	var DIRECTION_UP = "1";
	var DIRECTION_DOWN = "-1";




	var SortControl = React.createClass({displayName: "SortControl",
	   

	    
	    render : function() {

	        var arrowUp = (  this.props.isSortedColumn && this.props.direction === DIRECTION_UP ) ?
	            "rdt-arrow-up-active" : "rdt-arrow-up-inactive";
	        var arrowDown = ( this.props.isSortedColumn &&  this.props.direction === DIRECTION_DOWN ) ?
	            "rdt-arrow-down-active" : "rdt-arrow-down-inactive";
	        /*jshint ignore:start */
	        return (React.createElement("div", {style:  { float: "right"} }, React.createElement("div", {
	            "data-rdt-action": "sort", "data-col-property": this.props.col.property, "data-sort-direction": DIRECTION_UP, className: "rdt-arrow-up " + arrowUp}), React.createElement("div", {style: {"marginBottom": "5px"}}), 
	                React.createElement("div", {"data-rdt-action": "sort", "data-col-property": this.props.col.property, "data-sort-direction": DIRECTION_DOWN, className: "rdt-arrow-down " + arrowDown})))
	        /*jshint ignore:end */
	    } 
	    
	});

	/**
	 * React Component for Columns
	 *
	 */
	var RDTColumn = React.createClass({displayName: "RDTColumn",
	    
	    
	    recordsSorted : function(sortedInfo) {
	        this.setState({sortInfo: sortedInfo})
	    },
	    getInitialState : function() {
	        var datasource =this.props.datasource;
	        datasource.on("RECORDS_SORTED",this.recordsSorted);
	        return { datasource : this.props.datasource, showFilter: false };
	    },
	    componentWillReceiveProps: function(nextProps) {
	        if ( nextProps.datasource ) {
	            nextProps.datasource.on("RECORDS_SORTED", this.recordsSorted);
	        }
	    },

	    render: function() {

	        var cols = this.props.config.cols;
	        var datasource = this.state.datasource;
	        
	        var sortedInfo = this.state.sortInfo; //datasource.sortedInfo;
	        return(
	            React.createElement("thead", {onClick: this.onClick}, 
	                React.createElement("tr", null, 
	                    cols.map(function(col,idx) {
	                        var isSortedColumn = false;
	                        var direction = null;

	                        if ( sortedInfo && sortedInfo.property === col.property ) {
	                            isSortedColumn = true;
	                            direction = sortedInfo.direction;
	                        }
	                        return (
	                            React.createElement("td", {"data-th-key": col.property, key: col.property + "-th-" + idx}, 
	                                React.createElement("div", null, React.createElement("span", null, col.header), React.createElement(SortControl, {isSortedColumn: isSortedColumn, direction: direction, col: col}))
	                            )
	                        )
	                    }.bind(this))
	                
	                )
	            )
	        )

	    }
	});


	module.exports = RDTColumn;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/*globals require,module */
	/* jshint -W097, esnext: true */
	"use strict";

	var React = __webpack_require__(1);
	var RDTRow = __webpack_require__(6);

	/**
	 * React Component for Body
	 *
	 */
	var RDTBody = React.createClass({displayName: "RDTBody",
	    
	    handleRecordUpdate : function(record,recordIdx,property,newValue) {
	        this.refs[recordIdx].forceUpdate();
	    },
	    
	    componentDidMount : function() {
	        this.props.datasource.on("RECORD_UPDATED",this.handleRecordUpdate);
	    },

	    render: function() {
	        /*jshint ignore:start */
	        return(
	            React.createElement("tbody", null, 
	                
	                    this.props.datasource.map(this.props.pager, function (data, idx, realIdx) {

	                        //if this is a normal array map function, then realIdx here is the underlying array
	                        //if the map came from us, then realIdx is the real index. if we are on a page, then idx will point to
	                        //the index on the current view
	                        var id = idx;
	                        if (realIdx && !Array.isArray(realIdx)) {
	                            id = realIdx;
	                        }
	                        return React.createElement(RDTRow, {ref: id, datasource: this.props.datasource, index: id, key: id, record: data, config: this.props.config})
	                    }.bind(this))
	                
	            )
	        )
	        /*jshint ignore:end */

	    }
	});


	module.exports = RDTBody;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/*globals require,module */
	/* jshint -W097, esnext: true */
	"use strict";

	var React = __webpack_require__(1);


	/**
	 * React Component for Columns
	 *
	 */
	var Paginator = React.createClass({displayName: "Paginator",


	    
	    pagerClickListener : function(e) {
	        var target = e.target;
	        var page = target.getAttribute("data-page");

	        if ( page ) {
	            page = parseInt(page);
	            this.props.pageChangedListener(page);
	        }
	    },
	    /**
	     * If rendered is called it means we have a paginator
	     *
	     * @returns {XML}
	     */
	    render: function() {

	        var ps = this.props.pagerState;
	        var visiblePager = 3;
	        var startPage = ps.page;
	        var lastFFClass = "";
	        var startFFClass = "";
	        
	        //FIXME please!
	        var generatePager = function() {
	            
	            var pagerComponents = [];

	            pagerComponents.push(
	                /*jshint ignore:start */
	                (React.createElement("li", {className: startFFClass}, 
	                    React.createElement("span", null, 
	                        React.createElement("span", null, "«")
	                    )
	                ))
	                /*jshint ignore:end */
	            );
	            
	            for ( var i=startPage; i < (startPage+visiblePager); i++ ) {
	                var cls = "";
	                if ( i === ps.page ) {
	                    cls="active";
	                }
	                pagerComponents.push(
	                    /*jshint ignore:start */
	                    (React.createElement("li", {className: cls}, React.createElement("a", {"data-page": i}, i)))
	                    /*jshint ignore:end */
	                );
	            }
	            
	            pagerComponents.push(
	                /*jshint ignore:start */
	                (React.createElement("li", {className: lastFFClass}, 
	                    React.createElement("span", null, 
	                        React.createElement("span", null, "»")
	                    )
	                ))
	                /*jshint ignore:end */
	            );
	            return pagerComponents;
	            
	        };
	        
	        
	        
	        /*jshint ignore:start */
	        return(
	            React.createElement("div", {onClick: this.pagerClickListener, className: "rdt-paginator"}, 
	                React.createElement("ul", {className: "pagination pagination-sm rdt-paginator-pager"}, 
	                    
	                        generatePager()
	                    
	                )
	            )
	        )
	  
	        /*jshint ignore:end */
	    }
	});


	module.exports = Paginator;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*globals require,module */
	/* jshint -W097, esnext: true */
	"use strict";

	module.exports = {
	    
	    updateRecord : function(property,newValue,colConfig,record) {

	        var config = colConfig;
	        var path = config.path ? config.path : property;

	        var setter = config.setter ?

	            //setter can be a string or an actual function -- derp
	            function(newValue,property,config) {
	                var thesetter = config.setter;
	                if ( typeof(config.setter) === 'string' ) {
	                    record[config.setter](newValue, property, config,record);
	                } else {
	                    //assume function
	                    thesetter.call(record,newValue, property, config,record);
	                }

	            }:
	            function() {
	                path.split(".").reduce(function(prev,current,index,arr) {
	                    if ( index === (arr.length - 1) ) {
	                        //we are at the end
	                        if ( typeof prev[current] === 'function' ) {
	                            prev[current](newValue);
	                        } else {
	                            prev[current] = newValue;
	                        }
	                    } else {
	                        return prev[current];
	                    }
	                },record);
	            } ;
	        setter.call(record,newValue,property,config,record);
	        
	    },
	    
	    
	    colsToMap : function(config) {
	        var colsMap = {};
	        
	        config.cols.forEach( function(column)  {
	            colsMap[column.property] = column;
	        });
	        
	        return colsMap;
	    },
	    
	    extractValue : function(property,path,record) {


	        var value = "";

	        /**
	         * By default, we will use record[property] if path is not given.
	         * If path is provided and is a string then will assume record[path]
	         * If path is provided and is a function then we will call the function.
	         * else we dont do anything
	         */
	        if ( typeof property === 'string' ) {
	            if ( !path ) {
	                value = record[property];
	                if ( typeof(value) === 'function' ) {
	                    value = value.call(record);
	                }
	            } else {
	                if ( typeof path === 'string' ) {
	                    value =  path.split(".").reduce(function(previous,current) {
	                        if ( !previous || !current ) {
	                            return null;
	                        }
	                        return previous[current];
	                    },record);// record[path];
	                } else {
	                    //TODO: function check
	                    value = path(property,record);
	                }
	            }
	        }
	        return value;
	        
	    },
	    extractSortableType : function(v1,v2) {
	      if ( typeof v1 === 'string' && typeof v2 === 'string') {
	          return String;
	      } else if ( typeof v1 === 'number' && typeof v2 === 'number') {
	          return Number;
	      } else if ( v1 instanceof Date && v2 instanceof Date ) {
	          return Date;
	      } else {
	          return null;
	      }
	        
	    },
	    compare : function(type,val1,val2,direction) {
	        if ( type === Number ) {
	            if ( val1 && val2 ) {
	                return (val2 - val1) * direction;
	            } else if ( val1 && !val2 ) {
	                return val1 * direction;
	            } else if ( !val1 && val2 ) {
	                return val2 * direction;
	            } else {
	                return 0;
	            }
	        } else  { //string sort
	            if ( val1  ) {
	                return val1.localeCompare(val2) * direction;
	            } else if ( val2 ) {
	                return val2.localeCompare(val1) * direction;
	            } else {
	                return 0;
	            }
	        }
	        return 0;
	        //FIXME how about date? slacker!
	    }
	    
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/*globals require,module */
	/* jshint -W097, esnext: true */
	"use strict";
	    
	var React = __webpack_require__(1);

	var utils = __webpack_require__(10);

	/**
	 * React Component for Cell.
	 *
	 * TODO: We should be on edit mode on 2 clicks. 1st should have the td focused
	 *
	 *
	 *
	 */
	var RDTCell = React.createClass({displayName: "RDTCell",
	    componentWillReceiveProps : function(newProps) {
	        this.setState({ editMode : false });
	    },

	    /**
	     * problem is if this is null
	     *
	     * @param currentValue
	     * @param newValue
	     * @returns {*}
	     */
	    convertToType : function(currentValue,newValue) {
	        if ( (typeof currentValue) === "number" ) {
	            if ( currentValue % 1 === 0 ) {
	                return parseInt(newValue);
	            } else {
	                return parseFloat(newValue);
	            }
	        } else {
	            //assume it is a number for now
	            //FIXME do for other types, move to a function
	            return newValue;
	        }
	    },

	    getDisplayStyle : function() {

	        var element = this.refs.td.getDOMNode();
	        var width = element.offsetWidth;
	        var height = element.offsetHeight;
	        var left = element.offsetLeft;
	        var top = element.offsetTop;

	        return {
	            width: width,
	            height: height,
	            top: top,
	            left: left
	        };

	    },

	    componentDidMount: function () {
	        if ( this.refs.input ) {
	            this.refs.input.getDOMNode().focus();
	        }
	    },

	    componentDidUpdate: function () {
	        if ( this.refs.input ) {
	            this.refs.input.getDOMNode().focus();
	        }
	    },

	    onClickHandler : function(event) {

	        var target = event.target;

	        if ( !this.state.editMode && this.props.col.editable ) {
	            this.setState( {  editMode : true  } );
	        }

	    },

	    onKeyUp : function(event) {

	        var type = event.type;
	        var keyCode = event.which;
	        var ENTER_KEY = 13;
	        if ( type==='keyup' && keyCode === ENTER_KEY && this.refs.input ) {

	            /**
	             * FIXME: if we can't determine the type we should get it from the config as an option
	             *
	             */
	            var newValue = this.convertToType(this.props.record[this.props.property],this.refs.input.getDOMNode().value);
	            var datasource = this.props.datasource;
	            var index = this.props.index;

	            datasource.updateRecord(this.props.index,this.props.property,newValue,this.props.col);

	            this.setState( { editMode : false } );
	            if ( this.props.onCellChange ) {
	                this.props.onCellChange();
	            }


	        }

	    },


	    onBlur : function() {
	        this.setState({ editMode : false });
	    },

	    getInitialState: function() {
	        return { record: this.props.record, editMode : false };
	    },


	    /**
	     *
	     *
	     * @returns {XML}
	     */
	    createEditor : function() {
	        var //record,property = null,
	            editable = this.props.col.editable || false,
	            editMode = this.state.editMode;

	        //we need to check here because at initial pass getDisplayStyle will not resolve to anything.
	        //it has the be rendered first
	        if ( !editable || !editMode  ) {
	            return null;
	        }

	        //TODO: either use built in editors or use the one returned by editor attribute
	        //editor can be a react component
	        //

	        return ( React.createElement("input", {onBlur: this.onBlur, className: "rdt-editor", 
	            style: this.getDisplayStyle(), onKeyUp: this.onKeyUp, onChange: this.onInputChange, ref: "input", defaultValue: this.getValue()}) );
	    },
	    
	    getValue : function() {
	        var property = this.props.property;
	        return utils.extractValue(property,this.props.datasource.propertyConfigMap[property].path,this.props.record);
	    },

	    /**
	     * If there is a specified renderer, then use that to render the cell
	     *
	     */
	        //value, formattedValue, cellDecoration, property, record
	    renderElement : function(value, formattedValue, cellDecoration, property, record) {
	        var renderer = this.props.col.renderer;
	        
	        if ( typeof renderer === 'function' ) {
	            try {
	                return renderer.call(renderer,value,formattedValue,cellDecoration,property,record,React);
	            } catch ( e ) {
	                console.log(e);
	                return null;
	            } 
	        }
	    },

	    /**
	     * By default if the decorator is a string or returns  a string, 
	     * then it uses it as className. If object is returned then the following is expected
	     * 
	     * {
	     *    className : "cls1 cls2", //the class applied to the container td
	     *    style : { color : "red" }, //the style applied to the container td
	     *    cellClassName: "cls1 cls2" //the classname applied to the cell div
	     *    cellStyle : { color : "red" }, //the style applied to the cell div
	     * 
	     * } 
	     * 
	     *  
	     * @param value
	     * @param property
	     * @param record
	     * @returns {{className: string, style: {}}}
	     */
	    tdCellDecoration : function(value,property,record) {
	        
	        var decorator =  this.props.col.decorator;
	        var decoration = null;
	        var className = "";
	        var style = {};
	        var cellClassName = "";
	        var cellStyle = {};
	        
	        if ( typeof decorator === 'function' ) {
	            try {
	                decoration = decorator.call(decorator,value,property,record);

	                if ( typeof decoration === 'string' ) {
	                    className = decoration;
	                } else  {
	                    className = decoration.className || "";
	                    style = decoration.style || {};
	                    cellClassName = decoration.cellClassName || "";
	                    cellStyle = decoration.cellStyle || {};
	                }
	            } catch ( e ) {
	                console.log(e);
	            }
	        } else if ( typeof decorator === 'string' ) {
	            className = decorator;
	        }
	        return {
	            className : className,
	            style : style,
	            cellClassName : cellClassName,
	            cellStyle : cellStyle
	        }
	    }
	        
	    ,
	    
	    render: function() {


	        var record = this.props.record;
	        var property = this.props.property;

	        var value = this.getValue();
	        var formattedValue = null;
	         //FIXME ensure its a function
	        if ( this.props.col.formatter ) {
	            //pass the underlying record
	            formattedValue = this.props.col.formatter(value,property,record,React);
	        } else {
	            formattedValue = value;
	        }
	        var decoration = this.tdCellDecoration(value,property,record);
	        
	        var renderedValue = null; 
	        
	        if ( this.props.col.renderer ) {
	            renderedValue = this.renderElement( value, formattedValue, decoration, property, record );
	        } 
	        if ( !renderedValue ) {
	            renderedValue = React.createElement("div", null, formattedValue)
	        }
	        
	        return (
	            React.createElement("td", {className: decoration.className, style: decoration.style, ref: "td", onClick: this.onClickHandler, "data-property": property, key: property}, 
	                React.createElement("div", {className: decoration.cellClassName, style: decoration.cellStyle}, renderedValue), 
	                this.createEditor()
	            )
	        )
	    }
	});


	module.exports = RDTCell;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }
/******/ ])
});
