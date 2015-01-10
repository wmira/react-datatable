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

	/** @jsx React.DOM */
	var React = __webpack_require__(1);
	var DataSource = __webpack_require__(2);
	var Pager = __webpack_require__(3);

	var RDTRow = __webpack_require__(4);
	var RDTColumn = __webpack_require__(5);
	var RDTBody = __webpack_require__(6);
	var Paginator = __webpack_require__(7);



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
	        this.ds = new DataSource(newProps.config,newProps.datasource);
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

	    getInitialState: function () {

	        this.ds = new DataSource(this.props.config,this.props.datasource);
	        this.ds.on("recordAdded",this.onDsChangeEvent);
	        this.ds.on("recordUpdated",this.onDsChangeEvent);
	        if ( this.props.config.pager ) {
	            this.pager = new Pager(1,this.props.config.pager.rowsPerPage,this.ds);
	            return { pager : this.pager.state()  }
	        }
	        return { pager : null };
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

	        var paginator = null;
	        if ( this.pager ) {
	            paginator =  React.createElement(Paginator, {datasource: this.ds, config: this.props.config, pageChangedListener: this.pagerUpdated}) ;

	        }
	        return (
	            React.createElement("div", null, 
	                React.createElement("div", {className: "rdt-container", ref: "container"}, 
	                    React.createElement("table", {className: tableStyle['table']}, 
	                        React.createElement(RDTColumn, {config: config}), 
	                        React.createElement(RDTBody, {config: config, datasource: this.ds, pager: this.state.pager})
	                    )
	                ), 
	                paginator
	            )
	        )

	    }
	});


	module.exports = RDT;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';

	var Pager = __webpack_require__(3);
	var EventEmitter = __webpack_require__(9).EventEmitter;


	/**
	 * TODO: should this be named recordset instead?
	 *
	 *
	 * @param config
	 * @param dsDef
	 * @constructor
	 */
	var DataSource = function(config,dsDef) {
	    this.records = dsDef.data;
	};


	DataSource.prototype = EventEmitter.prototype;
	DataSource.prototype.constructor = DataSource;

	DataSource.prototype.recordAtIndex = function(index) {
	    return this.records[index];
	};

	/**
	 * If key is defined then this data can be accessed using the key
	 *
	 * FIXME: cell should use this.
	 *
	 * @param key
	 */
	DataSource.prototype.getRecord = function(index,property,path,record) {
	    alert("get not implemented");
	};

	DataSource.prototype.add = function(record) {
	    this.records.push(record);
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
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);

	var RDTCell = __webpack_require__(8);

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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);

	var RDTRow = __webpack_require__(4);

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
/* 7 */
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
/* 8 */
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
/* 9 */
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