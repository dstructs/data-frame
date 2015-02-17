/**
*
*	COMPUTE: data-frame
*
*
*	DESCRIPTION:
*		- Two-dimensional tabular data structure.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// DATA FRAME //

var DataFrame = require( './ctor.js' );

DataFrame.prototype.size = require( './size.js' );

DataFrame.prototype.data = require( './data.js' );

DataFrame.prototype.rownames = require( './rownames.js' );

DataFrame.prototype.colnames = require( './colnames.js' );

DataFrame.prototype.addRows = require( './addRows.js' );

DataFrame.prototype.addCols = require( './addCols.js' );

DataFrame.prototype.delRows = require( './delRows.js' );

DataFrame.prototype.delCols = require( './delCols.js' );

DataFrame.prototype.transpose = require( './transpose.js' );

DataFrame.prototype.head = require( './head.js' );

DataFrame.prototype.tail = require( './tail.js' );

DataFrame.prototype.toJSON = require( './toJSON.js' );

DataFrame.prototype.toCSV = require( './toCSV.js' );

DataFrame.prototype.toTSV = require( './toTSV.js' );


// EXPORTS //

module.exports = DataFrame;
