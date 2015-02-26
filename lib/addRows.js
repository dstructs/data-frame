/**
*
*	DATAFRAME: addRows
*
*
*	DESCRIPTION:
*		- Add rows to a data frame.
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

var isSize = require( 'validate.io-size' ),
	isUnique = require( 'validate.io-unique' ),
	hasMax = require( 'validate.io-array-max' ),
	isStringArray = require( 'validate.io-string-array' ),
	isNonNegativeIntegerArray = require( 'validate.io-nonnegative-integer-array' );


// ADD ROWS //

/**
* FUNCTION: addRows( arr[, options] )
*	Add rows to a data frame.
*
* @param {Array[]} arr - an array of rows to add
* @param {Object} [options] - method options
* @param {String[]} [options.names] - row names; if not provided, names are assigned according to row number
* @param {Number[]} [options.idx] - row indices at which to insert the rows
* @returns {DataFrame} DataFrame instance
*/
function addRows( arr, options ) {
	/* jshint validthis:true */
	var nCols = this._nCols,
		rhash = this._rhash,
		opts = {},
		hash,
		names,
		name,
		idx,
		len,
		flg,
		N, d, n, i, j, k;

	if ( !isSize( arr, [ null, nCols ] ) ) {
		throw new Error( 'addRows()::invalid input argument. First argument must be an array of arrays where all first-level array lengths must equal the number of columns.' );
	}
	len = arr.length;

	// TODO: data type validation!!!

	if ( arguments.length > 1 ) {
		opts = options;
	}
	// Validate row names...
	if ( opts.hasOwnProperty( 'names' ) ) {
		names = opts.names;
		if ( !isStringArray( names ) ) {
			throw new TypeError( 'addRows()::invalid option. Row names must be provided as an array of strings. Option: `' + names + '`.' );
		}
		if ( names.length !== len ) {
			throw new Error( 'addRows()::invalid option. Number of row names must equal the number of added rows.' );
		}
	} else {
		names = new Array( len );
		for ( i = 0; i < len; i++ ) {
			names[ i ] = this._rid.toString();
			this._rid++;
		}
	}
	// Validate row indices...
	if ( opts.hasOwnProperty( 'idx' ) ) {
		idx = opts.idx;
		if ( !isNonNegativeIntegerArray( idx ) || !isUnique( idx ) ) {
			throw new TypeError( 'addRows()::invalid option. Row indices must be provided as a unique array of nonnegative integers.' );
		}
		if ( idx.length !== len ) {
			throw new Error( 'addRows()::invalid option. Number of row indices must equal the number of added rows.' );
		}
		N = this._nRows + len - 1;
		if ( !hasMax( idx, N ) ) {
			throw new RangeError( 'addRows()::invalid option. A row index cannot exceed the total number of rows.' );
		}
	}
	// Add the rows to the data array...
	this._nRows += len;
	if ( idx ) {
		N = this._nRows;
		d = new Array( N );
		n = new Array( N );
		hash = {};
		k = 0;
		for ( i = 0; i < N; i++ ) {
			flg = false;
			for ( j = 0; j < len; j++ ) {
				if ( idx[ j ] === i ) {
					flg = true;
					break;
				}
			}
			if ( flg ) {
				// TODO: deep copy
				d[ i ] = arr[ j ].slice();
				name = names[ j ];
			} else {
				d[ i ] = this._data[ k ];
				name = this._rownames[ k ];
				k++;
			}
			n[ i ] = name;
			if ( hash.hasOwnProperty( name ) ) {
				hash[ name ].push( i );
			} else {
				hash[ name ] = [ i ];
			}
		}
		this._data = d;
		this._rownames = n;
		this._rhash = hash;
	} else {
		for ( i = 0; i < len; i++ ) {
			name = names[ i ];

			// TODO: deep copy
			this._data.push( arr[ i ].slice() );

			this._rownames.push( name );
			N = this._rownames.length;
			if ( rhash.hasOwnProperty( name ) ) {
				rhash[ name ].push( N );
			} else {
				rhash[ name ] = [ N ];
			}
		}
	}
	return this;
} // end FUNCTION addRows()


// EXPORTS //

module.exports = addRows;
