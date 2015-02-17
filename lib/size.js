/**
*
*	DATAFRAME: size
*
*
*	DESCRIPTION:
*		- Returns the size of a data frame.
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
* FUNCTION: size()
*	Returns the data frame size as a two-element array.
*
* @returns {Array} [nrows, ncols]
*/
function size() {
	/* jshint validthis:true */
	return [ this._nRows, this._nCols ];
} // end FUNCTION size()


// EXPORTS //

module.exports = size;
