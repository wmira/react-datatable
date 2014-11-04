
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
    this.endIdx = this.startIdx + this.rowsPerPage;
};


/**
 * Moves this pager forward and returns another pager
 *
 *
 * @param page
 * @returns Pager
 */
Pager.prototype.next = function() {
    console.log("NEXT : " + this.page);
    return this.move(1);
};

Pager.prototype.previous = function() {
    return this.move(-1);
};
Pager.prototype.toPage = function(page) {
    return this.move(page - this.page);
};

Pager.prototype.move = function(movement) {
    var maxPage = parseInt(this.datasource.records.length / this.rowsPerPage);

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