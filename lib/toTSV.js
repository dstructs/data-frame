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
	var data = this._data,
		nRows = this._nRows,
		nCols = this._nCols,
		rs = this._rStride,
		cs = this._cStride,
		n = nCols - 1,
		body = '',
		i, j;

	// Column names:
	body += '\t' + this._colnames.join( '\t' );
	body += '\n';

	// Rows...
	for ( i = 0; i < nRows; i++ ) {
		body += this._rownames[ i ];
		body += '\t';
		for ( j = 0; j < nCols; j++ ) {
			body += data[ i*rs + j*cs ];
			if ( j < n ) {
				body += '\t';
			}
		}
		body += '\n';
	}
	return body;
} // end FUNCTION toTSV()


// EXPORTS //

module.exports = toTSV;
