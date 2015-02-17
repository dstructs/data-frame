/**
*
*	DATAFRAME: delRows
*
*
*	DESCRIPTION:
*		- Deletes rows from a data frame.
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
* FUNCTION: delRows( keys )
*	Deletes rows from a data frame.
*
* @param {Array} keys - row keys (indices or names)
* @returns {DataFrame} DataFrame instance
*/
function delRows( keys ) {
	/* jshint validthis:true */
	var names = this._rownames,
		nRows = this._nRows,
		type,
		len,
		key,
		idx,
		i, j;

	if ( !Array.isArray( keys ) ) {
		throw new TypeError( 'delRows()::invalid input argument. Must provide an array. Value: `' + keys + '`.' );
	}
	len = keys.length;

	// Validate that keys are either strings or positive integers and, if numeric, within bounds...
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		type = typeof key;
		if ( type !== 'string' ) {
			if ( type !== 'number' || key !== key || key%1 !== 0 || key < 0 ) {
				throw new TypeError( 'delRows()::invalid input argument. Row key must be either a string or a positive integer. Key: `' + key + '`.' );
			}
			if ( key > nRows-1 ) {
				throw new Error( 'delRows()::invalid input argument. Key exceeds maximum row index. Key: `' + key + '`.' );
			}
		}
	}
	// Validate that all keys are known...
	idx = new Array( len );
	for ( i = 0; i < len; i++ ) {
		idx[ i ] = -1;
		key = keys[ i ];
		if ( typeof key === 'number' ) {
			idx[ i ] = key;
		} else {
			// Search for the key's index in the row names...
			for ( j = 0; j < nRows; j++ ) {
				// NOTE: loose type checking; allows '0' to equal 0...
				/* jshint eqeqeq:false */
				if ( names[ j ] == key ) {
					idx[ i ] = j;
					break;
				}
				/* jshint eqeqeq:true */
			}
		}
		if ( idx[ i ] === -1 ) {
			throw new Error( 'delRows()::invalid input argument. Unknown key. Key: `' + key + '`.' );
		}
	}
	// NOTE: addresses the possible existence of duplicated keys such that they have no effect...
	for ( i = 0; i < len; i++ ) {
		this._data[ idx[ i ] ] = null;
	}
	i = 0;
	while ( i < nRows ) {
		if ( this._data[ i ] === null ) {
			this._data.splice( i, 1 );
			this._rownames.splice( i, 1 );
			nRows -= 1;
		} else {
			i++;
		}
	}
	this._nRows = nRows;
	return this;
} // end FUNCTION delRows()


// EXPORTS //

module.exports = delRows;
