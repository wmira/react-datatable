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

	"use strict";


	var RDT = __webpack_require__(4)(__webpack_require__(1),__webpack_require__(2));
	RDT.datasource = __webpack_require__(3);


	module.exports = RDT;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);

	var DataSource = __webpack_require__(5);
	var dsFactory = __webpack_require__(3)
	var Pager = __webpack_require__(6);

	var RDTRow = __webpack_require__(7);
	var RDTColumn = __webpack_require__(8);
	var RDTBody = __webpack_require__(9);
	var Paginator = __webpack_require__(10);



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
	}

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
	    componentWillReceiveProps : function(newProps) {
	        //this.ds = new DataSource(newProps.config,newProps.datasource);
	        if ( newProps.datasource ) {
	            this.ds = newProps.datasource;
	        }
	        this.ds.on("recordAdded",this.onDsChangeEvent);
	        this.ds.on("recordUpdated",this.onDsChangeEvent);
	        if ( newProps.config.pager ) {
	            this.pager = new Pager(1,newProps.config.pager.rowsPerPage,this.ds);
	            return { pager : this.pager.state()  }
	        }
	        return { pager : null };
	    },
	    nextPage : function() {
	        if ( this.pager ) {
	            this.pager = this.pager.next();
	            this.setState({ pager : this.pager.state() });
	        }
	    },

	    add : function(record) {
	        this.ds.add(record);
	        var pagerState = null;
	        if ( this.pager ) {
	            pagerState = this.pager.state()
	        }

	        this.setState({ pager : pagerState });
	    },

	    onDsChangeEvent : function() {
	        //listen and then notify listener
	        if ( this.props.onChange ) {
	            this.props.onChange();
	        }
	    },

	    componentDidMount : function() {
	        
	        if ( this.props.datasource instanceof Array ) {
	            dsFactory.fromArray(this.props.datasource).then(function (datasource) {
	                this.setState({datasource: datasource});
	            }.bind(this));
	        }
	    },
	    getInitialState: function () {

	        var ds = new DataSource([]);
	        var pager =  null; 
	        if (this.props.config.pager  )
	        if ( this.props.config.pager ) {
	            pager = new Pager(1, this.props.config.pager.rowsPerPage, this.ds);
	        }
	        return { datasource : ds, pager :pager };
	        
	    },

	    pagerUpdated : function(page) {
	        if ( this.pager ) {
	            this.pager = this.pager.toPage(page);
	            this.setState({ pager : this.pager.state() });
	        }
	    },

	    render: function () {

	        var tableStyle = TABLE_CSS[this.props.config.style];
	        var config = this.props.config;
	        var datasource = this.state.datasource;

	        var paginator = null;
	        
	        if ( this.state.pager ) {
	            paginator =  React.createElement(Paginator, {datasource: datasource, config: this.props.config, pageChangedListener: this.pagerUpdated}) ;

	        }

	        return (
	            React.createElement("div", null, 
	                React.createElement("div", {className: "rdt-container", ref: "container"}, 
	                    React.createElement("table", {className: tableStyle['table']}, 
	                        React.createElement(RDTColumn, {config: config}), 
	                        React.createElement(RDTBody, {config: config, datasource: datasource, pager: this.state.pager})
	                    )
	                ), 
	                paginator
	            )
	        )

	    },



	    /**
	     * Return the underlying datasource if argument is null or use the new datasource provided
	     *
	     *
	     * @returns {*|Function|datasource|RDT.getInitialState.datasource|paginator.datasource|RDT.render.datasource}
	     */
	    datasource : function(datasource) {
	        if ( !datasource ) {
	            return this.state.datasource;
	        } 
	        this.setState({datasource: datasource});
	        return datasource;
	    }
	});


	module.exports = RDT;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/*globals require,module */
	"use strict";
	var Datasource = __webpack_require__(5);
	var Promise = __webpack_require__(12);

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

/***/ },
/* 4 */
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

	    
	var render = function(React,ReactClass,options,el) {
	    
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

	    return React.render(React.createElement(ReactClass,ouroption), ourEl);
	};

	var RenderWrapper = function(React,ReactClass) {

	    return {
	        cls : ReactClass,
	        render : function(options,el) {
	            return render(React,ReactClass,options,el)
	        }
	    }

	};

	module.exports = RenderWrapper;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/*globals require,module */
	"use strict";

	var EventEmitter = __webpack_require__(13).EventEmitter;


	/**
	 * Create a new datasource using records array as a backing dataset
	 * 
	 * @param records
	 * @constructor
	 */
	var DataSource = function(records) {
	    this.records = records;
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

	DataSource.prototype.empty = function() {
	   this.records = [];
	    this.emit("recordsUpdated");
	};
	/**
	 * Append a record
	 *  
	 * @param record
	 */
	DataSource.prototype.append = function(record) {
	    this.records.push(record)
	    this.emit("recordAdded",record);
	};


	DataSource.prototype.length = function() {
	    return this.records.length;
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
	DataSource.prototype.updateRecord = function(recordIdx,property,newValue,config) {

	    var record = this.records[recordIdx];
	    var path = config.path ? config.path : property;
	    var setter = config.setter ?

	        //setter can be a string or an actual function derp
	        function(newValue,property,config) {
	            var thesetter = config.setter;
	            if ( typeof(config.setter) === 'string' ) {
	                record[config.setter](newValue, property, config);
	            } else {
	                //assume function

	                thesetter.call(record,newValue, property, config);
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
	    setter.call(record,newValue,property,config);
	    //FIXME, we should get current value and pass as old value
	    this.emit("recordUpdated",record,recordIdx,property,newValue);
	};


	module.exports = DataSource;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';

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
	        page : this.page + 1,
	        startIdx : this.startIdx,
	        endIdx : this.endIdx,
	        rowsPerPage: this.rowsPerPage
	    }
	};



	module.exports = Pager;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);

	var RDTCell = __webpack_require__(11);

	/**
	 * React Component as a row
	 *
	 */
	var RDTRow = React.createClass({displayName: "RDTRow",

	    componentWillReceiveProps: function(nextProps) {
	        //FIXME: do an === test here?
	        this.setState({record : nextProps.record});
	    },

	    getInitialState: function() {
	        return { record : this.props.record };
	    },


	    /**
	     * TODO: we need to reevaluate.
	     */
	    onCellChange : function() {
	       this.setState( { record : this.props.record });
	    },

	    render: function() {

	        var cols = this.props.config.cols;
	        var record = this.state.record;
	        var ds = this.props.ds;

	        return (
	            React.createElement("tr", {"data-index": this.props.index}, 
	            
	                cols.map(function (col,idx) {
	                    return React.createElement(RDTCell, {onCellChange: this.onCellChange, index: this.props.index, key: idx, ds: ds, col: col, property: col.property, record: record, path: col.path})
	                }.bind(this))
	            
	            )
	        )

	    }
	});


	module.exports = RDTRow;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);


	/**
	 * React Component for Columns
	 *
	 */
	var RDTColumn = React.createClass({displayName: "RDTColumn",

	    render: function() {

	        var cols = this.props.config.cols;
	        return(
	            React.createElement("thead", null, 
	                React.createElement("tr", null, 
	                    cols.map(function(col,idx) {
	                        return React.createElement("td", {key: idx + 100}, col.header)
	                    })
	                
	                )
	            )
	        )

	    }
	});


	module.exports = RDTColumn;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);
	var RDTRow = __webpack_require__(7);

	/**
	 * React Component for Body
	 *
	 */
	var RDTBody = React.createClass({displayName: "RDTBody",

	    componentWillReceiveProps : function(newprops) {
	        this.setState({ pager: newprops.pager, ds : newprops.datasource});
	    },


	    getInitialState: function() {
	        return { pager: this.props.pager, ds : this.props.datasource};
	    },


	    render: function() {


	        return(
	            React.createElement("tbody", null, 
	                
	                    this.state.ds.map(this.state.pager, function (data, idx, realIdx) {

	                        //if this is a normal array map function, then realIdx here is the underlying array
	                        //if the map came from us, then realIdx is the real index. if we are on a page, then idx will point to
	                        //the index on the current view
	                        var id = idx;
	                        if (realIdx && !Array.isArray(realIdx)) {
	                            id = realIdx;
	                        }
	                        return React.createElement(RDTRow, {index: id, ds: this.state.ds, key: id, record: data, config: this.props.config})
	                    }.bind(this))
	                    
	            )
	        )

	    }
	});


	module.exports = RDTBody;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);


	/**
	 * React Component for Columns
	 *
	 */
	var Paginator = React.createClass({displayName: "Paginator",

	    getInitialState: function() {
	        return { page: this.props.page };
	    },

	    componentWillReceiveProps: function(props) {
	        this.setState({ page : props.page });
	    },

	    pageSelectionHandler : function() {
	        if ( this.props.pageChangedListener ) {
	            this.props.pageChangedListener(this.refs.pageSelection.getDOMNode().value);
	        }
	    },

	    /**
	     * If rendered is called it means we have a paginator
	     *
	     * @returns {XML}
	     */
	    render: function() {

	        var currentPage = this.state.page;

	        var pages = [];
	        var maxPages = parseInt(this.props.datasource.records.length / this.props.config.pager.rowsPerPage);
	        if ( ( this.props.datasource.records.length % this.props.config.pager.rowsPerPage ) != 0 ) {
	            maxPages += 1;
	        }
	        for ( var i=1; i <= maxPages; i++ ) {
	            pages.push(i);
	        }

	        return(
	            React.createElement("div", {className: "rdt-paginator"}, 
	                React.createElement("div", null, 
	                React.createElement("select", {value: currentPage, ref: "pageSelection", onChange: this.pageSelectionHandler}, 
	                
	                    pages.map(function (pageNum) {
	                        return React.createElement("option", {key: pageNum, value: pageNum}, pageNum)
	                    })
	                
	                )
	                )
	            )
	        )

	    }
	});


	module.exports = Paginator;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);


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
	        //FIXME, do an equal test here?
	        this.setState({ record : newProps.record, editMode : false });
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
	            this.setState( { record : this.state.record, property : this.state.property, editMode : true  } );
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
	            var newValue = this.convertToType(this.state.record[this.state.property],this.refs.input.getDOMNode().value);
	            var datasource = this.props.ds;
	            var index = this.props.index;

	            datasource.updateRecord(this.props.index,this.props.property,newValue,this.props.col);
	            this.setState( { record : this.state.record,  editMode : false } );
	            if ( this.props.onCellChange ) {
	                this.props.onCellChange();
	            }


	        }

	    },

	    onInputChange : function(event) {
	        //what the hell is this one doing here..
	    },

	    onBlur : function() {
	        this.setState({ editMode : false });
	    },

	    getInitialState: function() {
	        return { record : this.props.record, editMode : false };
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

	        return ( React.createElement("input", {onKeyUp: this.onKeyUp, ref: "input", onBlur: this.onBlur, className: "rdt-editor", 
	            style: this.getDisplayStyle(), onKeyUp: this.onKeyUp, onChange: this.onInputChange, ref: "input", defaultValue: this.getValue()}) );
	    },

	    getValue : function() {
	        var value = "";
	        var path = this.props.path;
	        var record = this.state.record;
	        var property = this.props.property;
	        /**
	         * By default, we will use record[property] if path is not given.
	         * If path is provided and is a string then will uspltle record[path]
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

	    render: function() {


	        var record = this.state.record;
	        var property = this.props.property;

	        var value = this.getValue();

	         //FIXME ensure its a function
	        if ( this.props.col.formatter ) {
	            value = this.props.col.formatter(value,property,record,React);
	        }

	        return (
	            React.createElement("td", {ref: "td", onClick: this.onClickHandler, "data-property": property, key: property}, 
	                React.createElement("div", null, value), 
	                this.createEditor()
	            )
	        )
	    }
	});


	module.exports = RDTCell;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var old;
	if (typeof Promise !== "undefined") old = Promise;
	function noConflict(bluebird) {
	    try { if (Promise === bluebird) Promise = old; }
	    catch (e) {}
	    return bluebird;
	}
	module.exports = __webpack_require__(14)();
	module.exports.noConflict = noConflict;


/***/ },
/* 13 */
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


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	module.exports = function() {
	var makeSelfResolutionError = function () {
	    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/LhFpo0\u000a");
	};
	var reflect = function() {
	    return new Promise.PromiseInspection(this._target());
	};
	var util = __webpack_require__(15);
	var async = __webpack_require__(16);
	var errors = __webpack_require__(17);
	var INTERNAL = function(){};
	var APPLY = {};
	var NEXT_FILTER = {e: null};
	var tryConvertToPromise = __webpack_require__(18)(Promise, INTERNAL);
	var PromiseArray =
	    __webpack_require__(19)(Promise, INTERNAL, tryConvertToPromise);
	var CapturedTrace = __webpack_require__(20)();
	var CatchFilter = __webpack_require__(21)(NEXT_FILTER);
	var PromiseResolver = __webpack_require__(22);
	var isArray = util.isArray;
	var errorObj = util.errorObj;
	var tryCatch1 = util.tryCatch1;
	var tryCatch2 = util.tryCatch2;
	var tryCatchApply = util.tryCatchApply;
	var RangeError = errors.RangeError;
	var TypeError = errors.TypeError;
	var CancellationError = errors.CancellationError;
	var TimeoutError = errors.TimeoutError;
	var OperationalError = errors.OperationalError;
	var originatesFromRejection = errors.originatesFromRejection;
	var markAsOriginatingFromRejection = errors.markAsOriginatingFromRejection;
	var canAttachTrace = errors.canAttachTrace;
	var apiRejection = __webpack_require__(23)(Promise);
	var unhandledRejectionHandled;
	var debugging = false || !!(
	    typeof process !== "undefined" &&
	    typeof process.execPath === "string" &&
	    typeof process.env === "object" &&
	    (process.env["BLUEBIRD_DEBUG"] ||
	        process.env["NODE_ENV"] === "development")
	);
	function Promise(resolver) {
	    if (typeof resolver !== "function") {
	        throw new TypeError("the promise constructor requires a resolver function\u000a\u000a    See http://goo.gl/EC22Yn\u000a");
	    }
	    if (this.constructor !== Promise) {
	        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/KsIlge\u000a");
	    }
	    this._bitField = 0;
	    this._fulfillmentHandler0 = undefined;
	    this._rejectionHandler0 = undefined;
	    this._progressHandler0 = undefined;
	    this._promise0 = undefined;
	    this._receiver0 = undefined;
	    this._settledValue = undefined;
	    this._boundTo = undefined;
	    if (resolver !== INTERNAL) this._resolveFromResolver(resolver);
	}

	Promise.prototype.bind = function (thisArg) {
	    var maybePromise = tryConvertToPromise(thisArg, this);
	    var ret = new Promise(INTERNAL);
	    ret._propagateFrom(this, 2 | 1);
	    var target = this._target();
	    if (maybePromise instanceof Promise) {
	        target._then(INTERNAL, ret._reject, ret._progress, ret, null);
	        maybePromise._then(function(thisArg) {
	            if (ret._isPending()) {
	                ret._setBoundTo(thisArg);
	                ret._follow(target);
	            }
	        }, ret._reject, ret._progress, ret, null);
	    } else {
	        ret._setBoundTo(thisArg);
	        ret._follow(target);
	    }

	    return ret;
	};

	Promise.prototype.toString = function () {
	    return "[object Promise]";
	};

	Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
	    var len = arguments.length;
	    if (len > 1) {
	        var catchInstances = new Array(len - 1),
	            j = 0, i;
	        for (i = 0; i < len - 1; ++i) {
	            var item = arguments[i];
	            if (typeof item === "function") {
	                catchInstances[j++] = item;
	            } else {
	                var error = new TypeError("Catch filter must inherit from Error or be a simple predicate function\u000a\u000a    See http://goo.gl/o84o68\u000a");
	                this._attachExtraTrace(error);
	                return Promise.reject(error);
	            }
	        }
	        catchInstances.length = j;
	        fn = arguments[i];

	        this._resetTrace();
	        var catchFilter = new CatchFilter(catchInstances, fn, this);
	        return this._then(undefined, catchFilter.doFilter, undefined,
	            catchFilter, undefined);
	    }
	    return this._then(undefined, fn, undefined, undefined, undefined);
	};

	Promise.prototype.reflect = function () {
	    return this._then(reflect, reflect, undefined, this, undefined);
	};

	Promise.prototype.then = function (didFulfill, didReject, didProgress) {
	    return this._then(didFulfill, didReject, didProgress,
	        undefined, undefined);
	};


	Promise.prototype.done = function (didFulfill, didReject, didProgress) {
	    var promise = this._then(didFulfill, didReject, didProgress,
	        undefined, undefined);
	    promise._setIsFinal();
	};

	Promise.prototype.spread = function (didFulfill, didReject) {
	    var followee = this._target();
	    var target = followee._isSpreadable()
	        ? (followee === this ? this : this.then())
	        : this.all();
	    return target._then(didFulfill, didReject, undefined, APPLY, undefined);
	};

	Promise.prototype.isCancellable = function () {
	    return !this.isResolved() &&
	        this._cancellable();
	};

	Promise.prototype.toJSON = function () {
	    var ret = {
	        isFulfilled: false,
	        isRejected: false,
	        fulfillmentValue: undefined,
	        rejectionReason: undefined
	    };
	    if (this.isFulfilled()) {
	        ret.fulfillmentValue = this.value();
	        ret.isFulfilled = true;
	    } else if (this.isRejected()) {
	        ret.rejectionReason = this.reason();
	        ret.isRejected = true;
	    }
	    return ret;
	};

	Promise.prototype.all = function () {
	    var ret = new PromiseArray(this).promise();
	    ret._setIsSpreadable();
	    return ret;
	};

	Promise.prototype.error = function (fn) {
	    return this.caught(originatesFromRejection, fn);
	};

	Promise.is = function (val) {
	    return val instanceof Promise;
	};

	Promise.all = function (promises) {
	    var ret = new PromiseArray(promises).promise();
	    ret._setIsSpreadable();
	    return ret;
	};

	Promise.method = function (fn) {
	    if (typeof fn !== "function") {
	        throw new TypeError("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a");
	    }
	    return function () {
	        var value;
	        switch(arguments.length) {
	        case 0: value = tryCatch1(fn, this, undefined); break;
	        case 1: value = tryCatch1(fn, this, arguments[0]); break;
	        case 2: value = tryCatch2(fn, this, arguments[0], arguments[1]); break;
	        default:
	            var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];}
	            value = tryCatchApply(fn, args, this); break;
	        }
	        var ret = new Promise(INTERNAL);
	        ret._setTrace(undefined);
	        ret._resolveFromSyncValue(value);
	        return ret;
	    };
	};

	Promise.attempt = Promise["try"] = function (fn, args, ctx) {
	    if (typeof fn !== "function") {
	        return apiRejection("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a");
	    }
	    var value = isArray(args)
	        ? tryCatchApply(fn, args, ctx)
	        : tryCatch1(fn, ctx, args);

	    var ret = new Promise(INTERNAL);
	    ret._setTrace(undefined);
	    ret._resolveFromSyncValue(value);
	    return ret;
	};

	Promise.defer = Promise.pending = function () {
	    var promise = new Promise(INTERNAL);
	    promise._setTrace(undefined);
	    return new PromiseResolver(promise);
	};

	Promise.bind = function (thisArg) {
	    var maybePromise = tryConvertToPromise(thisArg, undefined);
	    var ret = new Promise(INTERNAL);
	    ret._setTrace(undefined);

	    if (maybePromise instanceof Promise) {
	        maybePromise._then(function(thisArg) {
	            ret._setBoundTo(thisArg);
	            ret._fulfill(undefined);
	        }, ret._reject, ret._progress, ret, null);
	    } else {
	        ret._setBoundTo(thisArg);
	        ret._setFulfilled();
	    }
	    return ret;
	};

	Promise.cast = function (obj) {
	    var ret = tryConvertToPromise(obj, undefined);
	    if (!(ret instanceof Promise)) {
	        var val = ret;
	        ret = new Promise(INTERNAL);
	        ret._setTrace(undefined);
	        ret._setFulfilled();
	        ret._settledValue = val;
	        ret._cleanValues();
	    }
	    return ret;
	};

	Promise.resolve = Promise.fulfilled = Promise.cast;

	Promise.reject = Promise.rejected = function (reason) {
	    var ret = new Promise(INTERNAL);
	    ret._setTrace(undefined);
	    markAsOriginatingFromRejection(reason);
	    ret._setRejected();
	    ret._settledValue = reason;
	    ret._cleanValues();
	    if (!canAttachTrace(reason)) {
	        var trace = new Error(util.toString(reason));
	        ret._setCarriedStackTrace(trace);
	    }
	    ret._ensurePossibleRejectionHandled();
	    return ret;
	};

	Promise.onPossiblyUnhandledRejection = function (fn) {
	        CapturedTrace.possiblyUnhandledRejection = typeof fn === "function"
	                                                    ? fn : undefined;
	};

	Promise.onUnhandledRejectionHandled = function (fn) {
	    unhandledRejectionHandled = typeof fn === "function" ? fn : undefined;
	};

	Promise.longStackTraces = function () {
	    if (async.haveItemsQueued() &&
	        debugging === false
	   ) {
	        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/DT1qyG\u000a");
	    }
	    debugging = CapturedTrace.isSupported();
	};

	Promise.hasLongStackTraces = function () {
	    return debugging && CapturedTrace.isSupported();
	};

	Promise.setScheduler = function(fn) {
	    if (typeof fn !== "function") throw new TypeError("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a");
	    async._schedule = fn;
	};

	Promise.prototype._then = function (
	    didFulfill,
	    didReject,
	    didProgress,
	    receiver,
	    internalData
	) {
	    var haveInternalData = internalData !== undefined;
	    var ret = haveInternalData ? internalData : new Promise(INTERNAL);

	    if (!haveInternalData) {
	        ret._propagateFrom(this, 7);
	    }

	    var target = this._target();
	    if (target !== this) {
	        if (receiver === undefined) receiver = this._boundTo;
	        if (!haveInternalData) ret._setIsMigrated();
	    }

	    var callbackIndex =
	        target._addCallbacks(didFulfill, didReject, didProgress, ret, receiver);

	    if (target._isResolved() && !target._isSettlePromisesQueued()) {
	        async.invoke(
	            target._settlePromiseAtPostResolution, target, callbackIndex);
	    }

	    return ret;
	};

	Promise.prototype._settlePromiseAtPostResolution = function (index) {
	    if (this._isRejectionUnhandled()) this._unsetRejectionIsUnhandled();
	    this._settlePromiseAt(index);
	};

	Promise.prototype._length = function () {
	    return this._bitField & 131071;
	};

	Promise.prototype._isFollowingOrFulfilledOrRejected = function () {
	    return (this._bitField & 939524096) > 0;
	};

	Promise.prototype._isFollowing = function () {
	    return (this._bitField & 536870912) === 536870912;
	};

	Promise.prototype._setLength = function (len) {
	    this._bitField = (this._bitField & -131072) |
	        (len & 131071);
	};

	Promise.prototype._setFulfilled = function () {
	    this._bitField = this._bitField | 268435456;
	};

	Promise.prototype._setRejected = function () {
	    this._bitField = this._bitField | 134217728;
	};

	Promise.prototype._setFollowing = function () {
	    this._bitField = this._bitField | 536870912;
	};

	Promise.prototype._setIsFinal = function () {
	    this._bitField = this._bitField | 33554432;
	};

	Promise.prototype._isFinal = function () {
	    return (this._bitField & 33554432) > 0;
	};

	Promise.prototype._cancellable = function () {
	    return (this._bitField & 67108864) > 0;
	};

	Promise.prototype._setCancellable = function () {
	    this._bitField = this._bitField | 67108864;
	};

	Promise.prototype._unsetCancellable = function () {
	    this._bitField = this._bitField & (~67108864);
	};

	Promise.prototype._setRejectionIsUnhandled = function () {
	    this._bitField = this._bitField | 2097152;
	};

	Promise.prototype._unsetRejectionIsUnhandled = function () {
	    this._bitField = this._bitField & (~2097152);
	    if (this._isUnhandledRejectionNotified()) {
	        this._unsetUnhandledRejectionIsNotified();
	        this._notifyUnhandledRejectionIsHandled();
	    }
	};

	Promise.prototype._isRejectionUnhandled = function () {
	    return (this._bitField & 2097152) > 0;
	};

	Promise.prototype._isSpreadable = function () {
	    return (this._bitField & 131072) > 0;
	};

	Promise.prototype._setIsSpreadable = function () {
	    this._bitField = this._bitField | 131072;
	};

	Promise.prototype._setIsMigrated = function () {
	    this._bitField = this._bitField | 4194304;
	};

	Promise.prototype._unsetIsMigrated = function () {
	    this._bitField = this._bitField & (~4194304);
	};

	Promise.prototype._isMigrated = function () {
	    return (this._bitField & 4194304) > 0;
	};

	Promise.prototype._setUnhandledRejectionIsNotified = function () {
	    this._bitField = this._bitField | 524288;
	};

	Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
	    this._bitField = this._bitField & (~524288);
	};

	Promise.prototype._isUnhandledRejectionNotified = function () {
	    return (this._bitField & 524288) > 0;
	};

	Promise.prototype._setCarriedStackTrace = function (capturedTrace) {
	    this._bitField = this._bitField | 1048576;
	    this._fulfillmentHandler0 = capturedTrace;
	};

	Promise.prototype._unsetCarriedStackTrace = function () {
	    this._bitField = this._bitField & (~1048576);
	    this._fulfillmentHandler0 = undefined;
	};

	Promise.prototype._isCarryingStackTrace = function () {
	    return (this._bitField & 1048576) > 0;
	};

	Promise.prototype._getCarriedStackTrace = function () {
	    return this._isCarryingStackTrace()
	        ? this._fulfillmentHandler0
	        : undefined;
	};

	Promise.prototype._receiverAt = function (index) {
	    var ret = index === 0
	        ? this._receiver0
	        : this[
	            index * 5 - 5 + 4];
	    if (this._isBound() && ret === undefined) {
	        return this._boundTo;
	    }
	    return ret;
	};

	Promise.prototype._promiseAt = function (index) {
	    return index === 0
	        ? this._promise0
	        : this[index * 5 - 5 + 3];
	};

	Promise.prototype._fulfillmentHandlerAt = function (index) {
	    return index === 0
	        ? this._fulfillmentHandler0
	        : this[index * 5 - 5 + 0];
	};

	Promise.prototype._rejectionHandlerAt = function (index) {
	    return index === 0
	        ? this._rejectionHandler0
	        : this[index * 5 - 5 + 1];
	};

	Promise.prototype._migrateCallbacks = function (
	    fulfill,
	    reject,
	    progress,
	    promise,
	    receiver
	) {
	    if (promise instanceof Promise) promise._setIsMigrated();
	    this._addCallbacks(fulfill, reject, progress, promise, receiver);
	};

	Promise.prototype._addCallbacks = function (
	    fulfill,
	    reject,
	    progress,
	    promise,
	    receiver
	) {
	    var index = this._length();

	    if (index >= 131071 - 5) {
	        index = 0;
	        this._setLength(0);
	    }

	    if (index === 0) {
	        this._promise0 = promise;
	        if (receiver !== undefined) this._receiver0 = receiver;
	        if (typeof fulfill === "function" && !this._isCarryingStackTrace())
	            this._fulfillmentHandler0 = fulfill;
	        if (typeof reject === "function") this._rejectionHandler0 = reject;
	        if (typeof progress === "function") this._progressHandler0 = progress;
	    } else {
	        var base = index * 5 - 5;
	        this[base + 3] = promise;
	        this[base + 4] = receiver;
	        if (typeof fulfill === "function")
	            this[base + 0] = fulfill;
	        if (typeof reject === "function")
	            this[base + 1] = reject;
	        if (typeof progress === "function")
	            this[base + 2] = progress;
	    }
	    this._setLength(index + 1);
	    return index;
	};

	Promise.prototype._setProxyHandlers = function (receiver, promiseSlotValue) {
	    var index = this._length();

	    if (index >= 131071 - 5) {
	        index = 0;
	        this._setLength(0);
	    }
	    if (index === 0) {
	        this._promise0 = promiseSlotValue;
	        this._receiver0 = receiver;
	    } else {
	        var base = index * 5 - 5;
	        this[base + 3] = promiseSlotValue;
	        this[base + 4] = receiver;
	    }
	    this._setLength(index + 1);
	};

	Promise.prototype._proxyPromiseArray = function (promiseArray, index) {
	    this._setProxyHandlers(promiseArray, index);
	};

	Promise.prototype._setBoundTo = function (obj) {
	    if (obj !== undefined) {
	        this._bitField = this._bitField | 8388608;
	        this._boundTo = obj;
	    } else {
	        this._bitField = this._bitField & (~8388608);
	    }
	};

	Promise.prototype._isBound = function () {
	    return (this._bitField & 8388608) === 8388608;
	};

	Promise.prototype._resolveFromResolver = function (resolver) {
	    var promise = this;
	    this._setTrace(undefined);

	    this._pushContext();
	    var r = tryCatch2(resolver, undefined, function(val) {
	        if (promise._tryFollow(val)) {
	            return;
	        }
	        promise._fulfill(val);
	    }, function (val) {
	        var trace = canAttachTrace(val) ? val : new Error(util.toString(val));
	        promise._attachExtraTrace(trace);
	        markAsOriginatingFromRejection(val);
	        promise._reject(val, trace === val ? undefined : trace);
	    });
	    this._popContext();

	    if (r !== undefined && r === errorObj) {
	        var e = r.e;
	        var trace = canAttachTrace(e) ? e : new Error(util.toString(e));
	        promise._reject(e, trace);
	    }
	};

	Promise.prototype._settlePromiseFromHandler = function (
	    handler, receiver, value, promise
	) {
	    if (promise._isRejected()) return;
	    promise._pushContext();
	    var x;
	    if (receiver === APPLY && !this._isRejected()) {
	        x = tryCatchApply(handler, value, this._boundTo);
	    } else {
	        x = tryCatch1(handler, receiver, value);
	    }
	    promise._popContext();

	    if (x === errorObj || x === promise || x === NEXT_FILTER) {
	        var err = x === promise
	                    ? makeSelfResolutionError()
	                    : x.e;
	        var trace = canAttachTrace(err) ? err : new Error(util.toString(err));
	        if (x !== NEXT_FILTER) promise._attachExtraTrace(trace);
	        promise._rejectUnchecked(err, trace);
	    } else {
	        x = tryConvertToPromise(x, promise);
	        if (x instanceof Promise) {
	            x = x._target();
	            if (x._isRejected() &&
	                !x._isCarryingStackTrace() &&
	                !canAttachTrace(x._reason())) {
	                var trace = new Error(util.toString(x._reason()));
	                promise._attachExtraTrace(trace);
	                x._setCarriedStackTrace(trace);
	            }
	            promise._follow(x);
	        } else {
	            promise._fulfillUnchecked(x);
	        }
	    }
	};

	Promise.prototype._target = function() {
	    var ret = this;
	    while (ret._isFollowing()) ret = ret._followee();
	    return ret;
	};

	Promise.prototype._followee = function() {
	    return this._rejectionHandler0;
	};

	Promise.prototype._setFollowee = function(promise) {
	    this._rejectionHandler0 = promise;
	};

	Promise.prototype._follow = function (promise) {
	    if (promise._isPending()) {
	        var len = this._length();
	        for (var i = 0; i < len; ++i) {
	            promise._migrateCallbacks(
	                this._fulfillmentHandlerAt(i),
	                this._rejectionHandlerAt(i),
	                this._progressHandlerAt(i),
	                this._promiseAt(i),
	                this._receiverAt(i)
	            );
	        }
	        this._setFollowing();
	        this._setLength(0);
	        this._setFollowee(promise);
	        this._propagateFrom(promise, 1);
	    } else if (promise._isFulfilled()) {
	        this._fulfillUnchecked(promise._value());
	    } else {
	        this._rejectUnchecked(promise._reason(),
	            promise._getCarriedStackTrace());
	    }
	    if (promise._isRejectionUnhandled()) promise._unsetRejectionIsUnhandled();

	    if (debugging &&
	        !promise._trace.hasParent()) {
	        promise._trace.setParent(this._trace);
	    }
	};

	Promise.prototype._tryFollow = function (value) {
	    if (this._isFollowingOrFulfilledOrRejected() ||
	        value === this) {
	        return false;
	    }
	    var maybePromise = tryConvertToPromise(value, this);
	    if (!(maybePromise instanceof Promise)) {
	        return false;
	    }
	    this._follow(maybePromise._target());
	    return true;
	};

	Promise.prototype._resetTrace = function () {
	    if (debugging) {
	        this._trace = new CapturedTrace(this._peekContext());
	    }
	};

	Promise.prototype._setTrace = function (parent) {
	    if (debugging) {
	        var context = this._peekContext();
	        if (parent !== undefined &&
	            parent._trace.parent() === context) {
	            this._trace = parent._trace;
	        } else {
	            this._trace = new CapturedTrace(context);
	        }
	    }
	    return this;
	};

	Promise.prototype._attachExtraTrace = function (error) {
	    if (debugging && canAttachTrace(error)) {
	        this._trace.attachExtraTrace(error);
	    }
	};

	Promise.prototype._cleanValues = function () {
	    if (this._cancellable()) {
	        this._cancellationParent = undefined;
	    }
	};

	Promise.prototype._propagateFrom = function (parent, flags) {
	    if ((flags & 1) > 0 && parent._cancellable()) {
	        this._setCancellable();
	        this._cancellationParent = parent;
	    }
	    if ((flags & 4) > 0) {
	        this._setBoundTo(parent._boundTo);
	    }
	    if ((flags & 2) > 0) {
	        this._setTrace(parent);
	    }
	};

	Promise.prototype._fulfill = function (value) {
	    if (this._isFollowingOrFulfilledOrRejected()) return;
	    this._fulfillUnchecked(value);
	};

	Promise.prototype._reject = function (reason, carriedStackTrace) {
	    if (this._isFollowingOrFulfilledOrRejected()) return;
	    this._rejectUnchecked(reason, carriedStackTrace);
	};

	Promise.prototype._settlePromiseAt = function (index) {
	    var promise = this._promiseAt(index);
	    var isPromise = promise instanceof Promise;

	    if (isPromise && promise._isMigrated()) {
	        promise._unsetIsMigrated();
	        return async.invoke(this._settlePromiseAt, this, index);
	    }
	    var handler = this._isFulfilled()
	        ? this._fulfillmentHandlerAt(index)
	        : this._rejectionHandlerAt(index);

	    var carriedStackTrace =
	        this._isCarryingStackTrace() ? this._getCarriedStackTrace() : undefined;
	    var value = this._settledValue;
	    var receiver = this._receiverAt(index);


	    this._clearCallbackDataAtIndex(index);

	    if (typeof handler === "function") {
	        if (!isPromise) {
	            handler.call(receiver, value, promise);
	        } else {
	            this._settlePromiseFromHandler(handler, receiver, value, promise);
	        }
	    } else if (receiver instanceof PromiseArray) {
	        if (!receiver._isResolved()) {
	            if (this._isFulfilled()) {
	                receiver._promiseFulfilled(value, promise);
	            }
	            else {
	                receiver._promiseRejected(value, promise);
	            }
	        }
	    } else if (this._isFulfilled()) {
	        promise._fulfill(value);
	    } else {
	        promise._reject(value, carriedStackTrace);
	    }

	    if (index >= 4 && (index & 31) === 4)
	        async.invokeLater(this._setLength, this, 0);
	};

	Promise.prototype._clearCallbackDataAtIndex = function(index) {
	    if (index === 0) {
	        if (!this._isCarryingStackTrace()) {
	            this._fulfillmentHandler0 = undefined;
	        }
	        this._rejectionHandler0 =
	        this._progressHandler0 =
	        this._receiver0 =
	        this._promise0 = undefined;
	    } else {
	        var base = index * 5 - 5;
	        this[base + 3] =
	        this[base + 4] =
	        this[base + 0] =
	        this[base + 1] =
	        this[base + 2] = undefined;
	    }
	};

	Promise.prototype._isSettlePromisesQueued = function () {
	    return (this._bitField &
	            -1073741824) === -1073741824;
	};

	Promise.prototype._setSettlePromisesQueued = function () {
	    this._bitField = this._bitField | -1073741824;
	};

	Promise.prototype._unsetSettlePromisesQueued = function () {
	    this._bitField = this._bitField & (~-1073741824);
	};

	Promise.prototype._queueSettlePromises = function() {
	    if (!this._isSettlePromisesQueued()) {
	        async.settlePromises(this);
	        this._setSettlePromisesQueued();
	    }
	};

	Promise.prototype._fulfillUnchecked = function (value) {
	    if (value === this) {
	        var err = makeSelfResolutionError();
	        this._attachExtraTrace(err);
	        return this._rejectUnchecked(err, undefined);
	    }
	    this._setFulfilled();
	    this._settledValue = value;
	    this._cleanValues();

	    if (this._length() > 0) {
	        this._queueSettlePromises();
	    }
	};

	Promise.prototype._rejectUncheckedCheckError = function (reason) {
	    var trace = canAttachTrace(reason)
	        ? reason : new Error(util.toString(reason));
	    this._rejectUnchecked(reason, trace === reason ? undefined : trace);
	};

	Promise.prototype._rejectUnchecked = function (reason, trace) {
	    if (reason === this) {
	        var err = makeSelfResolutionError();
	        this._attachExtraTrace(err);
	        return this._rejectUnchecked(err);
	    }
	    this._setRejected();
	    this._settledValue = reason;
	    this._cleanValues();

	    if (this._isFinal()) {
	        async.throwLater(function(e) {
	            if ("stack" in e) {
	                async.invokeFirst(
	                    CapturedTrace.unhandledRejection, undefined, e);
	            }
	            throw e;
	        }, trace === undefined ? reason : trace);
	        return;
	    }

	    if (trace !== undefined) this._setCarriedStackTrace(trace);

	    if (this._length() > 0) {
	        this._queueSettlePromises();
	    } else {
	        this._ensurePossibleRejectionHandled();
	    }
	};

	Promise.prototype._settlePromises = function () {
	    this._unsetSettlePromisesQueued();
	    var len = this._length();
	    for (var i = 0; i < len; i++) {
	        this._settlePromiseAt(i);
	    }
	};

	Promise.prototype._ensurePossibleRejectionHandled = function () {
	    this._setRejectionIsUnhandled();
	    if (CapturedTrace.possiblyUnhandledRejection !== undefined) {
	        async.invokeLater(this._notifyUnhandledRejection, this, undefined);
	    }
	};

	Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
	    if (typeof unhandledRejectionHandled === "function") {
	        async.throwLater(unhandledRejectionHandled, this);
	    }
	};

	Promise.prototype._notifyUnhandledRejection = function () {
	    if (this._isRejectionUnhandled()) {
	        var reason = this._settledValue;
	        var trace = this._getCarriedStackTrace();

	        this._setUnhandledRejectionIsNotified();

	        if (trace !== undefined) {
	            this._unsetCarriedStackTrace();
	            reason = trace;
	        }
	        if (typeof CapturedTrace.possiblyUnhandledRejection === "function") {
	            CapturedTrace.possiblyUnhandledRejection(reason, this);
	        }
	    }
	};

	var contextStack = [];
	Promise.prototype._peekContext = function () {
	    var lastIndex = contextStack.length - 1;
	    if (lastIndex >= 0) {
	        return contextStack[lastIndex];
	    }
	    return undefined;

	};

	Promise.prototype._pushContext = function () {
	    if (!debugging) return;
	    contextStack.push(this._trace);
	};

	Promise.prototype._popContext = function () {
	    if (!debugging) return;
	    contextStack.pop();
	};

	Promise.prototype._resolveFromSyncValue = function (value) {
	    if (value === errorObj) {
	        this._setRejected();
	        var reason = value.e;
	        this._settledValue = reason;
	        this._cleanValues();
	        this._attachExtraTrace(reason);
	        this._ensurePossibleRejectionHandled();
	    } else {
	        var maybePromise = tryConvertToPromise(value, this);
	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            this._follow(maybePromise);
	        } else {
	            this._setFulfilled();
	            this._settledValue = value;
	            this._cleanValues();
	        }
	    }
	};

	if (!CapturedTrace.isSupported()) {
	    Promise.longStackTraces = function(){};
	    debugging = false;
	}

	Promise._makeSelfResolutionError = makeSelfResolutionError;
	__webpack_require__(24)(Promise, NEXT_FILTER, tryConvertToPromise);
	__webpack_require__(25)(Promise);
	__webpack_require__(26)(Promise);
	__webpack_require__(27)(Promise, PromiseArray, tryConvertToPromise, INTERNAL);
	Promise.RangeError = RangeError;
	Promise.CancellationError = CancellationError;
	Promise.TimeoutError = TimeoutError;
	Promise.TypeError = TypeError;
	Promise.OperationalError = OperationalError;
	Promise.RejectionError = OperationalError;
	Promise.AggregateError = errors.AggregateError;

	util.toFastProperties(Promise);
	util.toFastProperties(Promise.prototype);
	Promise.Promise = Promise;
	CapturedTrace.setBounds(async.firstLineError, util.lastLineError);
	__webpack_require__(28)(Promise);
	__webpack_require__(29)(Promise, apiRejection, tryConvertToPromise);
	__webpack_require__(30)(Promise, apiRejection, INTERNAL, tryConvertToPromise);
	__webpack_require__(31)(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL);
	__webpack_require__(32)(Promise, INTERNAL);
	__webpack_require__(33)(Promise, INTERNAL);
	__webpack_require__(34)(Promise, PromiseArray, tryConvertToPromise);
	__webpack_require__(35)(Promise, INTERNAL, tryConvertToPromise);
	__webpack_require__(36)(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL);
	__webpack_require__(37)(Promise, PromiseArray);
	__webpack_require__(38)(Promise);
	__webpack_require__(39)(Promise, PromiseArray, apiRejection);
	__webpack_require__(40)(Promise, PromiseArray);
	__webpack_require__(41)(Promise);
	__webpack_require__(42)(Promise, INTERNAL);
	__webpack_require__(43)(Promise, INTERNAL, tryConvertToPromise);
	__webpack_require__(44)(Promise, INTERNAL);

	Promise.prototype = Promise.prototype;
	return Promise;

	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var es5 = __webpack_require__(46);
	var haveGetters = (function(){
	    try {
	        var o = {};
	        es5.defineProperty(o, "f", {
	            get: function () {
	                return 3;
	            }
	        });
	        return o.f === 3;
	    }
	    catch (e) {
	        return false;
	    }

	})();
	var canEvaluate = typeof navigator == "undefined";
	var errorObj = {e: {}};
	function tryCatch1(fn, receiver, arg) {
	    try { return fn.call(receiver, arg); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	function tryCatch2(fn, receiver, arg, arg2) {
	    try { return fn.call(receiver, arg, arg2); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	function tryCatch3(fn, receiver, arg, arg2, arg3) {
	    try { return fn.call(receiver, arg, arg2, arg3); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	function tryCatch4(fn, receiver, arg, arg2, arg3, arg4) {
	    try { return fn.call(receiver, arg, arg2, arg3, arg4); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	function tryCatchApply(fn, args, receiver) {
	    try { return fn.apply(receiver, args); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	var inherits = function(Child, Parent) {
	    var hasProp = {}.hasOwnProperty;

	    function T() {
	        this.constructor = Child;
	        this.constructor$ = Parent;
	        for (var propertyName in Parent.prototype) {
	            if (hasProp.call(Parent.prototype, propertyName) &&
	                propertyName.charAt(propertyName.length-1) !== "$"
	           ) {
	                this[propertyName + "$"] = Parent.prototype[propertyName];
	            }
	        }
	    }
	    T.prototype = Parent.prototype;
	    Child.prototype = new T();
	    return Child.prototype;
	};

	function asString(val) {
	    return typeof val === "string" ? val : ("" + val);
	}

	function isPrimitive(val) {
	    return val == null || val === true || val === false ||
	        typeof val === "string" || typeof val === "number";

	}

	function isObject(value) {
	    return !isPrimitive(value);
	}

	function maybeWrapAsError(maybeError) {
	    if (!isPrimitive(maybeError)) return maybeError;

	    return new Error(asString(maybeError));
	}

	function withAppended(target, appendee) {
	    var len = target.length;
	    var ret = new Array(len + 1);
	    var i;
	    for (i = 0; i < len; ++i) {
	        ret[i] = target[i];
	    }
	    ret[i] = appendee;
	    return ret;
	}

	function getDataPropertyOrDefault(obj, key, defaultValue) {
	    if (es5.isES5) {
	        var desc = Object.getOwnPropertyDescriptor(obj, key);
	        if (desc != null) {
	            return desc.get == null && desc.set == null
	                    ? desc.value
	                    : defaultValue;
	        }
	    } else {
	        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
	    }
	}

	function notEnumerableProp(obj, name, value) {
	    if (isPrimitive(obj)) return obj;
	    var descriptor = {
	        value: value,
	        configurable: true,
	        enumerable: false,
	        writable: true
	    };
	    es5.defineProperty(obj, name, descriptor);
	    return obj;
	}


	var wrapsPrimitiveReceiver = (function() {
	    return this !== "string";
	}).call("string");

	function thrower(r) {
	    throw r;
	}

	var inheritedDataKeys = (function() {
	    if (es5.isES5) {
	        return function(obj, opts) {
	            var ret = [];
	            var visitedKeys = Object.create(null);
	            var getKeys = Object(opts).includeHidden
	                ? Object.getOwnPropertyNames
	                : Object.keys;
	            while (obj != null) {
	                var keys;
	                try {
	                    keys = getKeys(obj);
	                } catch (e) {
	                    return ret;
	                }
	                for (var i = 0; i < keys.length; ++i) {
	                    var key = keys[i];
	                    if (visitedKeys[key]) continue;
	                    visitedKeys[key] = true;
	                    var desc = Object.getOwnPropertyDescriptor(obj, key);
	                    if (desc != null && desc.get == null && desc.set == null) {
	                        ret.push(key);
	                    }
	                }
	                obj = es5.getPrototypeOf(obj);
	            }
	            return ret;
	        };
	    } else {
	        return function(obj) {
	            var ret = [];
	            /*jshint forin:false */
	            for (var key in obj) {
	                ret.push(key);
	            }
	            return ret;
	        };
	    }

	})();

	function isClass(fn) {
	    try {
	        if (typeof fn === "function") {
	            var keys = es5.keys(fn.prototype);
	            return keys.length > 0 &&
	                   !(keys.length === 1 && keys[0] === "constructor");
	        }
	        return false;
	    } catch (e) {
	        return false;
	    }
	}

	function toFastProperties(obj) {
	    /*jshint -W027*/
	    function f() {}
	    f.prototype = obj;
	    return f;
	    eval(obj);
	}

	var rident = /^[a-z$_][a-z$_0-9]*$/i;
	function isIdentifier(str) {
	    return rident.test(str);
	}

	function filledRange(count, prefix, suffix) {
	    var ret = new Array(count);
	    for(var i = 0; i < count; ++i) {
	        ret[i] = prefix + i + suffix;
	    }
	    return ret;
	}

	function safeToString(obj) {
	    try {
	        return obj + "";
	    } catch (e) {
	        return "[no string representation]";
	    }
	}

	var ret = {
	    isClass: isClass,
	    isIdentifier: isIdentifier,
	    inheritedDataKeys: inheritedDataKeys,
	    getDataPropertyOrDefault: getDataPropertyOrDefault,
	    thrower: thrower,
	    isArray: es5.isArray,
	    haveGetters: haveGetters,
	    notEnumerableProp: notEnumerableProp,
	    isPrimitive: isPrimitive,
	    isObject: isObject,
	    canEvaluate: canEvaluate,
	    errorObj: errorObj,
	    tryCatch1: tryCatch1,
	    tryCatch2: tryCatch2,
	    tryCatch3: tryCatch3,
	    tryCatch4: tryCatch4,
	    tryCatchApply: tryCatchApply,
	    inherits: inherits,
	    withAppended: withAppended,
	    asString: asString,
	    maybeWrapAsError: maybeWrapAsError,
	    wrapsPrimitiveReceiver: wrapsPrimitiveReceiver,
	    toFastProperties: toFastProperties,
	    filledRange: filledRange,
	    toString: safeToString,
	    lastLineError: new Error()
	};

	module.exports = ret;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	var firstLineError = new Error();
	var schedule = __webpack_require__(47);
	var Queue = __webpack_require__(48);
	var _process = typeof process !== "undefined" ? process : undefined;

	function Async() {
	    this._isTickUsed = false;
	    this._lateQueue = new Queue(16);
	    this._normalQueue = new Queue(16);
	    var self = this;
	    this.drainQueues = function () {
	        self._drainQueues();
	    };
	    this._schedule =
	        schedule.isStatic ? schedule(this.drainQueues) : schedule;
	}

	Async.prototype.haveItemsQueued = function () {
	    return this._normalQueue.length() > 0;
	};

	Async.prototype._withDomain = function(fn) {
	    if (_process !== undefined &&
	        _process.domain != null &&
	        !fn.domain) {
	        fn = _process.domain.bind(fn);
	    }
	    return fn;
	};

	Async.prototype.throwLater = function(fn, arg) {
	    if (arguments.length === 1) {
	        arg = fn;
	        fn = function () { throw arg; };
	    }
	    fn = this._withDomain(fn);
	    if (typeof setTimeout !== "undefined") {
	        setTimeout(function() {
	            fn(arg);
	        }, 0);
	    } else try {
	        this._schedule(function() {
	            fn(arg);
	        });
	    } catch (e) {
	        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/m3OTXk\u000a");
	    }
	};

	Async.prototype.invokeLater = function (fn, receiver, arg) {
	    fn = this._withDomain(fn);
	    this._lateQueue.push(fn, receiver, arg);
	    this._queueTick();
	};

	Async.prototype.invokeFirst = function (fn, receiver, arg) {
	    fn = this._withDomain(fn);
	    this._normalQueue.unshift(fn, receiver, arg);
	    this._queueTick();
	};

	Async.prototype.invoke = function (fn, receiver, arg) {
	    fn = this._withDomain(fn);
	    this._normalQueue.push(fn, receiver, arg);
	    this._queueTick();
	};

	Async.prototype.settlePromises = function(promise) {
	    this._normalQueue._pushOne(promise);
	    this._queueTick();
	};

	Async.prototype._drainQueue = function(queue) {
	    while (queue.length() > 0) {
	        var fn = queue.shift();
	        if (typeof fn !== "function") {
	            fn._settlePromises();
	            continue;
	        }
	        var receiver = queue.shift();
	        var arg = queue.shift();
	        fn.call(receiver, arg);
	    }
	};

	Async.prototype._drainQueues = function () {
	    this._drainQueue(this._normalQueue);
	    this._reset();
	    this._drainQueue(this._lateQueue);
	};

	Async.prototype._queueTick = function () {
	    if (!this._isTickUsed) {
	        this._isTickUsed = true;
	        this._schedule(this.drainQueues);
	    }
	};

	Async.prototype._reset = function () {
	    this._isTickUsed = false;
	};

	module.exports = new Async();
	module.exports.firstLineError = firstLineError;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Objectfreeze = __webpack_require__(46).freeze;
	var propertyIsWritable = __webpack_require__(46).propertyIsWritable;
	var util = __webpack_require__(15);
	var inherits = util.inherits;
	var notEnumerableProp = util.notEnumerableProp;

	function markAsOriginatingFromRejection(e) {
	    try {
	        notEnumerableProp(e, "isOperational", true);
	    }
	    catch(ignore) {}
	}

	function originatesFromRejection(e) {
	    if (e == null) return false;
	    return ((e instanceof OperationalError) ||
	        e["isOperational"] === true);
	}

	function isError(obj) {
	    return obj instanceof Error;
	}

	function canAttachTrace(obj) {
	    return isError(obj) && propertyIsWritable(obj, "stack");
	}

	function subError(nameProperty, defaultMessage) {
	    function SubError(message) {
	        if (!(this instanceof SubError)) return new SubError(message);
	        notEnumerableProp(this, "message",
	            typeof message === "string" ? message : defaultMessage);
	        notEnumerableProp(this, "name", nameProperty);
	        if (Error.captureStackTrace) {
	            Error.captureStackTrace(this, this.constructor);
	        }
	    }
	    inherits(SubError, Error);
	    return SubError;
	}

	var _TypeError, _RangeError;
	var CancellationError = subError("CancellationError", "cancellation error");
	var TimeoutError = subError("TimeoutError", "timeout error");
	var AggregateError = subError("AggregateError", "aggregate error");
	try {
	    _TypeError = TypeError;
	    _RangeError = RangeError;
	} catch(e) {
	    _TypeError = subError("TypeError", "type error");
	    _RangeError = subError("RangeError", "range error");
	}

	var methods = ("join pop push shift unshift slice filter forEach some " +
	    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

	for (var i = 0; i < methods.length; ++i) {
	    if (typeof Array.prototype[methods[i]] === "function") {
	        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
	    }
	}

	AggregateError.prototype.length = 0;
	AggregateError.prototype["isOperational"] = true;
	var level = 0;
	AggregateError.prototype.toString = function() {
	    var indent = Array(level * 4 + 1).join(" ");
	    var ret = "\n" + indent + "AggregateError of:" + "\n";
	    level++;
	    indent = Array(level * 4 + 1).join(" ");
	    for (var i = 0; i < this.length; ++i) {
	        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
	        var lines = str.split("\n");
	        for (var j = 0; j < lines.length; ++j) {
	            lines[j] = indent + lines[j];
	        }
	        str = lines.join("\n");
	        ret += str + "\n";
	    }
	    level--;
	    return ret;
	};

	function OperationalError(message) {
	    notEnumerableProp(this, "name", "OperationalError");
	    notEnumerableProp(this, "message", message);
	    this.cause = message;
	    this["isOperational"] = true;

	    if (message instanceof Error) {
	        notEnumerableProp(this, "message", message.message);
	        notEnumerableProp(this, "stack", message.stack);
	    } else if (Error.captureStackTrace) {
	        Error.captureStackTrace(this, this.constructor);
	    }

	}
	inherits(OperationalError, Error);

	var key = "__BluebirdErrorTypes__";
	var errorTypes = Error[key];
	if (!errorTypes) {
	    errorTypes = Objectfreeze({
	        CancellationError: CancellationError,
	        TimeoutError: TimeoutError,
	        OperationalError: OperationalError,
	        RejectionError: OperationalError,
	        AggregateError: AggregateError
	    });
	    notEnumerableProp(Error, key, errorTypes);
	}

	module.exports = {
	    Error: Error,
	    TypeError: _TypeError,
	    RangeError: _RangeError,
	    CancellationError: errorTypes.CancellationError,
	    OperationalError: errorTypes.OperationalError,
	    TimeoutError: errorTypes.TimeoutError,
	    AggregateError: errorTypes.AggregateError,
	    originatesFromRejection: originatesFromRejection,
	    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
	    canAttachTrace: canAttachTrace
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var util = __webpack_require__(15);
	var canAttachTrace = __webpack_require__(17).canAttachTrace;
	var errorObj = util.errorObj;
	var isObject = util.isObject;

	function getThen(obj) {
	    try {
	        return obj.then;
	    }
	    catch(e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	function tryConvertToPromise(obj, traceParent) {
	    if (isObject(obj)) {
	        if (obj instanceof Promise) {
	            return obj;
	        }
	        else if (isAnyBluebirdPromise(obj)) {
	            var ret = new Promise(INTERNAL);
	            ret._setTrace(undefined);
	            obj._then(
	                ret._fulfillUnchecked,
	                ret._rejectUncheckedCheckError,
	                ret._progressUnchecked,
	                ret,
	                null
	            );
	            return ret;
	        }
	        var then = getThen(obj);
	        if (then === errorObj) {
	            if (traceParent !== undefined && canAttachTrace(then.e)) {
	                traceParent._attachExtraTrace(then.e);
	            }
	            return Promise.reject(then.e);
	        } else if (typeof then === "function") {
	            return doThenable(obj, then, traceParent);
	        }
	    }
	    return obj;
	}

	var hasProp = {}.hasOwnProperty;
	function isAnyBluebirdPromise(obj) {
	    return hasProp.call(obj, "_promise0");
	}

	function doThenable(x, then, traceParent) {
	    var resolver = Promise.defer();
	    var called = false;
	    try {
	        then.call(
	            x,
	            resolveFromThenable,
	            rejectFromThenable,
	            progressFromThenable
	        );
	    } catch(e) {
	        if (!called) {
	            called = true;
	            var trace = canAttachTrace(e) ? e : new Error(util.toString(e));
	            if (traceParent !== undefined) {
	                traceParent._attachExtraTrace(trace);
	            }
	            resolver.promise._reject(e, trace);
	        }
	    }
	    return resolver.promise;

	    function resolveFromThenable(y) {
	        if (called) return;
	        called = true;

	        if (x === y) {
	            var e = Promise._makeSelfResolutionError();
	            if (traceParent !== undefined) {
	                traceParent._attachExtraTrace(e);
	            }
	            resolver.promise._reject(e, undefined);
	            return;
	        }
	        resolver.resolve(y);
	    }

	    function rejectFromThenable(r) {
	        if (called) return;
	        called = true;
	        var trace = canAttachTrace(r) ? r : new Error(util.toString(r));
	        if (traceParent !== undefined) {
	            traceParent._attachExtraTrace(trace);
	        }
	        resolver.promise._reject(r, trace);
	    }

	    function progressFromThenable(v) {
	        if (called) return;
	        var promise = resolver.promise;
	        if (typeof promise._progress === "function") {
	            promise._progress(v);
	        }
	    }
	}

	return tryConvertToPromise;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL, tryConvertToPromise) {
	var canAttachTrace = __webpack_require__(17).canAttachTrace;
	var util = __webpack_require__(15);
	var isArray = util.isArray;

	function toResolutionValue(val) {
	    switch(val) {
	    case -1: return undefined;
	    case -2: return [];
	    case -3: return {};
	    }
	}

	function PromiseArray(values) {
	    var promise = this._promise = new Promise(INTERNAL);
	    var parent;
	    if (values instanceof Promise) {
	        parent = values;
	        promise._propagateFrom(parent, 1 | 4);
	    }
	    promise._setTrace(parent);
	    this._values = values;
	    this._length = 0;
	    this._totalResolved = 0;
	    this._init(undefined, -2);
	}
	PromiseArray.prototype.length = function () {
	    return this._length;
	};

	PromiseArray.prototype.promise = function () {
	    return this._promise;
	};

	PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {

	    var values = tryConvertToPromise(this._values, undefined);
	    if (values instanceof Promise) {
	        values._setBoundTo(this._promise._boundTo);
	        values = values._target();
	        this._values = values;
	        if (values._isFulfilled()) {
	            values = values._value();
	            if (!isArray(values)) {
	                var err = new Promise.TypeError("expecting an array, a promise or a thenable\u000a\u000a    See http://goo.gl/s8MMhc\u000a");
	                this.__hardReject__(err);
	                return;
	            }
	        } else if (values._isPending()) {
	            values._then(
	                init,
	                this._reject,
	                undefined,
	                this,
	                resolveValueIfEmpty
	           );
	            return;
	        } else {
	            values._unsetRejectionIsUnhandled();
	            this._reject(values._reason());
	            return;
	        }
	    } else if (!isArray(values)) {
	        var err = new Promise.TypeError("expecting an array, a promise or a thenable\u000a\u000a    See http://goo.gl/s8MMhc\u000a");
	        this.__hardReject__(err);
	        return;
	    }

	    if (values.length === 0) {
	        if (resolveValueIfEmpty === -5) {
	            this._resolveEmptyArray();
	        }
	        else {
	            this._resolve(toResolutionValue(resolveValueIfEmpty));
	        }
	        return;
	    }
	    var len = this.getActualLength(values.length);
	    this._length = len;
	    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
	    var promise = this._promise;
	    for (var i = 0; i < len; ++i) {
	        if (this._isResolved()) return;
	        var maybePromise = tryConvertToPromise(values[i], promise);
	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            if (maybePromise._isPending()) {
	                maybePromise._proxyPromiseArray(this, i);
	            } else if (maybePromise._isFulfilled()) {
	                this._promiseFulfilled(maybePromise._value(), i);
	            } else {
	                maybePromise._unsetRejectionIsUnhandled();
	                this._promiseRejected(maybePromise._reason(), i);
	            }
	        } else {
	            this._promiseFulfilled(maybePromise, i);
	        }
	    }
	};

	PromiseArray.prototype._isResolved = function () {
	    return this._values === null;
	};

	PromiseArray.prototype._resolve = function (value) {
	    this._values = null;
	    this._promise._fulfill(value);
	};

	PromiseArray.prototype.__hardReject__ =
	PromiseArray.prototype._reject = function (reason) {
	    this._values = null;
	    var trace = canAttachTrace(reason)
	        ? reason : new Error(util.toString(reason));
	    this._promise._attachExtraTrace(trace);
	    this._promise._reject(reason, trace);
	};

	PromiseArray.prototype._promiseProgressed = function (progressValue, index) {
	    this._promise._progress({
	        index: index,
	        value: progressValue
	    });
	};


	PromiseArray.prototype._promiseFulfilled = function (value, index) {
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	    }
	};

	PromiseArray.prototype._promiseRejected = function (reason, index) {
	    this._totalResolved++;
	    this._reject(reason);
	};

	PromiseArray.prototype.shouldCopyValues = function () {
	    return true;
	};

	PromiseArray.prototype.getActualLength = function (len) {
	    return len;
	};

	return PromiseArray;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function() {
	var inherits = __webpack_require__(15).inherits;
	var defineProperty = __webpack_require__(46).defineProperty;
	var rtraceline = null;
	var formatStack = null;

	function CapturedTrace(parent) {
	    this._parent = parent;
	    captureStackTrace(this, CapturedTrace);

	}
	inherits(CapturedTrace, Error);

	CapturedTrace.prototype.parent = function() {
	    return this._parent;
	};

	CapturedTrace.prototype.setParent = function(parent) {
	    if (parent === this) return;
	    this._parent = parent;
	};

	CapturedTrace.prototype.hasParent = function() {
	    return this._parent !== undefined;
	};

	CapturedTrace.prototype.attachExtraTrace = function(error) {
	    var trace = this;
	    var stack = error.stack;
	    stack = typeof stack === "string" ? stack.split("\n") : [];
	    this.protectErrorMessageNewlines(stack);
	    var headerLineCount = 1;
	    var combinedTraces = 1;

	    do {
	        stack = trace.combine(stack);
	        combinedTraces++;
	    } while ((trace = trace.parent()) != null);

	    var stackTraceLimit = Error.stackTraceLimit || 10;
	    var max = (stackTraceLimit + headerLineCount) * combinedTraces;
	    var len = stack.length;
	    if (len > max) {
	        stack.length = max;
	    }

	    if (len > 0)
	        stack[0] = stack[0].split("\u0002\u0000\u0001").join("\n");

	    if (stack.length <= headerLineCount) {
	        error.stack = "(No stack trace)";
	    } else {
	        error.stack = stack.join("\n");
	    }
	};

	CapturedTrace.prototype.combine = function(current) {
	    var prev = this.stack.split("\n");
	    var currentLastIndex = current.length - 1;
	    var currentLastLine = current[currentLastIndex];
	    var commonRootMeetPoint = -1;
	    for (var i = prev.length - 1; i >= 0; --i) {
	        if (prev[i] === currentLastLine) {
	            commonRootMeetPoint = i;
	            break;
	        }
	    }

	    for (var i = commonRootMeetPoint; i >= 0; --i) {
	        var line = prev[i];
	        if (current[currentLastIndex] === line) {
	            current.pop();
	            currentLastIndex--;
	        } else {
	            break;
	        }
	    }

	    current.push("From previous event:");
	    var lines = current.concat(prev);

	    var ret = [];

	    for (var i = 0, len = lines.length; i < len; ++i) {
	        if (((rtraceline.test(lines[i]) && shouldIgnore(lines[i])) ||
	            (i > 0 && !rtraceline.test(lines[i])) &&
	            lines[i] !== "From previous event:")
	       ) {
	            continue;
	        }
	        ret.push(lines[i]);
	    }
	    return ret;
	};

	CapturedTrace.prototype.protectErrorMessageNewlines = function(stack) {
	    for (var i = 0; i < stack.length; ++i) {
	        if (rtraceline.test(stack[i])) {
	            break;
	        }
	    }

	    if (i <= 1) return;

	    var errorMessageLines = [];
	    for (var j = 0; j < i; ++j) {
	        errorMessageLines.push(stack.shift());
	    }
	    stack.unshift(errorMessageLines.join("\u0002\u0000\u0001"));
	};

	CapturedTrace.formatAndLogError = function(error, title) {
	    if (typeof console === "object") {
	        var message;
	        if (typeof error === "object" || typeof error === "function") {
	            var stack = error.stack;
	            message = title + formatStack(stack, error);
	        } else {
	            message = title + String(error);
	        }
	        if (typeof console.warn === "function" ||
	            typeof console.warn === "object") {
	            console.warn(message);
	        } else if (typeof console.log === "function" ||
	            typeof console.log === "object") {
	            console.log(message);
	        }
	    }
	};

	CapturedTrace.unhandledRejection = function (reason) {
	    CapturedTrace.formatAndLogError(
	        reason, "^--- With additional stack trace: ");
	};

	CapturedTrace.possiblyUnhandledRejection = function (reason) {
	    CapturedTrace.formatAndLogError(
	        reason, "Possibly unhandled ");
	};

	CapturedTrace.isSupported = function () {
	    return typeof captureStackTrace === "function";
	};

	function formatNonError(obj) {
	    var str;
	    if (typeof obj === "function") {
	        str = "[function " +
	            (obj.name || "anonymous") +
	            "]";
	    } else {
	        str = obj.toString();
	        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
	        if (ruselessToString.test(str)) {
	            try {
	                var newStr = JSON.stringify(obj);
	                str = newStr;
	            }
	            catch(e) {

	            }
	        }
	        if (str.length === 0) {
	            str = "(empty array)";
	        }
	    }
	    return ("(<" + snip(str) + ">, no stack trace)");
	}

	function snip(str) {
	    var maxChars = 41;
	    if (str.length < maxChars) {
	        return str;
	    }
	    return str.substr(0, maxChars - 3) + "...";
	}

	var shouldIgnore = function() { return false; };
	var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
	function parseLineInfo(line) {
	    var matches = line.match(parseLineInfoRegex);
	    if (matches) {
	        return {
	            fileName: matches[1],
	            line: parseInt(matches[2], 10)
	        };
	    }
	}
	CapturedTrace.setBounds = function(firstLineError, lastLineError) {
	    if (!CapturedTrace.isSupported()) return;
	    var firstStackLines = firstLineError.stack.split("\n");
	    var lastStackLines = lastLineError.stack.split("\n");
	    var firstIndex = -1;
	    var lastIndex = -1;
	    var firstFileName;
	    var lastFileName;
	    for (var i = 0; i < firstStackLines.length; ++i) {
	        var result = parseLineInfo(firstStackLines[i]);
	        if (result) {
	            firstFileName = result.fileName;
	            firstIndex = result.line;
	            break;
	        }
	    }
	    for (var i = 0; i < lastStackLines.length; ++i) {
	        var result = parseLineInfo(lastStackLines[i]);
	        if (result) {
	            lastFileName = result.fileName;
	            lastIndex = result.line;
	            break;
	        }
	    }
	    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
	        firstFileName !== lastFileName || firstIndex >= lastIndex) {
	        return;
	    }

	    shouldIgnore = function(line) {
	        var info = parseLineInfo(line);
	        if (info) {
	            if (info.fileName === firstFileName &&
	                (firstIndex <= info.line && info.line <= lastIndex)) {
	                return true;
	            }
	        }
	        return false;
	    };
	};

	var captureStackTrace = (function stackDetection() {
	    if (typeof Error.stackTraceLimit === "number" &&
	        typeof Error.captureStackTrace === "function") {
	        rtraceline = /^\s*at\s*/;
	        formatStack = function(stack, error) {
	            if (typeof stack === "string") return stack;

	            if (error.name !== undefined &&
	                error.message !== undefined) {
	                return error.name + ". " + error.message;
	            }
	            return formatNonError(error);


	        };
	        var captureStackTrace = Error.captureStackTrace;
	        var bluebirdRegexp = /[\\\/]bluebird[\\\/]js[\\\/](main|debug|zalgo)/;
	        shouldIgnore = function(line) {
	            return bluebirdRegexp.test(line);
	        };
	        return function(receiver, ignoreUntil) {
	            captureStackTrace(receiver, ignoreUntil);
	        };
	    }
	    var err = new Error();

	    if (typeof err.stack === "string" &&
	        typeof "".startsWith === "function" &&
	        (err.stack.startsWith("stackDetection@")) &&
	        stackDetection.name === "stackDetection") {

	        defineProperty(Error, "stackTraceLimit", {
	            writable: true,
	            enumerable: false,
	            configurable: false,
	            value: 25
	        });
	        rtraceline = /@/;
	        var rline = /[@\n]/;

	        formatStack = function(stack, error) {
	            if (typeof stack === "string") {
	                return (error.name + ". " + error.message + "\n" + stack);
	            }

	            if (error.name !== undefined &&
	                error.message !== undefined) {
	                return error.name + ". " + error.message;
	            }
	            return formatNonError(error);
	        };

	        return function captureStackTrace(o) {
	            var stack = new Error().stack;
	            var split = stack.split(rline);
	            var len = split.length;
	            var ret = "";
	            for (var i = 0; i < len; i += 2) {
	                ret += split[i];
	                ret += "@";
	                ret += split[i + 1];
	                ret += "\n";
	            }
	            o.stack = ret;
	        };
	    } else {
	        formatStack = function(stack, error) {
	            if (typeof stack === "string") return stack;

	            if ((typeof error === "object" ||
	                typeof error === "function") &&
	                error.name !== undefined &&
	                error.message !== undefined) {
	                return error.name + ". " + error.message;
	            }
	            return formatNonError(error);
	        };

	        return null;
	    }
	})();

	return CapturedTrace;
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(NEXT_FILTER) {
	var util = __webpack_require__(15);
	var errors = __webpack_require__(17);
	var tryCatch1 = util.tryCatch1;
	var errorObj = util.errorObj;
	var keys = __webpack_require__(46).keys;
	var TypeError = errors.TypeError;

	function CatchFilter(instances, callback, promise) {
	    this._instances = instances;
	    this._callback = callback;
	    this._promise = promise;
	}

	function safePredicate(predicate, e) {
	    var safeObject = {};
	    var retfilter = tryCatch1(predicate, safeObject, e);

	    if (retfilter === errorObj) return retfilter;

	    var safeKeys = keys(safeObject);
	    if (safeKeys.length) {
	        errorObj.e = new TypeError("Catch filter must inherit from Error or be a simple predicate function\u000a\u000a    See http://goo.gl/o84o68\u000a");
	        return errorObj;
	    }
	    return retfilter;
	}

	CatchFilter.prototype.doFilter = function (e) {
	    var cb = this._callback;
	    var promise = this._promise;
	    var boundTo = promise._boundTo;
	    for (var i = 0, len = this._instances.length; i < len; ++i) {
	        var item = this._instances[i];
	        var itemIsErrorType = item === Error ||
	            (item != null && item.prototype instanceof Error);

	        if (itemIsErrorType && e instanceof item) {
	            var ret = tryCatch1(cb, boundTo, e);
	            if (ret === errorObj) {
	                NEXT_FILTER.e = ret.e;
	                return NEXT_FILTER;
	            }
	            return ret;
	        } else if (typeof item === "function" && !itemIsErrorType) {
	            var shouldHandle = safePredicate(item, e);
	            if (shouldHandle === errorObj) {
	                var trace = errors.canAttachTrace(errorObj.e)
	                    ? errorObj.e
	                    : new Error(util.toString(errorObj.e));
	                this._promise._attachExtraTrace(trace);
	                e = errorObj.e;
	                break;
	            } else if (shouldHandle) {
	                var ret = tryCatch1(cb, boundTo, e);
	                if (ret === errorObj) {
	                    NEXT_FILTER.e = ret.e;
	                    return NEXT_FILTER;
	                }
	                return ret;
	            }
	        }
	    }
	    NEXT_FILTER.e = e;
	    return NEXT_FILTER;
	};

	return CatchFilter;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(15);
	var maybeWrapAsError = util.maybeWrapAsError;
	var errors = __webpack_require__(17);
	var TimeoutError = errors.TimeoutError;
	var OperationalError = errors.OperationalError;
	var async = __webpack_require__(16);
	var haveGetters = util.haveGetters;
	var es5 = __webpack_require__(46);

	function isUntypedError(obj) {
	    return obj instanceof Error &&
	        es5.getPrototypeOf(obj) === Error.prototype;
	}

	function wrapAsOperationalError(obj) {
	    var ret;
	    if (isUntypedError(obj)) {
	        ret = new OperationalError(obj);
	    } else {
	        ret = obj;
	    }
	    errors.markAsOriginatingFromRejection(ret);
	    return ret;
	}

	function nodebackForPromise(promise) {
	    promise._setIsSpreadable();
	    return function(err, value) {
	        if (promise === null) return;

	        if (err) {
	            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
	            promise._attachExtraTrace(wrapped);
	            promise._reject(wrapped);
	        } else if (arguments.length > 2) {
	            var $_len = arguments.length;var args = new Array($_len - 1); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}
	            promise._fulfill(args);
	        } else {
	            promise._fulfill(value);
	        }

	        promise = null;
	    };
	}


	var PromiseResolver;
	if (!haveGetters) {
	    PromiseResolver = function (promise) {
	        this.promise = promise;
	        this.asCallback = nodebackForPromise(promise);
	        this.callback = this.asCallback;
	    };
	}
	else {
	    PromiseResolver = function (promise) {
	        this.promise = promise;
	    };
	}
	if (haveGetters) {
	    var prop = {
	        get: function() {
	            return nodebackForPromise(this.promise);
	        }
	    };
	    es5.defineProperty(PromiseResolver.prototype, "asCallback", prop);
	    es5.defineProperty(PromiseResolver.prototype, "callback", prop);
	}

	PromiseResolver._nodebackForPromise = nodebackForPromise;

	PromiseResolver.prototype.toString = function () {
	    return "[object PromiseResolver]";
	};

	PromiseResolver.prototype.resolve =
	PromiseResolver.prototype.fulfill = function (value) {
	    if (!(this instanceof PromiseResolver)) {
	        throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\u000a\u000a    See http://goo.gl/sdkXL9\u000a");
	    }

	    var promise = this.promise;
	    if (promise._tryFollow(value)) {
	        return;
	    }
	    async.invoke(promise._fulfill, promise, value);
	};

	PromiseResolver.prototype.reject = function (reason) {
	    if (!(this instanceof PromiseResolver)) {
	        throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\u000a\u000a    See http://goo.gl/sdkXL9\u000a");
	    }

	    var promise = this.promise;
	    errors.markAsOriginatingFromRejection(reason);
	    var trace = errors.canAttachTrace(reason)
	        ? reason : new Error(util.toString(reason));
	    promise._attachExtraTrace(trace);
	    async.invoke(promise._reject, promise, reason);
	    if (trace !== reason) {
	        async.invoke(this._setCarriedStackTrace, this, trace);
	    }
	};

	PromiseResolver.prototype.progress = function (value) {
	    if (!(this instanceof PromiseResolver)) {
	        throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\u000a\u000a    See http://goo.gl/sdkXL9\u000a");
	    }
	    async.invoke(this.promise._progress, this.promise, value);
	};

	PromiseResolver.prototype.cancel = function () {
	    async.invoke(this.promise.cancel, this.promise, undefined);
	};

	PromiseResolver.prototype.timeout = function () {
	    this.reject(new TimeoutError("timeout"));
	};

	PromiseResolver.prototype.isResolved = function () {
	    return this.promise.isResolved();
	};

	PromiseResolver.prototype.toJSON = function () {
	    return this.promise.toJSON();
	};

	PromiseResolver.prototype._setCarriedStackTrace = function (trace) {
	    if (this.promise.isRejected()) {
	        this.promise._setCarriedStackTrace(trace);
	    }
	};

	module.exports = PromiseResolver;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise) {
	var TypeError = __webpack_require__(17).TypeError;

	function apiRejection(msg) {
	    var error = new TypeError(msg);
	    var ret = Promise.rejected(error);
	    var parent = ret._peekContext();
	    if (parent != null) {
	        parent.attachExtraTrace(error);
	    }
	    return ret;
	}

	return apiRejection;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, NEXT_FILTER, tryConvertToPromise) {
	var util = __webpack_require__(15);
	var wrapsPrimitiveReceiver = util.wrapsPrimitiveReceiver;
	var isPrimitive = util.isPrimitive;
	var thrower = util.thrower;

	function returnThis() {
	    return this;
	}
	function throwThis() {
	    throw this;
	}
	function return$(r) {
	    return function() {
	        return r;
	    };
	}
	function throw$(r) {
	    return function() {
	        throw r;
	    };
	}
	function promisedFinally(ret, reasonOrValue, isFulfilled) {
	    var then;
	    if (wrapsPrimitiveReceiver && isPrimitive(reasonOrValue)) {
	        then = isFulfilled ? return$(reasonOrValue) : throw$(reasonOrValue);
	    } else {
	        then = isFulfilled ? returnThis : throwThis;
	    }
	    return ret._then(then, thrower, undefined, reasonOrValue, undefined);
	}

	function finallyHandler(reasonOrValue) {
	    var promise = this.promise;
	    var handler = this.handler;

	    var ret = promise._isBound()
	                    ? handler.call(promise._boundTo)
	                    : handler();

	    if (ret !== undefined) {
	        var maybePromise = tryConvertToPromise(ret, undefined);
	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            return promisedFinally(maybePromise, reasonOrValue,
	                                    promise.isFulfilled());
	        }
	    }

	    if (promise.isRejected()) {
	        NEXT_FILTER.e = reasonOrValue;
	        return NEXT_FILTER;
	    } else {
	        return reasonOrValue;
	    }
	}

	function tapHandler(value) {
	    var promise = this.promise;
	    var handler = this.handler;

	    var ret = promise._isBound()
	                    ? handler.call(promise._boundTo, value)
	                    : handler(value);

	    if (ret !== undefined) {
	        var maybePromise = tryConvertToPromise(ret, undefined);
	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            return promisedFinally(maybePromise, value, true);
	        }
	    }
	    return value;
	}

	Promise.prototype._passThroughHandler = function (handler, isFinally) {
	    if (typeof handler !== "function") return this.then();

	    var promiseAndHandler = {
	        promise: this,
	        handler: handler
	    };

	    return this._then(
	            isFinally ? finallyHandler : tapHandler,
	            isFinally ? finallyHandler : undefined, undefined,
	            promiseAndHandler, undefined);
	};

	Promise.prototype.lastly =
	Promise.prototype["finally"] = function (handler) {
	    return this._passThroughHandler(handler, true);
	};

	Promise.prototype.tap = function (handler) {
	    return this._passThroughHandler(handler, false);
	};
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(15);
	var isPrimitive = util.isPrimitive;
	var wrapsPrimitiveReceiver = util.wrapsPrimitiveReceiver;

	module.exports = function(Promise) {
	var returner = function () {
	    return this;
	};
	var thrower = function () {
	    throw this;
	};

	var wrapper = function (value, action) {
	    if (action === 1) {
	        return function () {
	            throw value;
	        };
	    } else if (action === 2) {
	        return function () {
	            return value;
	        };
	    }
	};


	Promise.prototype["return"] =
	Promise.prototype.thenReturn = function (value) {
	    if (wrapsPrimitiveReceiver && isPrimitive(value)) {
	        return this._then(
	            wrapper(value, 2),
	            undefined,
	            undefined,
	            undefined,
	            undefined
	       );
	    }
	    return this._then(returner, undefined, undefined, value, undefined);
	};

	Promise.prototype["throw"] =
	Promise.prototype.thenThrow = function (reason) {
	    if (wrapsPrimitiveReceiver && isPrimitive(reason)) {
	        return this._then(
	            wrapper(reason, 1),
	            undefined,
	            undefined,
	            undefined,
	            undefined
	       );
	    }
	    return this._then(thrower, undefined, undefined, reason, undefined);
	};
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise) {
	function PromiseInspection(promise) {
	    if (promise !== undefined) {
	        promise = promise._target();
	        this._bitField = promise._bitField;
	        this._settledValue = promise._isResolved()
	            ? promise._settledValue
	            : undefined;
	    }
	    else {
	        this._bitField = 0;
	        this._settledValue = undefined;
	    }
	}

	PromiseInspection.prototype.value = function () {
	    if (!this.isFulfilled()) {
	        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/hc1DLj\u000a");
	    }
	    return this._settledValue;
	};

	PromiseInspection.prototype.error =
	PromiseInspection.prototype.reason = function () {
	    if (!this.isRejected()) {
	        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/hPuiwB\u000a");
	    }
	    return this._settledValue;
	};

	PromiseInspection.prototype.isFulfilled =
	Promise.prototype._isFulfilled = function () {
	    return (this._bitField & 268435456) > 0;
	};

	PromiseInspection.prototype.isRejected =
	Promise.prototype._isRejected = function () {
	    return (this._bitField & 134217728) > 0;
	};

	PromiseInspection.prototype.isPending =
	Promise.prototype._isPending = function () {
	    return (this._bitField & 402653184) === 0;
	};

	PromiseInspection.prototype.isResolved =
	Promise.prototype._isResolved = function () {
	    return (this._bitField & 402653184) > 0;
	};

	Promise.prototype.isPending = function() {
	    return this._target()._isPending();
	};

	Promise.prototype.isRejected = function() {
	    return this._target()._isRejected();
	};

	Promise.prototype.isFulfilled = function() {
	    return this._target()._isFulfilled();
	};

	Promise.prototype.isResolved = function() {
	    return this._target()._isResolved();
	};

	Promise.prototype._value = function() {
	    return this._settledValue;
	};

	Promise.prototype._reason = function() {
	    return this._settledValue;
	};

	Promise.prototype.value = function() {
	    var target = this._target();
	    if (!target.isFulfilled()) {
	        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/hc1DLj\u000a");
	    }
	    return target._settledValue;
	};

	Promise.prototype.reason = function() {
	    var target = this._target();
	    if (!target.isRejected()) {
	        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/hPuiwB\u000a");
	    }
	    return target._settledValue;
	};


	Promise.PromiseInspection = PromiseInspection;
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	function(Promise, PromiseArray, tryConvertToPromise, INTERNAL) {
	var util = __webpack_require__(15);
	var canEvaluate = util.canEvaluate;
	var tryCatch1 = util.tryCatch1;
	var errorObj = util.errorObj;


	if (canEvaluate) {
	    var thenCallback = function(i) {
	        return new Function("value", "holder", "                             \n\
	            'use strict';                                                    \n\
	            holder.pIndex = value;                                           \n\
	            holder.checkFulfillment(this);                                   \n\
	            ".replace(/Index/g, i));
	    };

	    var caller = function(count) {
	        var values = [];
	        for (var i = 1; i <= count; ++i) values.push("holder.p" + i);
	        return new Function("holder", "                                      \n\
	            'use strict';                                                    \n\
	            var callback = holder.fn;                                        \n\
	            return callback(values);                                         \n\
	            ".replace(/values/g, values.join(", ")));
	    };
	    var thenCallbacks = [];
	    var callers = [undefined];
	    for (var i = 1; i <= 5; ++i) {
	        thenCallbacks.push(thenCallback(i));
	        callers.push(caller(i));
	    }

	    var Holder = function(total, fn) {
	        this.p1 = this.p2 = this.p3 = this.p4 = this.p5 = null;
	        this.fn = fn;
	        this.total = total;
	        this.now = 0;
	    };

	    Holder.prototype.callers = callers;
	    Holder.prototype.checkFulfillment = function(promise) {
	        var now = this.now;
	        now++;
	        var total = this.total;
	        if (now >= total) {
	            var handler = this.callers[total];
	            var ret = tryCatch1(handler, undefined, this);
	            if (ret === errorObj) {
	                promise._rejectUnchecked(ret.e);
	            } else if (!promise._tryFollow(ret)) {
	                promise._fulfillUnchecked(ret);
	            }
	        } else {
	            this.now = now;
	        }
	    };
	}

	function reject(reason) {
	    this._reject(reason);
	}

	Promise.join = function () {
	    var last = arguments.length - 1;
	    var fn;
	    if (last > 0 && typeof arguments[last] === "function") {
	        fn = arguments[last];
	        if (last < 6 && canEvaluate) {
	            var ret = new Promise(INTERNAL);
	            ret._setTrace(undefined);
	            var holder = new Holder(last, fn);
	            var callbacks = thenCallbacks;
	            for (var i = 0; i < last; ++i) {
	                var maybePromise = tryConvertToPromise(arguments[i], undefined);
	                if (maybePromise instanceof Promise) {
	                    maybePromise = maybePromise._target();
	                    if (maybePromise._isPending()) {
	                        maybePromise._then(callbacks[i], reject,
	                                           undefined, ret, holder);
	                    } else if (maybePromise._isFulfilled()) {
	                        callbacks[i].call(ret,
	                                          maybePromise._value(), holder);
	                    } else {
	                        ret._reject(maybePromise._reason());
	                        maybePromise._unsetRejectionIsUnhandled();
	                    }
	                } else {
	                    callbacks[i].call(ret, maybePromise, holder);
	                }
	            }
	            return ret;
	        }
	    }
	    var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];}
	    var ret = new PromiseArray(args).promise();
	    return fn !== undefined ? ret.spread(fn) : ret;
	};

	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise) {
	var util = __webpack_require__(15);
	var async = __webpack_require__(16);
	var tryCatch2 = util.tryCatch2;
	var tryCatch1 = util.tryCatch1;
	var errorObj = util.errorObj;

	function spreadAdapter(val, receiver) {
	    if (!util.isArray(val)) return successAdapter(val, receiver);
	    var ret = util.tryCatchApply(this, [null].concat(val), receiver);
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}

	function successAdapter(val, receiver) {
	    var nodeback = this;
	    var ret = val === undefined
	        ? tryCatch1(nodeback, receiver, null)
	        : tryCatch2(nodeback, receiver, null, val);
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}
	function errorAdapter(reason, receiver) {
	    var nodeback = this;
	    var ret = tryCatch1(nodeback, receiver, reason);
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}

	Promise.prototype.nodeify = function (nodeback, options) {
	    if (typeof nodeback == "function") {
	        var adapter = successAdapter;
	        if (options !== undefined && Object(options).spread) {
	            adapter = spreadAdapter;
	        }
	        this._then(
	            adapter,
	            errorAdapter,
	            undefined,
	            nodeback,
	            this._boundTo
	        );
	    }
	    return this;
	};
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function (Promise, apiRejection, tryConvertToPromise) {
	    var TypeError = __webpack_require__(17).TypeError;
	    var inherits = __webpack_require__(15).inherits;
	    var PromiseInspection = Promise.PromiseInspection;

	    function inspectionMapper(inspections) {
	        var len = inspections.length;
	        for (var i = 0; i < len; ++i) {
	            var inspection = inspections[i];
	            if (inspection.isRejected()) {
	                return Promise.reject(inspection.error());
	            }
	            inspections[i] = inspection._settledValue;
	        }
	        return inspections;
	    }

	    function thrower(e) {
	        setTimeout(function(){throw e;}, 0);
	    }

	    function castPreservingDisposable(thenable) {
	        var maybePromise = tryConvertToPromise(thenable, undefined);
	        if (maybePromise !== thenable &&
	            typeof thenable._isDisposable === "function" &&
	            typeof thenable._getDisposer === "function" &&
	            thenable._isDisposable()) {
	            maybePromise._setDisposable(thenable._getDisposer());
	        }
	        return maybePromise;
	    }
	    function dispose(resources, inspection) {
	        var i = 0;
	        var len = resources.length;
	        var ret = Promise.defer();
	        function iterator() {
	            if (i >= len) return ret.resolve();
	            var maybePromise = castPreservingDisposable(resources[i++]);
	            if (maybePromise instanceof Promise &&
	                maybePromise._isDisposable()) {
	                try {
	                    maybePromise = tryConvertToPromise(
	                        maybePromise._getDisposer().tryDispose(inspection),
	                        undefined);
	                } catch (e) {
	                    return thrower(e);
	                }
	                if (maybePromise instanceof Promise) {
	                    return maybePromise._then(iterator, thrower,
	                                              null, null, null);
	                }
	            }
	            iterator();
	        }
	        iterator();
	        return ret.promise;
	    }

	    function disposerSuccess(value) {
	        var inspection = new PromiseInspection();
	        inspection._settledValue = value;
	        inspection._bitField = 268435456;
	        return dispose(this, inspection).thenReturn(value);
	    }

	    function disposerFail(reason) {
	        var inspection = new PromiseInspection();
	        inspection._settledValue = reason;
	        inspection._bitField = 134217728;
	        return dispose(this, inspection).thenThrow(reason);
	    }

	    function Disposer(data, promise) {
	        this._data = data;
	        this._promise = promise;
	    }

	    Disposer.prototype.data = function () {
	        return this._data;
	    };

	    Disposer.prototype.promise = function () {
	        return this._promise;
	    };

	    Disposer.prototype.resource = function () {
	        if (this.promise()._isFulfilled()) {
	            return this.promise()._value();
	        }
	        return null;
	    };

	    Disposer.prototype.tryDispose = function(inspection) {
	        var resource = this.resource();
	        var ret = resource !== null
	            ? this.doDispose(resource, inspection) : null;
	        this._promise._unsetDisposable();
	        this._data = this._promise = null;
	        return ret;
	    };

	    Disposer.isDisposer = function (d) {
	        return (d != null &&
	                typeof d.resource === "function" &&
	                typeof d.tryDispose === "function");
	    };

	    function FunctionDisposer(fn, promise) {
	        this.constructor$(fn, promise);
	    }
	    inherits(FunctionDisposer, Disposer);

	    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
	        var fn = this.data();
	        return fn.call(resource, resource, inspection);
	    };

	    Promise.using = function () {
	        var len = arguments.length;
	        if (len < 2) return apiRejection(
	                        "you must pass at least 2 arguments to Promise.using");
	        var fn = arguments[len - 1];
	        if (typeof fn !== "function") return apiRejection("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a");
	        len--;
	        var resources = new Array(len);
	        for (var i = 0; i < len; ++i) {
	            var resource = arguments[i];
	            if (Disposer.isDisposer(resource)) {
	                var disposer = resource;
	                resource = resource.promise();
	                resource._setDisposable(disposer);
	            }
	            resources[i] = resource;
	        }

	        return Promise.settle(resources)
	            .then(inspectionMapper)
	            .spread(fn)
	            ._then(
	                disposerSuccess, disposerFail, undefined, resources, undefined);
	    };

	    Promise.prototype._setDisposable = function (disposer) {
	        this._bitField = this._bitField | 262144;
	        this._disposer = disposer;
	    };

	    Promise.prototype._isDisposable = function () {
	        return (this._bitField & 262144) > 0;
	    };

	    Promise.prototype._getDisposer = function () {
	        return this._disposer;
	    };

	    Promise.prototype._unsetDisposable = function () {
	        this._bitField = this._bitField & (~262144);
	        this._disposer = undefined;
	    };

	    Promise.prototype.disposer = function (fn) {
	        if (typeof fn === "function") {
	            return new FunctionDisposer(fn, this._target());
	        }
	        throw new TypeError();
	    };

	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise,
	                          apiRejection,
	                          INTERNAL,
	                          tryConvertToPromise) {
	var errors = __webpack_require__(17);
	var TypeError = errors.TypeError;
	var deprecated = __webpack_require__(15).deprecated;
	var util = __webpack_require__(15);
	var errorObj = util.errorObj;
	var tryCatch1 = util.tryCatch1;
	var yieldHandlers = [];

	function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
	    var _errorObj = errorObj;
	    var _Promise = Promise;
	    var len = yieldHandlers.length;
	    for (var i = 0; i < len; ++i) {
	        var result = tryCatch1(yieldHandlers[i], undefined, value);
	        if (result === _errorObj) {
	            return _Promise.reject(_errorObj.e);
	        }
	        var maybePromise = tryConvertToPromise(result, traceParent);
	        if (maybePromise instanceof _Promise) return maybePromise;
	    }
	    return null;
	}

	function PromiseSpawn(generatorFunction, receiver, yieldHandler) {
	    var promise = this._promise = new Promise(INTERNAL);
	    promise._setTrace(undefined);
	    this._generatorFunction = generatorFunction;
	    this._receiver = receiver;
	    this._generator = undefined;
	    this._yieldHandlers = typeof yieldHandler === "function"
	        ? [yieldHandler].concat(yieldHandlers)
	        : yieldHandlers;
	}

	PromiseSpawn.prototype.promise = function () {
	    return this._promise;
	};

	PromiseSpawn.prototype._run = function () {
	    this._generator = this._generatorFunction.call(this._receiver);
	    this._receiver =
	        this._generatorFunction = undefined;
	    this._next(undefined);
	};

	PromiseSpawn.prototype._continue = function (result) {
	    if (result === errorObj) {
	        this._generator = undefined;
	        var trace = errors.canAttachTrace(result.e)
	            ? result.e : new Error(util.toString(result.e));
	        this._promise._attachExtraTrace(trace);
	        this._promise._reject(result.e, trace);
	        return;
	    }

	    var value = result.value;
	    if (result.done === true) {
	        this._generator = undefined;
	        if (!this._promise._tryFollow(value)) {
	            this._promise._fulfill(value);
	        }
	    } else {
	        var maybePromise = tryConvertToPromise(value, this._promise);
	        if (!(maybePromise instanceof Promise)) {
	            maybePromise =
	                promiseFromYieldHandler(maybePromise,
	                                        this._yieldHandlers,
	                                        this._promise);
	            if (maybePromise === null) {
	                this._throw(new TypeError("A value was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/4Y4pDk\u000a"));
	                return;
	            }
	        }
	        maybePromise._then(
	            this._next,
	            this._throw,
	            undefined,
	            this,
	            null
	       );
	    }
	};

	PromiseSpawn.prototype._throw = function (reason) {
	    if (errors.canAttachTrace(reason))
	        this._promise._attachExtraTrace(reason);
	    this._continue(
	        tryCatch1(this._generator["throw"], this._generator, reason)
	   );
	};

	PromiseSpawn.prototype._next = function (value) {
	    this._continue(
	        tryCatch1(this._generator.next, this._generator, value)
	   );
	};

	Promise.coroutine = function (generatorFunction, options) {
	    if (typeof generatorFunction !== "function") {
	        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/6Vqhm0\u000a");
	    }
	    var yieldHandler = Object(options).yieldHandler;
	    var PromiseSpawn$ = PromiseSpawn;
	    return function () {
	        var generator = generatorFunction.apply(this, arguments);
	        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler);
	        spawn._generator = generator;
	        spawn._next(undefined);
	        return spawn.promise();
	    };
	};

	Promise.coroutine.addYieldHandler = function(fn) {
	    if (typeof fn !== "function") throw new TypeError("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a");
	    yieldHandlers.push(fn);
	};

	Promise.spawn = function (generatorFunction) {
	    deprecated("Promise.spawn is deprecated. Use Promise.coroutine instead.");
	    if (typeof generatorFunction !== "function") {
	        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/6Vqhm0\u000a");
	    }
	    var spawn = new PromiseSpawn(generatorFunction, this);
	    var ret = spawn.promise();
	    spawn._run(Promise.spawn);
	    return ret;
	};
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise,
	                          PromiseArray,
	                          apiRejection,
	                          tryConvertToPromise,
	                          INTERNAL) {
	var util = __webpack_require__(15);
	var tryCatch3 = util.tryCatch3;
	var errorObj = util.errorObj;
	var PENDING = {};
	var EMPTY_ARRAY = [];

	function MappingPromiseArray(promises, fn, limit, _filter) {
	    this.constructor$(promises);
	    this._promise._setIsSpreadable();
	    this._callback = fn;
	    this._preservedValues = _filter === INTERNAL
	        ? new Array(this.length())
	        : null;
	    this._limit = limit;
	    this._inFlight = 0;
	    this._queue = limit >= 1 ? [] : EMPTY_ARRAY;
	    this._init$(undefined, -2);
	}
	util.inherits(MappingPromiseArray, PromiseArray);

	MappingPromiseArray.prototype._init = function () {};

	MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    var values = this._values;
	    var length = this.length();
	    var preservedValues = this._preservedValues;
	    var limit = this._limit;
	    if (values[index] === PENDING) {
	        values[index] = value;
	        if (limit >= 1) {
	            this._inFlight--;
	            this._drainQueue();
	            if (this._isResolved()) return;
	        }
	    } else {
	        if (limit >= 1 && this._inFlight >= limit) {
	            values[index] = value;
	            this._queue.push(index);
	            return;
	        }
	        if (preservedValues !== null) preservedValues[index] = value;

	        var callback = this._callback;
	        var receiver = this._promise._boundTo;
	        var ret = tryCatch3(callback, receiver, value, index, length);
	        if (ret === errorObj) return this._reject(ret.e);

	        var maybePromise = tryConvertToPromise(ret, this._promise);
	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            if (maybePromise._isPending()) {
	                if (limit >= 1) this._inFlight++;
	                values[index] = PENDING;
	                return maybePromise._proxyPromiseArray(this, index);
	            } else if (maybePromise._isFulfilled()) {
	                ret = maybePromise._value();
	            } else {
	                maybePromise._unsetRejectionIsUnhandled();
	                return this._reject(maybePromise._reason());
	            }
	        }
	        values[index] = ret;
	    }
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= length) {
	        if (preservedValues !== null) {
	            this._filter(values, preservedValues);
	        } else {
	            this._resolve(values);
	        }

	    }
	};

	MappingPromiseArray.prototype._drainQueue = function () {
	    var queue = this._queue;
	    var limit = this._limit;
	    var values = this._values;
	    while (queue.length > 0 && this._inFlight < limit) {
	        if (this._isResolved()) return;
	        var index = queue.pop();
	        this._promiseFulfilled(values[index], index);
	    }
	};

	MappingPromiseArray.prototype._filter = function (booleans, values) {
	    var len = values.length;
	    var ret = new Array(len);
	    var j = 0;
	    for (var i = 0; i < len; ++i) {
	        if (booleans[i]) ret[j++] = values[i];
	    }
	    ret.length = j;
	    this._resolve(ret);
	};

	MappingPromiseArray.prototype.preservedValues = function () {
	    return this._preservedValues;
	};

	function map(promises, fn, options, _filter) {
	    var limit = typeof options === "object" && options !== null
	        ? options.concurrency
	        : 0;
	    limit = typeof limit === "number" &&
	        isFinite(limit) && limit >= 1 ? limit : 0;
	    return new MappingPromiseArray(promises, fn, limit, _filter);
	}

	Promise.prototype.map = function (fn, options) {
	    if (typeof fn !== "function") return apiRejection("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a");

	    return map(this, fn, options, null).promise();
	};

	Promise.map = function (promises, fn, options, _filter) {
	    if (typeof fn !== "function") return apiRejection("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a");
	    return map(promises, fn, options, _filter).promise();
	};


	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var errors = __webpack_require__(17);
	var canAttachTrace = errors.canAttachTrace;
	var async = __webpack_require__(16);
	var util = __webpack_require__(15);
	var CancellationError = errors.CancellationError;

	Promise.prototype._cancel = function (reason) {
	    if (!this.isCancellable()) return this;
	    var parent;
	    var promiseToReject = this;
	    while ((parent = promiseToReject._cancellationParent) !== undefined &&
	        parent.isCancellable()) {
	        promiseToReject = parent;
	    }
	    this._unsetCancellable();
	    var trace = canAttachTrace(reason) ? reason
	                                       : new Error(util.toString(reason));
	    promiseToReject._attachExtraTrace(trace);
	    promiseToReject._target()._rejectUnchecked(reason, trace);
	};

	Promise.prototype.cancel = function (reason) {
	    if (!this.isCancellable()) return this;
	    if (reason === undefined) reason = new CancellationError();
	    async.invokeLater(this._cancel, this, reason);
	    return this;
	};

	Promise.prototype.cancellable = function () {
	    if (this._cancellable()) return this;
	    this._setCancellable();
	    this._cancellationParent = undefined;
	    return this;
	};

	Promise.prototype.uncancellable = function () {
	    var ret = new Promise(INTERNAL);
	    ret._propagateFrom(this, 2 | 4);
	    ret._follow(this);
	    ret._unsetCancellable();
	    return ret;
	};

	Promise.prototype.fork = function (didFulfill, didReject, didProgress) {
	    var ret = this._then(didFulfill, didReject, didProgress,
	                         undefined, undefined);

	    ret._setCancellable();
	    ret._cancellationParent = undefined;
	    return ret;
	};
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var THIS = {};
	var util = __webpack_require__(15);
	var nodebackForPromise = __webpack_require__(22)
	    ._nodebackForPromise;
	var withAppended = util.withAppended;
	var maybeWrapAsError = util.maybeWrapAsError;
	var canEvaluate = util.canEvaluate;
	var TypeError = __webpack_require__(17).TypeError;
	var defaultSuffix = "Async";
	var defaultFilter = function(name, func) {
	    return util.isIdentifier(name) &&
	        name.charAt(0) !== "_" &&
	        !util.isClass(func);
	};
	var defaultPromisified = {__isPromisified__: true};


	function escapeIdentRegex(str) {
	    return str.replace(/([$])/, "\\$");
	}

	function isPromisified(fn) {
	    try {
	        return fn.__isPromisified__ === true;
	    }
	    catch (e) {
	        return false;
	    }
	}

	function hasPromisified(obj, key, suffix) {
	    var val = util.getDataPropertyOrDefault(obj, key + suffix,
	                                            defaultPromisified);
	    return val ? isPromisified(val) : false;
	}
	function checkValid(ret, suffix, suffixRegexp) {
	    for (var i = 0; i < ret.length; i += 2) {
	        var key = ret[i];
	        if (suffixRegexp.test(key)) {
	            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
	            for (var j = 0; j < ret.length; j += 2) {
	                if (ret[j] === keyWithoutAsyncSuffix) {
	                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/iWrZbw\u000a"
	                        .replace("%s", suffix));
	                }
	            }
	        }
	    }
	}

	function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
	    var keys = util.inheritedDataKeys(obj);
	    var ret = [];
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var value = obj[key];
	        if (typeof value === "function" &&
	            !isPromisified(value) &&
	            !hasPromisified(obj, key, suffix) &&
	            filter(key, value, obj)) {
	            ret.push(key, value);
	        }
	    }
	    checkValid(ret, suffix, suffixRegexp);
	    return ret;
	}

	function switchCaseArgumentOrder(likelyArgumentCount) {
	    var ret = [likelyArgumentCount];
	    var min = Math.max(0, likelyArgumentCount - 1 - 5);
	    for(var i = likelyArgumentCount - 1; i >= min; --i) {
	        if (i === likelyArgumentCount) continue;
	        ret.push(i);
	    }
	    for(var i = likelyArgumentCount + 1; i <= 5; ++i) {
	        ret.push(i);
	    }
	    return ret;
	}

	function argumentSequence(argumentCount) {
	    return util.filledRange(argumentCount, "arguments[", "]");
	}

	function parameterDeclaration(parameterCount) {
	    return util.filledRange(parameterCount, "_arg", "");
	}

	function parameterCount(fn) {
	    if (typeof fn.length === "number") {
	        return Math.max(Math.min(fn.length, 1023 + 1), 0);
	    }
	    return 0;
	}

	function generatePropertyAccess(key) {
	    if (util.isIdentifier(key)) {
	        return "." + key;
	    }
	    else return "['" + key.replace(/(['\\])/g, "\\$1") + "']";
	}

	function makeNodePromisifiedEval(callback, receiver, originalName, fn, suffix) {
	    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
	    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
	    var callbackName =
	        (typeof originalName === "string" && util.isIdentifier(originalName)
	            ? originalName + suffix
	            : "promisified");

	    function generateCallForArgumentCount(count) {
	        var args = argumentSequence(count).join(", ");
	        var comma = count > 0 ? ", " : "";
	        var ret;
	        if (typeof callback === "string") {
	            ret = "                                                          \n\
	                this.method({{args}}, fn);                                   \n\
	                break;                                                       \n\
	            ".replace(".method", generatePropertyAccess(callback));
	        } else if (receiver === THIS) {
	            ret =  "                                                         \n\
	                callback.call(this, {{args}}, fn);                           \n\
	                break;                                                       \n\
	            ";
	        } else if (receiver !== undefined) {
	            ret =  "                                                         \n\
	                callback.call(receiver, {{args}}, fn);                       \n\
	                break;                                                       \n\
	            ";
	        } else {
	            ret =  "                                                         \n\
	                callback({{args}}, fn);                                      \n\
	                break;                                                       \n\
	            ";
	        }
	        return ret.replace("{{args}}", args).replace(", ", comma);
	    }

	    function generateArgumentSwitchCase() {
	        var ret = "";
	        for(var i = 0; i < argumentOrder.length; ++i) {
	            ret += "case " + argumentOrder[i] +":" +
	                generateCallForArgumentCount(argumentOrder[i]);
	        }
	        var codeForCall;
	        if (typeof callback === "string") {
	            codeForCall = "                                                  \n\
	                this.property.apply(this, args);                             \n\
	            "
	                .replace(".property", generatePropertyAccess(callback));
	        } else if (receiver === THIS) {
	            codeForCall = "                                                  \n\
	                callback.apply(this, args);                                  \n\
	            ";
	        } else {
	            codeForCall = "                                                  \n\
	                callback.apply(receiver, args);                              \n\
	            ";
	        }

	        ret += "                                                             \n\
	        default:                                                             \n\
	            var args = new Array(len + 1);                                   \n\
	            var i = 0;                                                       \n\
	            for (var i = 0; i < len; ++i) {                                  \n\
	               args[i] = arguments[i];                                       \n\
	            }                                                                \n\
	            args[i] = fn;                                                    \n\
	            [CodeForCall]                                                    \n\
	            break;                                                           \n\
	        ".replace("[CodeForCall]", codeForCall);
	        return ret;
	    }

	    return new Function("Promise",
	                        "callback",
	                        "receiver",
	                        "withAppended",
	                        "maybeWrapAsError",
	                        "nodebackForPromise",
	                        "INTERNAL","                                         \n\
	        var ret = function (Parameters) {                        \n\
	            'use strict';                                                    \n\
	            var len = arguments.length;                                      \n\
	            var promise = new Promise(INTERNAL);                             \n\
	            promise._setTrace(undefined);                                    \n\
	            var fn = nodebackForPromise(promise);                            \n\
	            try {                                                            \n\
	                switch(len) {                                                \n\
	                    [CodeForSwitchCase]                                      \n\
	                }                                                            \n\
	            } catch (e) {                                                    \n\
	                var wrapped = maybeWrapAsError(e);                           \n\
	                promise._attachExtraTrace(wrapped);                          \n\
	                promise._reject(wrapped);                                    \n\
	            }                                                                \n\
	            return promise;                                                  \n\
	        };                                                                   \n\
	        ret.__isPromisified__ = true;                                        \n\
	        return ret;                                                          \n\
	        "
	        .replace("FunctionName", callbackName)
	        .replace("Parameters", parameterDeclaration(newParameterCount))
	        .replace("[CodeForSwitchCase]", generateArgumentSwitchCase()))(
	            Promise,
	            callback,
	            receiver,
	            withAppended,
	            maybeWrapAsError,
	            nodebackForPromise,
	            INTERNAL
	        );
	}

	function makeNodePromisifiedClosure(callback, receiver) {
	    function promisified() {
	        var _receiver = receiver;
	        if (receiver === THIS) _receiver = this;
	        if (typeof callback === "string") {
	            callback = _receiver[callback];
	        }
	        var promise = new Promise(INTERNAL);
	        promise._setTrace(undefined);
	        var fn = nodebackForPromise(promise);
	        try {
	            callback.apply(_receiver, withAppended(arguments, fn));
	        } catch(e) {
	            var wrapped = maybeWrapAsError(e);
	            promise._attachExtraTrace(wrapped);
	            promise._reject(wrapped);
	        }
	        return promise;
	    }
	    promisified.__isPromisified__ = true;
	    return promisified;
	}

	var makeNodePromisified = canEvaluate
	    ? makeNodePromisifiedEval
	    : makeNodePromisifiedClosure;

	function promisifyAll(obj, suffix, filter, promisifier) {
	    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
	    var methods =
	        promisifiableMethods(obj, suffix, suffixRegexp, filter);

	    for (var i = 0, len = methods.length; i < len; i+= 2) {
	        var key = methods[i];
	        var fn = methods[i+1];
	        var promisifiedKey = key + suffix;
	        obj[promisifiedKey] = promisifier === makeNodePromisified
	                ? makeNodePromisified(key, THIS, key, fn, suffix)
	                : promisifier(fn);
	    }
	    util.toFastProperties(obj);
	    return obj;
	}

	function promisify(callback, receiver) {
	    return makeNodePromisified(callback, receiver, undefined, callback);
	}

	Promise.promisify = function (fn, receiver) {
	    if (typeof fn !== "function") {
	        throw new TypeError("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a");
	    }
	    if (isPromisified(fn)) {
	        return fn;
	    }
	    return promisify(fn, arguments.length < 2 ? THIS : receiver);
	};

	Promise.promisifyAll = function (target, options) {
	    if (typeof target !== "function" && typeof target !== "object") {
	        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/9ITlV0\u000a");
	    }
	    options = Object(options);
	    var suffix = options.suffix;
	    if (typeof suffix !== "string") suffix = defaultSuffix;
	    var filter = options.filter;
	    if (typeof filter !== "function") filter = defaultFilter;
	    var promisifier = options.promisifier;
	    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

	    if (!util.isIdentifier(suffix)) {
	        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/8FZo5V\u000a");
	    }

	    var keys = util.inheritedDataKeys(target, {includeHidden: true});
	    for (var i = 0; i < keys.length; ++i) {
	        var value = target[keys[i]];
	        if (keys[i] !== "constructor" &&
	            util.isClass(value)) {
	            promisifyAll(value.prototype, suffix, filter, promisifier);
	            promisifyAll(value, suffix, filter, promisifier);
	        }
	    }

	    return promisifyAll(target, suffix, filter, promisifier);
	};
	};



/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, PromiseArray, tryConvertToPromise) {
	var util = __webpack_require__(15);
	var apiRejection = __webpack_require__(23)(Promise);
	var isObject = util.isObject;
	var es5 = __webpack_require__(46);

	function PropertiesPromiseArray(obj) {
	    var keys = es5.keys(obj);
	    var len = keys.length;
	    var values = new Array(len * 2);
	    for (var i = 0; i < len; ++i) {
	        var key = keys[i];
	        values[i] = obj[key];
	        values[i + len] = key;
	    }
	    this.constructor$(values);
	}
	util.inherits(PropertiesPromiseArray, PromiseArray);

	PropertiesPromiseArray.prototype._init = function () {
	    this._init$(undefined, -3) ;
	};

	PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        var val = {};
	        var keyOffset = this.length();
	        for (var i = 0, len = this.length(); i < len; ++i) {
	            val[this._values[i + keyOffset]] = this._values[i];
	        }
	        this._resolve(val);
	    }
	};

	PropertiesPromiseArray.prototype._promiseProgressed = function (value, index) {
	    this._promise._progress({
	        key: this._values[index + this.length()],
	        value: value
	    });
	};

	PropertiesPromiseArray.prototype.shouldCopyValues = function () {
	    return false;
	};

	PropertiesPromiseArray.prototype.getActualLength = function (len) {
	    return len >> 1;
	};

	function props(promises) {
	    var ret;
	    var castValue = tryConvertToPromise(promises, undefined);

	    if (!isObject(castValue)) {
	        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/OsFKC8\u000a");
	    } else if (castValue instanceof Promise) {
	        ret = castValue._then(
	            Promise.props, undefined, undefined, undefined, undefined);
	    } else {
	        ret = new PropertiesPromiseArray(castValue).promise();
	    }

	    if (castValue instanceof Promise) {
	        ret._propagateFrom(castValue, 4);
	    }
	    return ret;
	}

	Promise.prototype.props = function () {
	    return props(this);
	};

	Promise.props = function (promises) {
	    return props(promises);
	};
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL, tryConvertToPromise) {
	var apiRejection = __webpack_require__(23)(Promise);
	var isArray = __webpack_require__(15).isArray;

	var raceLater = function (promise) {
	    return promise.then(function(array) {
	        return race(array, promise);
	    });
	};

	function race(promises, parent) {
	    var maybePromise = tryConvertToPromise(promises, undefined);

	    if (maybePromise instanceof Promise) {
	        return raceLater(maybePromise);
	    } else if (!isArray(promises)) {
	        return apiRejection("expecting an array, a promise or a thenable\u000a\u000a    See http://goo.gl/s8MMhc\u000a");
	    }

	    var ret = new Promise(INTERNAL);
	    if (parent !== undefined) {
	        ret._propagateFrom(parent, 7);
	    } else {
	        ret._setTrace(undefined);
	    }
	    var fulfill = ret._fulfill;
	    var reject = ret._reject;
	    for (var i = 0, len = promises.length; i < len; ++i) {
	        var val = promises[i];

	        if (val === undefined && !(i in promises)) {
	            continue;
	        }

	        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
	    }
	    return ret;
	}

	Promise.race = function (promises) {
	    return race(promises, undefined);
	};

	Promise.prototype.race = function () {
	    return race(this, undefined);
	};

	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise,
	                          PromiseArray,
	                          apiRejection,
	                          tryConvertToPromise,
	                          INTERNAL) {
	var util = __webpack_require__(15);
	var tryCatch4 = util.tryCatch4;
	var tryCatch3 = util.tryCatch3;
	var errorObj = util.errorObj;
	function ReductionPromiseArray(promises, fn, accum, _each) {
	    this.constructor$(promises);
	    this._preservedValues = _each === INTERNAL ? [] : null;
	    this._zerothIsAccum = (accum === undefined);
	    this._gotAccum = false;
	    this._reducingIndex = (this._zerothIsAccum ? 1 : 0);
	    this._valuesPhase = undefined;

	    var maybePromise = tryConvertToPromise(accum, undefined);
	    var rejected = false;
	    var isPromise = maybePromise instanceof Promise;
	    if (isPromise) {
	        maybePromise = maybePromise._target();
	        if (maybePromise._isPending()) {
	            maybePromise._proxyPromiseArray(this, -1);
	        } else if (maybePromise._isFulfilled()) {
	            accum = maybePromise._value();
	            this._gotAccum = true;
	        } else {
	            maybePromise._unsetRejectionIsUnhandled();
	            this._reject(maybePromise._reason());
	            rejected = true;
	        }
	    }
	    if (!(isPromise || this._zerothIsAccum)) this._gotAccum = true;
	    this._callback = fn;
	    this._accum = accum;
	    if (!rejected) this._init$(undefined, -5);
	}
	util.inherits(ReductionPromiseArray, PromiseArray);

	ReductionPromiseArray.prototype._init = function () {};

	ReductionPromiseArray.prototype._resolveEmptyArray = function () {
	    if (this._gotAccum || this._zerothIsAccum) {
	        this._resolve(this._preservedValues !== null
	                        ? [] : this._accum);
	    }
	};

	ReductionPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    var values = this._values;
	    values[index] = value;
	    var length = this.length();
	    var preservedValues = this._preservedValues;
	    var isEach = preservedValues !== null;
	    var gotAccum = this._gotAccum;
	    var valuesPhase = this._valuesPhase;
	    var valuesPhaseIndex;
	    if (!valuesPhase) {
	        valuesPhase = this._valuesPhase = Array(length);
	        for (valuesPhaseIndex=0; valuesPhaseIndex<length; ++valuesPhaseIndex) {
	            valuesPhase[valuesPhaseIndex] = 0;
	        }
	    }
	    valuesPhaseIndex = valuesPhase[index];

	    if (index === 0 && this._zerothIsAccum) {
	        if (!gotAccum) {
	            this._accum = value;
	            this._gotAccum = gotAccum = true;
	        }
	        valuesPhase[index] = ((valuesPhaseIndex === 0)
	            ? 1 : 2);
	    } else if (index === -1) {
	        if (!gotAccum) {
	            this._accum = value;
	            this._gotAccum = gotAccum = true;
	        }
	    } else {
	        if (valuesPhaseIndex === 0) {
	            valuesPhase[index] = 1;
	        }
	        else {
	            valuesPhase[index] = 2;
	            if (gotAccum) {
	                this._accum = value;
	            }
	        }
	    }
	    if (!gotAccum) return;

	    var callback = this._callback;
	    var receiver = this._promise._boundTo;
	    var ret;

	    for (var i = this._reducingIndex; i < length; ++i) {
	        valuesPhaseIndex = valuesPhase[i];
	        if (valuesPhaseIndex === 2) {
	            this._reducingIndex = i + 1;
	            continue;
	        }
	        if (valuesPhaseIndex !== 1) return;
	        value = values[i];
	        if (value instanceof Promise) {
	            value = value._target();
	            if (value._isFulfilled()) {
	                value = value._value();
	            } else if (value._isPending()) {
	                return;
	            } else {
	                value._unsetRejectionIsUnhandled();
	                return this._reject(value._reason());
	            }
	        }

	        if (isEach) {
	            preservedValues.push(value);
	            ret = tryCatch3(callback, receiver, value, i, length);
	        }
	        else {
	            ret = tryCatch4(callback, receiver, this._accum, value, i, length);
	        }

	        if (ret === errorObj) return this._reject(ret.e);

	        var maybePromise = tryConvertToPromise(ret, this._promise);
	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            if (maybePromise._isPending()) {
	                valuesPhase[i] = 4;
	                return maybePromise._proxyPromiseArray(this, i);
	            } else if (maybePromise._isFulfilled()) {
	                ret = maybePromise._value();
	            } else {
	                maybePromise._unsetRejectionIsUnhandled();
	                return this._reject(maybePromise._reason());
	            }
	        }

	        this._reducingIndex = i + 1;
	        this._accum = ret;
	    }

	    if (this._reducingIndex < length) return;
	    this._resolve(isEach ? preservedValues : this._accum);
	};

	function reduce(promises, fn, initialValue, _each) {
	    if (typeof fn !== "function") return apiRejection("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a");
	    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
	    return array.promise();
	}

	Promise.prototype.reduce = function (fn, initialValue) {
	    return reduce(this, fn, initialValue, null);
	};

	Promise.reduce = function (promises, fn, initialValue, _each) {
	    return reduce(promises, fn, initialValue, _each);
	};
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	    function(Promise, PromiseArray) {
	var PromiseInspection = Promise.PromiseInspection;
	var util = __webpack_require__(15);

	function SettledPromiseArray(values) {
	    this.constructor$(values);
	    this._promise._setIsSpreadable();
	}
	util.inherits(SettledPromiseArray, PromiseArray);

	SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
	    this._values[index] = inspection;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	    }
	};

	SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    var ret = new PromiseInspection();
	    ret._bitField = 268435456;
	    ret._settledValue = value;
	    this._promiseResolved(index, ret);
	};
	SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
	    var ret = new PromiseInspection();
	    ret._bitField = 134217728;
	    ret._settledValue = reason;
	    this._promiseResolved(index, ret);
	};

	Promise.settle = function (promises) {
	    return new SettledPromiseArray(promises).promise();
	};

	Promise.prototype.settle = function () {
	    return new SettledPromiseArray(this).promise();
	};
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cr = Object.create;
	if (cr) {
	    var callerCache = cr(null);
	    var getterCache = cr(null);
	    callerCache[" size"] = getterCache[" size"] = 0;
	}

	module.exports = function(Promise) {
	var util = __webpack_require__(15);
	var canEvaluate = util.canEvaluate;
	var isIdentifier = util.isIdentifier;

	function makeMethodCaller (methodName) {
	    return new Function("obj", "                                             \n\
	        'use strict'                                                         \n\
	        var len = this.length;                                               \n\
	        switch(len) {                                                        \n\
	            case 1: return obj.methodName(this[0]);                          \n\
	            case 2: return obj.methodName(this[0], this[1]);                 \n\
	            case 3: return obj.methodName(this[0], this[1], this[2]);        \n\
	            case 0: return obj.methodName();                                 \n\
	            default: return obj.methodName.apply(obj, this);                 \n\
	        }                                                                    \n\
	        ".replace(/methodName/g, methodName));
	}

	function makeGetter (propertyName) {
	    return new Function("obj", "                                             \n\
	        'use strict';                                                        \n\
	        return obj.propertyName;                                             \n\
	        ".replace("propertyName", propertyName));
	}

	function getCompiled(name, compiler, cache) {
	    var ret = cache[name];
	    if (typeof ret !== "function") {
	        if (!isIdentifier(name)) {
	            return null;
	        }
	        ret = compiler(name);
	        cache[name] = ret;
	        cache[" size"]++;
	        if (cache[" size"] > 512) {
	            var keys = Object.keys(cache);
	            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
	            cache[" size"] = keys.length - 256;
	        }
	    }
	    return ret;
	}

	function getMethodCaller(name) {
	    return getCompiled(name, makeMethodCaller, callerCache);
	}

	function getGetter(name) {
	    return getCompiled(name, makeGetter, getterCache);
	}

	function caller(obj) {
	    return obj[this.pop()].apply(obj, this);
	}
	Promise.prototype.call = function (methodName) {
	    var $_len = arguments.length;var args = new Array($_len - 1); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}
	    if (canEvaluate) {
	        var maybeCaller = getMethodCaller(methodName);
	        if (maybeCaller !== null) {
	            return this._then(
	                maybeCaller, undefined, undefined, args, undefined);
	        }
	    }
	    args.push(methodName);
	    return this._then(caller, undefined, undefined, args, undefined);
	};

	function namedGetter(obj) {
	    return obj[this];
	}
	function indexedGetter(obj) {
	    var index = +this;
	    if (index < 0) index = Math.max(0, index + obj.length);
	    return obj[index];
	}
	Promise.prototype.get = function (propertyName) {
	    var isIndex = (typeof propertyName === "number");
	    var getter;
	    if (!isIndex) {
	        if (canEvaluate) {
	            var maybeGetter = getGetter(propertyName);
	            getter = maybeGetter !== null ? maybeGetter : namedGetter;
	        } else {
	            getter = namedGetter;
	        }
	    } else {
	        getter = indexedGetter;
	    }
	    return this._then(getter, undefined, undefined, propertyName, undefined);
	};
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	function(Promise, PromiseArray, apiRejection) {
	var util = __webpack_require__(15);
	var RangeError = __webpack_require__(17).RangeError;
	var AggregateError = __webpack_require__(17).AggregateError;
	var isArray = util.isArray;


	function SomePromiseArray(values) {
	    this.constructor$(values);
	    this._howMany = 0;
	    this._unwrap = false;
	    this._initialized = false;
	}
	util.inherits(SomePromiseArray, PromiseArray);

	SomePromiseArray.prototype._init = function () {
	    if (!this._initialized) {
	        return;
	    }
	    this._promise._setIsSpreadable();
	    if (this._howMany === 0) {
	        this._resolve([]);
	        return;
	    }
	    this._init$(undefined, -5);
	    var isArrayResolved = isArray(this._values);
	    if (!this._isResolved() &&
	        isArrayResolved &&
	        this._howMany > this._canPossiblyFulfill()) {
	        this._reject(this._getRangeError(this.length()));
	    }
	};

	SomePromiseArray.prototype.init = function () {
	    this._initialized = true;
	    this._init();
	};

	SomePromiseArray.prototype.setUnwrap = function () {
	    this._unwrap = true;
	};

	SomePromiseArray.prototype.howMany = function () {
	    return this._howMany;
	};

	SomePromiseArray.prototype.setHowMany = function (count) {
	    if (this._isResolved()) return;
	    this._howMany = count;
	};

	SomePromiseArray.prototype._promiseFulfilled = function (value) {
	    this._addFulfilled(value);
	    if (this._fulfilled() === this.howMany()) {
	        this._values.length = this.howMany();
	        if (this.howMany() === 1 && this._unwrap) {
	            this._resolve(this._values[0]);
	        } else {
	            this._resolve(this._values);
	        }
	    }

	};
	SomePromiseArray.prototype._promiseRejected = function (reason) {
	    this._addRejected(reason);
	    if (this.howMany() > this._canPossiblyFulfill()) {
	        var e = new AggregateError();
	        for (var i = this.length(); i < this._values.length; ++i) {
	            e.push(this._values[i]);
	        }
	        this._reject(e);
	    }
	};

	SomePromiseArray.prototype._fulfilled = function () {
	    return this._totalResolved;
	};

	SomePromiseArray.prototype._rejected = function () {
	    return this._values.length - this.length();
	};

	SomePromiseArray.prototype._addRejected = function (reason) {
	    this._values.push(reason);
	};

	SomePromiseArray.prototype._addFulfilled = function (value) {
	    this._values[this._totalResolved++] = value;
	};

	SomePromiseArray.prototype._canPossiblyFulfill = function () {
	    return this.length() - this._rejected();
	};

	SomePromiseArray.prototype._getRangeError = function (count) {
	    var message = "Input array must contain at least " +
	            this._howMany + " items but contains only " + count + " items";
	    return new RangeError(message);
	};

	SomePromiseArray.prototype._resolveEmptyArray = function () {
	    this._reject(this._getRangeError(0));
	};

	function some(promises, howMany) {
	    if ((howMany | 0) !== howMany || howMany < 0) {
	        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/1wAmHx\u000a");
	    }
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    if (promise.isRejected()) {
	        return promise;
	    }
	    ret.setHowMany(howMany);
	    ret.init();
	    return promise;
	}

	Promise.some = function (promises, howMany) {
	    return some(promises, howMany);
	};

	Promise.prototype.some = function (howMany) {
	    return some(this, howMany);
	};

	Promise._SomePromiseArray = SomePromiseArray;
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, PromiseArray) {
	var util = __webpack_require__(15);
	var async = __webpack_require__(16);
	var errors = __webpack_require__(17);
	var tryCatch1 = util.tryCatch1;
	var errorObj = util.errorObj;

	Promise.prototype.progressed = function (handler) {
	    return this._then(undefined, undefined, handler, undefined, undefined);
	};

	Promise.prototype._progress = function (progressValue) {
	    if (this._isFollowingOrFulfilledOrRejected()) return;
	    this._target()._progressUnchecked(progressValue);

	};

	Promise.prototype._progressHandlerAt = function (index) {
	    return index === 0
	        ? this._progressHandler0
	        : this[(index << 2) + index - 5 + 2];
	};

	Promise.prototype._doProgressWith = function (progression) {
	    var progressValue = progression.value;
	    var handler = progression.handler;
	    var promise = progression.promise;
	    var receiver = progression.receiver;

	    var ret = tryCatch1(handler, receiver, progressValue);
	    if (ret === errorObj) {
	        if (ret.e != null &&
	            ret.e.name !== "StopProgressPropagation") {
	            var trace = errors.canAttachTrace(ret.e)
	                ? ret.e : new Error(util.toString(ret.e));
	            promise._attachExtraTrace(trace);
	            promise._progress(ret.e);
	        }
	    } else if (ret instanceof Promise) {
	        ret._then(promise._progress, null, null, promise, undefined);
	    } else {
	        promise._progress(ret);
	    }
	};


	Promise.prototype._progressUnchecked = function (progressValue) {
	    var len = this._length();
	    var progress = this._progress;
	    for (var i = 0; i < len; i++) {
	        var handler = this._progressHandlerAt(i);
	        var promise = this._promiseAt(i);
	        if (!(promise instanceof Promise)) {
	            var receiver = this._receiverAt(i);
	            if (typeof handler === "function") {
	                handler.call(receiver, progressValue, promise);
	            } else if (receiver instanceof PromiseArray &&
	                       !receiver._isResolved()) {
	                receiver._promiseProgressed(progressValue, promise);
	            }
	            continue;
	        }

	        if (typeof handler === "function") {
	            async.invoke(this._doProgressWith, this, {
	                handler: handler,
	                promise: promise,
	                receiver: this._receiverAt(i),
	                value: progressValue
	            });
	        } else {
	            async.invoke(progress, promise, progressValue);
	        }
	    }
	};
	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise) {
	var SomePromiseArray = Promise._SomePromiseArray;
	function any(promises) {
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    if (promise.isRejected()) {
	        return promise;
	    }
	    ret.setHowMany(1);
	    ret.setUnwrap();
	    ret.init();
	    return promise;
	}

	Promise.any = function (promises) {
	    return any(promises);
	};

	Promise.prototype.any = function () {
	    return any(this);
	};

	};


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var PromiseReduce = Promise.reduce;

	Promise.prototype.each = function (fn) {
	    return PromiseReduce(this, fn, null, INTERNAL);
	};

	Promise.each = function (promises, fn) {
	    return PromiseReduce(promises, fn, null, INTERNAL);
	};
	};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL, tryConvertToPromise) {
	var errors = __webpack_require__(17);
	var TimeoutError = Promise.TimeoutError;

	var afterTimeout = function (promise, message) {
	    if (!promise.isPending()) return;
	    if (typeof message !== "string") {
	        message = "operation timed out";
	    }
	    var err = new TimeoutError(message);
	    errors.markAsOriginatingFromRejection(err);
	    promise._attachExtraTrace(err);
	    promise._cancel(err);
	};

	var afterDelay = function (value, promise) {
	    promise._fulfill(value);
	};

	var delay = Promise.delay = function (value, ms) {
	    if (ms === undefined) {
	        ms = value;
	        value = undefined;
	    }
	    ms = +ms;
	    var maybePromise = tryConvertToPromise(value, undefined);
	    var promise = new Promise(INTERNAL);

	    if (maybePromise instanceof Promise) {
	        promise._propagateFrom(maybePromise, 7);
	        promise._follow(maybePromise._target());
	        return promise.then(function(value) {
	            return Promise.delay(value, ms);
	        });
	    } else {
	        promise._setTrace(undefined);
	        setTimeout(function delayTimeout() {
	            afterDelay(value, promise);
	        }, ms);
	    }
	    return promise;
	};

	Promise.prototype.delay = function (ms) {
	    return delay(this, ms);
	};

	function successClear(value) {
	    var handle = this;
	    if (handle instanceof Number) handle = +handle;
	    clearTimeout(handle);
	    return value;
	}

	function failureClear(reason) {
	    var handle = this;
	    if (handle instanceof Number) handle = +handle;
	    clearTimeout(handle);
	    throw reason;
	}

	Promise.prototype.timeout = function (ms, message) {
	    var target = this._target();
	    ms = +ms;
	    var ret = new Promise(INTERNAL).cancellable();
	    ret._propagateFrom(this, 7);
	    ret._follow(target);
	    var handle = setTimeout(function timeoutTimeout() {
	        afterTimeout(ret, message);
	    }, ms);
	    return ret._then(successClear, failureClear, undefined, handle, undefined);
	};

	};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var PromiseMap = Promise.map;

	Promise.prototype.filter = function (fn, options) {
	    return PromiseMap(this, fn, options, INTERNAL);
	};

	Promise.filter = function (promises, fn, options) {
	    return PromiseMap(promises, fn, options, INTERNAL);
	};
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};

	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canMutationObserver = typeof window !== 'undefined'
	    && window.MutationObserver;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;

	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }

	    var queue = [];

	    if (canMutationObserver) {
	        var hiddenDiv = document.createElement("div");
	        var observer = new MutationObserver(function () {
	            var queueList = queue.slice();
	            queue.length = 0;
	            queueList.forEach(function (fn) {
	                fn();
	            });
	        });

	        observer.observe(hiddenDiv, { attributes: true });

	        return function nextTick(fn) {
	            if (!queue.length) {
	                hiddenDiv.setAttribute('yes', 'no');
	            }
	            queue.push(fn);
	        };
	    }

	    if (canPost) {
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);

	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }

	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var isES5 = (function(){
	    "use strict";
	    return this === undefined;
	})();

	if (isES5) {
	    module.exports = {
	        freeze: Object.freeze,
	        defineProperty: Object.defineProperty,
	        keys: Object.keys,
	        getPrototypeOf: Object.getPrototypeOf,
	        isArray: Array.isArray,
	        isES5: isES5,
	        propertyIsWritable: function(obj, prop) {
	            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
	            return !!(!descriptor || descriptor.writable || descriptor.set);
	        }
	    };
	} else {
	    var has = {}.hasOwnProperty;
	    var str = {}.toString;
	    var proto = {}.constructor.prototype;

	    var ObjectKeys = function (o) {
	        var ret = [];
	        for (var key in o) {
	            if (has.call(o, key)) {
	                ret.push(key);
	            }
	        }
	        return ret;
	    };

	    var ObjectDefineProperty = function (o, key, desc) {
	        o[key] = desc.value;
	        return o;
	    };

	    var ObjectFreeze = function (obj) {
	        return obj;
	    };

	    var ObjectGetPrototypeOf = function (obj) {
	        try {
	            return Object(obj).constructor.prototype;
	        }
	        catch (e) {
	            return proto;
	        }
	    };

	    var ArrayIsArray = function (obj) {
	        try {
	            return str.call(obj) === "[object Array]";
	        }
	        catch(e) {
	            return false;
	        }
	    };

	    module.exports = {
	        isArray: ArrayIsArray,
	        keys: ObjectKeys,
	        defineProperty: ObjectDefineProperty,
	        freeze: ObjectFreeze,
	        getPrototypeOf: ObjectGetPrototypeOf,
	        isES5: isES5,
	        propertyIsWritable: function() {
	            return true;
	        }
	    };
	}


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	var schedule;
	if (typeof process === "object" && typeof process.version === "string") {
	    schedule = parseInt(process.version.split(".")[1], 10) > 10
	        ? setImmediate : process.nextTick;
	}
	else if (typeof MutationObserver !== "undefined") {
	    schedule = function(fn) {
	        var div = document.createElement("div");
	        var observer = new MutationObserver(fn);
	        observer.observe(div, {attributes: true});
	        return function() { div.classList.toggle("foo"); };
	    };
	    schedule.isStatic = true;
	}
	else if (typeof setTimeout !== "undefined") {
	    schedule = function (fn) {
	        setTimeout(fn, 0);
	    };
	}
	else {
	    schedule = function() {
	        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/m3OTXk\u000a");
	    };
	}
	module.exports = schedule;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function arrayMove(src, srcIndex, dst, dstIndex, len) {
	    for (var j = 0; j < len; ++j) {
	        dst[j + dstIndex] = src[j + srcIndex];
	        src[j + srcIndex] = void 0;
	    }
	}

	function Queue(capacity) {
	    this._capacity = capacity;
	    this._length = 0;
	    this._front = 0;
	}

	Queue.prototype._willBeOverCapacity = function (size) {
	    return this._capacity < size;
	};

	Queue.prototype._pushOne = function (arg) {
	    var length = this.length();
	    this._checkCapacity(length + 1);
	    var i = (this._front + length) & (this._capacity - 1);
	    this[i] = arg;
	    this._length = length + 1;
	};

	Queue.prototype._unshiftOne = function(value) {
	    var capacity = this._capacity;
	    this._checkCapacity(this.length() + 1);
	    var front = this._front;
	    var i = (((( front - 1 ) &
	                    ( capacity - 1) ) ^ capacity ) - capacity );
	    this[i] = value;
	    this._front = i;
	    this._length = this.length() + 1;
	};

	Queue.prototype.unshift = function(fn, receiver, arg) {
	    this._unshiftOne(arg);
	    this._unshiftOne(receiver);
	    this._unshiftOne(fn);
	};

	Queue.prototype.push = function (fn, receiver, arg) {
	    var length = this.length() + 3;
	    if (this._willBeOverCapacity(length)) {
	        this._pushOne(fn);
	        this._pushOne(receiver);
	        this._pushOne(arg);
	        return;
	    }
	    var j = this._front + length - 3;
	    this._checkCapacity(length);
	    var wrapMask = this._capacity - 1;
	    this[(j + 0) & wrapMask] = fn;
	    this[(j + 1) & wrapMask] = receiver;
	    this[(j + 2) & wrapMask] = arg;
	    this._length = length;
	};

	Queue.prototype.shift = function () {
	    var front = this._front,
	        ret = this[front];

	    this[front] = undefined;
	    this._front = (front + 1) & (this._capacity - 1);
	    this._length--;
	    return ret;
	};

	Queue.prototype.length = function () {
	    return this._length;
	};

	Queue.prototype._checkCapacity = function (size) {
	    if (this._capacity < size) {
	        this._resizeTo(this._capacity << 1);
	    }
	};

	Queue.prototype._resizeTo = function (capacity) {
	    var oldCapacity = this._capacity;
	    this._capacity = capacity;
	    var front = this._front;
	    var length = this._length;
	    if (front + length > oldCapacity) {
	        var moveItemsCount = (front + length) & (oldCapacity - 1);
	        arrayMove(this, 0, this, oldCapacity, moveItemsCount);
	    }
	};

	module.exports = Queue;


/***/ }
/******/ ])
});
