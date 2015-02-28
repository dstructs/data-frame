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
	var tmp;

	tmp = this._rStride;
	this._rStride = this._cStride;
	this._cStride = tmp;

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
