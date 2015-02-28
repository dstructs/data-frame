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
	var data = this._data,
		nRows = this._nRows,
		nCols = this._nCols,
		rs = this._rStride,
		cs = this._cStride,
		n = nCols - 1,
		body = '',
		i, j;

	// Column names:
	body += ',' + this._colnames.join( ',' );
	body += '\n';

	// Rows...
	for ( i = 0; i < nRows; i++ ) {
		body += this._rownames[ i ];
		body += ',';
		for ( j = 0; j < nCols; j++ ) {
			body += data[ i*rs + j*cs ];
			if ( j < n ) {
				body += ',';
			}
		}
		body += '\n';
	}
	return body;
} // end FUNCTION toCSV()


// EXPORTS //

module.exports = toCSV;
