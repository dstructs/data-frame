/**
*
*	DATAFRAME: addCols
*
*
*	DESCRIPTION:
*		- Add columns to a data frame.
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


// ADD COLUMNS //

/**
* FUNCTION: addCols( arr[, options] )
*	Add columns to a data frame.
*
* @param {Array[]} arr - an array of columns to add
* @param {Object} [options] - method options
* @param {String[]} [options.names] - column names; if not provided, names are assigned according to column number
* @param {Number[]} [options.idx] - column indices at which to insert the column
* @returns {DataFrame} DataFrame instance
*/
function addCols( arr, options ) {
	/* jshint validthis:true */
	var data = this._data,
		nRows = this._nRows,
		nCols = this._nCols,
		chash = this._chash,
		rs = this._rStride,
		cs = this._cStride,
		opts = {},
		hash,
		names,
		name,
		idx,
		col,
		len,
		flg,
		N, d, n, i, j, k;

	if ( !isSize( arr, [ null, nRows ] ) ) {
		throw new Error( 'addCols()::invalid input argument. First argument must be an array of arrays where all first-level array lengths must equal the number of rows.' );
	}
	len = arr.length;

	// TODO: data type validation!!!

	if ( arguments.length > 1 ) {
		opts = options;
	}
	// Validate column names...
	if ( opts.hasOwnProperty( 'names' ) ) {
		names = opts.names;
		if ( !isStringArray( names ) ) {
			throw new TypeError( 'addCols()::invalid option. Column names must be provided as an array of strings. Option: `' + names + '`.' );
		}
		if ( names.length !== len ) {
			throw new Error( 'addCols()::invalid option. Number of column names must equal the number of added columns.' );
		}
	} else {
		names = new Array( len );
		for ( i = 0; i < len; i++ ) {
			names[ i ] = this._cid.toString();
			this._cid++;
		}
	}
	// Validate column indices...
	if ( opts.hasOwnProperty( 'idx' ) ) {
		idx = opts.idx;
		if ( !isNonNegativeIntegerArray( idx ) || !isUnique( idx ) ) {
			throw new TypeError( 'addCols()::invalid option. Column indices must be provided as a unique array of nonnegative integers.' );
		}
		if ( idx.length !== len ) {
			throw new Error( 'addCols()::invalid option. Number of column indices must equal the number of added columns.' );
		}
		N = nCols + len - 1;
		if ( !hasMax( idx, N ) ) {
			throw new RangeError( 'addCols()::invalid option. A column index cannot exceed the total number of columns.' );
		}
	}
	this._nCols += len;
	if ( idx ) {
		N = this._nCols;

		// Build a new data array...
		d = new Array( nRows*N );
		k = 0;
		for ( j = 0; j < N; j++ ) {
			flg = false;
			for ( i = 0; i < len; i++ ) {
				if ( idx[ i ] === j ) {
					flg = true;
					break;
				}
			}
			if ( flg ) {
				col = arr[ i ];
				for ( i = 0; i < nRows; i++ ) {
					// TODO: deep copy
					d[ i*N + j*cs ] = col[ i ];
				}
			} else {
				for ( i = 0; i < nRows; i++ ) {
					d[ i*N + j*cs ] = data[ i*rs + k*cs ];
				}
				k++;
			}
		}
		// Build a new column names array and an associated hash...
		n = new Array( N );
		hash = {};
		k = 0;
		for ( j = 0; j < N; j++ ) {
			flg = false;
			for ( i = 0; i < len; i++ ) {
				if ( idx[ i ] === j ) {
					flg = true;
					break;
				}
			}
			if ( flg ) {
				name = names[ i ];
			} else {
				name = this._colnames[ k ];
				k++;
			}
			n[ j ] = name;
			if ( hash.hasOwnProperty( name ) ) {
				hash[ name ].push( j );
			} else {
				hash[ name ]= [ j ];
			}
		}
		this._colnames = n;
		this._chash = hash;
	} else {
		N = this._nCols;
		d = new Array( nRows*N );

		// Build a new data array...
		k = 0;
		for ( j = 0; j < N; j++ ) {
			if ( j < nCols ) {
				for ( i = 0; i < nRows; i++ ) {
					d[ i*N + j*cs ] = data[ i*rs + j*cs ];
				}
			} else {
				col = arr[ k ];
				for ( i = 0; i < nRows; i++ ) {
					// TODO: deep copy
					d[ i*N + j*cs ] = col[ i ];
				}
				k++;
			}
		}
		// Append the new column names to the existing column name array and update the column name hash...
		for ( i = 0; i < len; i++ ) {
			name = names[ i ];
			this._colnames.push( name );
			if ( chash.hasOwnProperty( name ) ) {
				chash[ name ].push( nCols+i );
			} else {
				chash[ name ] = [ nCols+i ];
			}
		}
	}
	this._data = d;
	this._rStride = this._nCols;
	return this;
} // end FUNCTION addCols()


// EXPORTS //

module.exports = addCols;
