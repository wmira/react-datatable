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
    
    /** TODO: fix the hard coding..*/
        
    fastForward : function() {
        this.props.pageChangedListener( ( (this.props.pagerState.page + 2) <=0 ) ? this.props.pagerState.page.totalPage : this.props.pagerState.page + 2 );
            
    },
    //fast backward?
    fastBackward : function() {
        //we need to fix this
        this.props.pageChangedListener( ( (this.props.pagerState.page - 2) <=0 ) ? 1 : this.props.pagerState.page - 2 );

    },
    /**
     * If rendered is called it means we have a paginator
     *
     * @returns {XML}
     */
    render: function() {
        //ps.page is the page we want to show

        var ps = this.props.pagerState;
        var visiblePager = 3;
        var startPage = 1;
        var offset = 1;
        
        if ( ps.page > startPage ) {
            if ( ( ps.page - offset ) > offset  ) {
                startPage = ps.page  - offset;
            }
            if ( ps.page === ps.totalPage ) {
                startPage = ps.page - ( visiblePager - 1) ;
            }
        }

        var maxPage =  (( startPage + (visiblePager ) ) <= ps.totalPage ) ?  startPage + visiblePager : ps.totalPage + 1;

        var lastFFClass = "";
        var startFFClass = "";


        var generatePager = function() {
            
            var pagerComponents = [];

            pagerComponents.push(
                /*jshint ignore:start */
                (<li className={startFFClass} onClick={this.fastBackward}>
                    <span>
                        <span >&laquo;</span>
                    </span>
                </li>)
                /*jshint ignore:end */
            );
            
            for ( var i=startPage; i <  maxPage ; i++ ) {
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
                (<li className={lastFFClass} onClick={this.fastForward}>
                    <span>
                        <span >&raquo;</span>
                    </span>
                </li>)
                /*jshint ignore:end */
            );
            return pagerComponents;
            
        }.bind(this);
        
        
        
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