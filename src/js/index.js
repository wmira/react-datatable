"use strict";


var RDT = require("react-render-wrapper")(require("react"),require("./rdt"));
RDT.datasource = require("./ds");


module.exports = RDT;