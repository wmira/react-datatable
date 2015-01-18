/** @jsx React.DOM */
/*globals require,module */
/* jshint -W097, esnext: true */
"use strict";

var React = require('react');


/**
 * React Component for Columns
 *
 */
var Paginator = React.createClass({


    
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
                (<li className={startFFClass}>
                    <span>
                        <span >&laquo;</span>
                    </span>
                </li>)
                /*jshint ignore:end */
            );
            
            for ( var i=startPage; i < (startPage+visiblePager); i++ ) {
                var cls = "";
                if ( i === ps.page ) {
                    cls="active";
                }
                pagerComponents.push(
                    /*jshint ignore:start */
                    (<li className={cls}><a data-page={i}  >{i}</a></li>)
                    /*jshint ignore:end */
                );
            }
            
            pagerComponents.push(
                /*jshint ignore:start */
                (<li className={lastFFClass}>
                    <span>
                        <span >&raquo;</span>
                    </span>
                </li>)
                /*jshint ignore:end */
            );
            return pagerComponents;
            
        };
        
        
        
        /*jshint ignore:start */
        return(
            <div onClick={this.pagerClickListener} className="rdt-paginator">
                <ul className="pagination pagination-sm rdt-paginator-pager">
                    {
                        generatePager()
                    }
                </ul>
            </div>
        )
  
        /*jshint ignore:end */
    }
});


module.exports = Paginator;