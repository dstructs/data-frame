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

// MODULES //

var isArray = require( 'validate.io-array' ),
	isString = require( 'validate.io-string' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// DELETE ROWS //

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
		rhash = this._rhash,
		nRows = this._nRows,
		len,
		key,
		idx,
		arr,
		i, j, k;

	if ( !isArray( keys ) ) {
		throw new TypeError( 'delRows()::invalid input argument. Must provide an array. Value: `' + keys + '`.' );
	}
	len = keys.length;

	// Validate that keys are either strings or positive integers, if numeric, within bounds, and if strings, known...
	idx = [];
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		if ( !isString( key ) ) {
			if ( !isNonNegativeInteger( key ) ) {
				throw new TypeError( 'delRows()::invalid input argument. Row key must be either a string or a positive integer. Key: `' + key + '`.' );
			}
			if ( key > nRows-1 ) {
				throw new Error( 'delRows()::invalid input argument. Key exceeds maximum row index. Key: `' + key + '`.' );
			}
			idx.push( key );
		} else {
			if ( !rhash.hasOwnProperty( key ) ) {
				throw new Error( 'delRows()::invalid input argument. Unknown key. Key: `' + key + '`.' );
			}
			arr = rhash[ key ];
			for ( j = 0; j < arr.length; j++ ) {
				idx.push( arr[ j ] );
			}
		}
	}
	// NOTE: addresses the possible existence of duplicated keys such that they have no effect, as `null` will simply be set multiple times.
	for ( i = 0; i < idx.length; i++ ) {
		j = idx[ i ];
		key = names[ j ];
		arr = rhash[ key ];

		// Mark the row for deletion:
		this._data[ j ] = null;

		// Update the row hash...
		if ( arr ) {
			for ( k = 0; k < arr.length; k++ ) {
				if ( arr[ k ] === j ) {
					break;
				}
			}
			arr.splice( k, 1 );
			if ( !arr.length ) {
				delete rhash[ key ];
			}
		}
	}
	i = 0;
	while ( i < nRows ) {
		if ( this._data[ i ] === null ) {
			this._data.splice( i, 1 );
			names.splice( i, 1 );
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
