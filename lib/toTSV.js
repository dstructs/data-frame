/**
*
*	DATAFRAME: toTSV
*
*
*	DESCRIPTION:
*		- Returns a TSV representation of a data frame.
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
* FUNCTION: toTSV()
*	Returns a TSV representation of a data frame.
*
* @return {String} data frame in TSV format
*/
function toTSV() {
	/* jshint validthis:true */
	var body = '';

	// Column names:
	body += '\t' + this._colnames.join( '\t' );
	body += '\n';

	// Rows...
	for ( var i = 0; i < this._nRows; i++ ) {
		body += this._rownames[ i ];
		body += '\t';
		body += this._data[ i ].join( '\t' );
		body += '\n';
	}
	return body;
} // end FUNCTION toTSV()


// EXPORTS //

module.exports = toTSV;
