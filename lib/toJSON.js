/**
*
*	DATAFRAME: toJSON
*
*
*	DESCRIPTION:
*		- Returns a JSON representation of a data frame.
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
* FUNCTION: toJSON()
*	Returns a JSON representation of a data frame.
*
* @return {Object} JSON blob
*/
function toJSON() {
	/* jshint validthis:true */
	var blob = {};

	blob.rownames = this._rownames.slice();
	blob.colnames = this._colnames.slice();

	// TODO: deep copy. Since JSON, should we be faithful to RegExp, Date, etc objects? Thinking no. The output of this should be used, e.g., when saving to file.
	blob.data = JSON.parse( JSON.stringify( this._data ) );

	return blob;
} // end FUNCTION toJSON()


// EXPORTS //

module.exports = toJSON;
