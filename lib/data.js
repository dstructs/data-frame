/**
*
*	DATAFRAME: data
*
*
*	DESCRIPTION:
*		- Returns data frame data.
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
* FUNCTION: data()
*	Returns the data frame data.
*
* @returns {Array} data - data frame data
*/
function data() {
	/* jshint validthis:true */
	var arr = this._data,
		nRows = this._nRows,
		nCols = this._nCols,
		rs = this._rStride,
		cs = this._cStride,
		tmp,
		d,
		i, j;

	// Return an array of arrays...
	d = new Array( nRows );
	for ( i = 0; i < nRows; i++ ) {
		tmp = new Array( nCols );
		for ( j = 0; j < nCols; j++ ) {
			// TODO: deep copy
			tmp[ j ] = arr[ i*rs + j*cs ];
		}
		d[ i ] = tmp;
	}
	return d;
} // end FUNCTION data()


// EXPORTS //

module.exports = data;
