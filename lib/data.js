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

	// TODO: do we want to return a (deep) copy or the raw source? If raw source, we allow mutation.
	return this._data;
} // end FUNCTION data()


// EXPORTS //

module.exports = data;
