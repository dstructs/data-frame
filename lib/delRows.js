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
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' ),
	unique = require( 'compute-unique' );


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
	var data = this._data,
		names = this._rownames,
		rhash = this._rhash,
		nRows = this._nRows,
		nCols = this._nCols,
		rs = this._rStride,
		cs = this._cStride,
		len,
		key,
		idx,
		arr,
		d,
		N,
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
	unique( idx ); // sorted
	len = idx.length;

	// Update the row name hash...
	for ( i = 0; i < len; i++ ) {
		j = idx[ i ];
		key = names[ j ];
		arr = rhash[ key ];
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
	// Remove the names from the row name array and create a new data array which no longer includes the rows...
	N = nRows - len;
	d = new Array( N*nCols );
	k = 0;
	len = 0;
	for ( i = 0; i < nRows; i++ ) {
		if ( idx[ 0 ] === i ) {
			names.splice( i-len, 1 );
			idx.shift();
			len++;
		} else {
			for ( j = 0; j < nCols; j++ ) {
				d[ k*rs + j*cs ] = data[ i*rs + j*cs ];
			}
			k++;
		}
	}
	this._nRows = N;
	this._data = d;
	return this;
} // end FUNCTION delRows()


// EXPORTS //

module.exports = delRows;
