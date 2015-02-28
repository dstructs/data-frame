/**
*
*	DATAFRAME: delCols
*
*
*	DESCRIPTION:
*		- Deletes columns from a data frame.
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


// DELETE COLUMNS //

/**
* FUNCTION: delCols( keys )
*	Deletes columns from a data frame.
*
* @param {Array} keys - column keys (indices or names)
* @returns {DataFrame} DataFrame instance
*/
function delCols( keys ) {
	/* jshint validthis:true */
	var data = this._data,
		names = this._colnames,
		chash = this._chash,
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
		throw new TypeError( 'delCols()::invalid input argument. Must provide an array. Value: `' + keys + '`.' );
	}
	len = keys.length;

	// Validate that keys are either strings or nonnegative integers, if numeric, within bounds, and if strings, known...
	idx = [];
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		if ( !isString( key ) ) {
			if ( !isNonNegativeInteger( key ) ) {
				throw new TypeError( 'delCols()::invalid input argument. Column key must be either a string or a nonnegative integer. Key: `' + key + '`.' );
			}
			if ( key > nCols-1 ) {
				throw new Error( 'delCols()::invalid input argument. Key exceeds maximum column index. Key: `' + key + '`.' );
			}
			idx.push( key );
		} else {
			if ( !chash.hasOwnProperty( key ) ) {
				throw new Error( 'delCols()::invalid input argument. Unknown key. Key: `' + key + '`.' );
			}
			arr = chash[ key ];
			for ( j = 0; j < arr.length; j++ ) {
				idx.push( arr[ j ] );
			}
		}
	}
	unique( idx ); // sorted
	len = idx.length;

	// Update the column name hash...
	for ( i = 0; i < len; i++ ) {
		j = idx[ i ];
		key = names[ j ];
		arr = chash[ key ];
		if ( arr ) {
			for ( k = 0; k < arr.length; k++ ) {
				if ( arr[ k ] === j ) {
					break;
				}
			}
			arr.splice( k, 1 );
			if ( !arr.length ) {
				delete chash[ key ];
			}
		}
	}
	// Remove the names from the column name array and create a new data array which no longer includes the columns...
	N = nCols - len;
	d = new Array( nRows*N );
	k = 0;
	len = 0;
	for ( j = 0; j < nCols; j++ ) {
		if ( idx[ 0 ] === j ) {
			names.splice( j-len, 1 );
			idx.shift();
			len++;
		} else {
			for ( i = 0; i < nRows; i++ ) {
				d[ i*rs + k*cs ] = data[ i*rs + j*cs ];
			}
			k++;
		}
	}
	this._nCols = N;
	this._data = d;
	return this;
} // end FUNCTION delCols()


// EXPORTS //

module.exports = delCols;
