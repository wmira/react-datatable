"use strict";

var DataSource = require("./datasource");

var RDT = require("react-render-wrapper")(require("react"),require("./rdt"));
RDT.datasource = function(data,mapper) {
    return new DataSource(data,mapper);
}


module.exports = RDT;