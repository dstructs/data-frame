/**
*
*	DATAFRAME: toCSV
*
*
*	DESCRIPTION:
*		- Returns a CSV representation of a data frame.
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

/**
* FUNCTION: toCSV()
*	Returns a CSV representation of a data frame.
*
* @return {String} data frame in CSV format
*/
function toCSV() {
	/* jshint validthis:true */
	var body = '';

	// Column names:
	body += ',' + this._colnames.join( ',' );
	body += '\n';

	// Rows...
	for ( var i = 0; i < this._nRows; i++ ) {
		body += this._rownames[ i ];
		body += ',';
		body += this._data[ i ].join( ',' );
		body += '\n';
	}
	return body;
} // end FUNCTION toCSV()


// EXPORTS //

module.exports = toCSV;
