/**
*
*	DATAFRAME: transpose
*
*
*	DESCRIPTION:
*		- Transposes a data frame, such that rows becomes columns and columns become rows.
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
* FUNCTION: transpose()
*	Transposes a data frame, such that rows become columns and columns become rows.
*
* @returns {DataFrame} DataFrame instance
*/
function transpose() {
	/* jshint validthis:true */
	var nRows = this._nCols,
		nCols = this._nRows,
		data,
		tmp,
		row,
		i, j;

	// NOTE: this is a rather expensive operation, as we are allocating an entirely new array of arrays. Because we are using nested arrays, we are unable to use standard in-place transpose algorithms. Not sure how often transposes will be used. If infrequently, not convinced worth the effort to optimize. Could linearize the array (ala ndarray), but then have increased complexity in terms of adding and removing rows/columns, as well as other algorithms.
	data = new Array( nRows );

	for ( i = 0; i < nRows; i++ ) {
		row = new Array( nCols );
		for ( j = 0; j < nCols; j++ ) {
			row[ j ] = this._data[ j ][ i ];
		}
		data[ i ] = row;
	}
	this._data = data;

	tmp = this._rownames;
	this._rownames = this._colnames;
	this._colnames = tmp;

	tmp = this._nRows;
	this._nRows = this._nCols;
	this._nCols = tmp;

	tmp = this._rhash;
	this._rhash = this._chash;
	this._chash = tmp;

	return this;
} // end FUNCTION transpose()


// EXPORTS //

module.exports = transpose;
