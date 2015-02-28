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
	var data = this._data,
		nRows = this._nRows,
		nCols = this._nCols,
		rhash = this._rhash,
		rs = this._rStride,
		cs = this._cStride,
		opts = {},
		hash,
		names,
		name,
		row,
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
		N = nRows + len - 1;
		if ( !hasMax( idx, N ) ) {
			throw new RangeError( 'addRows()::invalid option. A row index cannot exceed the total number of rows.' );
		}
	}
	this._nRows += len;
	if ( idx ) {
		N = this._nRows;

		// Build a new data array...
		d = new Array( N*nCols );
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
				row = arr[ j ];
				for ( j = 0; j < nCols; j++ ) {
					// TODO: deep copy
					d[ i*rs + j*cs ] = row[ j ];
				}
			} else {
				for ( j = 0; j < nCols; j++ ) {
					d[ i*rs + j*cs ] = data[ k*rs + j*cs ];
				}
				k++;
			}
		}
		// Build a new row names array and an associated hash...
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
				name = names[ j ];
			} else {
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
		// Append the row data to the existing data array...
		for ( i = 0; i < len; i++ ) {
			row = arr[ i ];
			for ( j = 0; j < nCols; j++ ) {
				// TODO: deep copy
				data.push( row[ j ] );
			}
		}
		// Append the new row names to the existing row name array and update the row name hash...
		for ( i = 0; i < len; i++ ) {
			name = names[ i ];
			this._rownames.push( name );
			if ( rhash.hasOwnProperty( name ) ) {
				rhash[ name ].push( nRows+i );
			} else {
				rhash[ name ] = [ nRows+i ];
			}
		}
	}
	return this;
} // end FUNCTION addRows()


// EXPORTS //

module.exports = addRows;
