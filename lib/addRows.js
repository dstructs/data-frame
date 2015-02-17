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

/**
* FUNCTION: addRows( arr[, options] )
*	Add rows to a data frame.
*
* @param {Array} arr - an array of rows to add
* @param {Object} [options] - method options
* @param {Array} [options.names] - row names; if not provided, names are assigned according to row number
* @param {Array} [options.idx] - row indices at which to insert the rows
* @returns {DataFrame} DataFrame instance
*/
function addRows( arr, options ) {
	/* jshint validthis:true */
	var nCols = this._nCols,
		opts = {},
		cache,
		names,
		idx,
		row,
		len,
		flg,
		N, d, n, i, j, k;

	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'addRows()::invalid input argument. First argument must be an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 ) {
		opts = options;
	}
	len = arr.length;
	// Validate each row...
	for ( i = 0; i < len; i++ ) {
		row = arr[ i ];
		if ( !Array.isArray( row ) ) {
			throw new TypeError( 'addRows()::invalid input argument. Each row must be an array. Row: `' + row + '`.' );
		}
		if ( row.length !== nCols ) {
			throw new Error( 'addRows()::invalid input argument. Row length must equal the number of columns. Row index: ' + i + '.' );
		}
		// TODO: data type validation!!!
	}
	// Validate row names...
	if ( opts.hasOwnProperty( 'names' ) ) {
		if ( !Array.isArray( opts.names ) ) {
			throw new TypeError( 'addRows()::invalid option. Row names must be provided as an array. Option: `' + opts.names + '`.' );
		}
		if ( opts.names.length !== len ) {
			throw new Error( 'addRows()::invalid option. Number of row names must equal the number of added rows.' );
		}
		names = opts.names;
	} else {
		names = new Array( len );
		for ( i = 0; i < len; i++ ) {
			names[ i ] = this._rid;
			this._rid++;
		}
	}
	// Validate row indices...
	if ( opts.hasOwnProperty( 'idx' ) ) {
		idx = opts.idx;
		if ( !Array.isArray( idx ) ) {
			throw new TypeError( 'addRows()::invalid option. Row indices must be provided as an array. Option: `' + idx + '`.' );
		}
		if ( idx.length !== len ) {
			throw new Error( 'addRows()::invalid option. Number of row indices must equal the number of added rows.' );
		}
		N = this._nRows + len - 1;
		cache = {};
		for ( i = 0; i < len; i++ ) {
			j = idx[ i ];
			if ( typeof j !== 'number' || j !== j || j%1 !== 0 || j < 0 ) {
				throw new TypeError( 'addRows()::invalid option. All indices must be positive integers. Index: `' + j + '`.' );
			}
			if ( j > N ) {
				throw new Error( 'addRows()::invalid option. Index cannot exceed the total number of rows. Index: `' + j + '`.' );
			}
			if ( cache[ j ] ) {
				throw new Error( 'addRows()::invalid option. Indices must be unique. Duplicated index: `' + j + '`.' );
			}
			cache[ j ] = true;
		}
	}
	// Add the rows to the data array...
	this._nRows += len;
	if ( idx ) {
		N = this._nRows;
		d = new Array( N );
		n = new Array( N );
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
				n[ i ] = names[ j ];
			} else {
				d[ i ] = this._data[ k ];
				n[ i ] = this._rownames[ k ];
				k++;
			}
		}
		this._data = d;
		this._rownames = n;
	} else {
		for ( i = 0; i < len; i++ ) {
			// TODO: deep copy
			this._data.push( arr[ i ].slice() );
			this._rownames.push( names[ i ] );
		}
	}
	return this;
} // end FUNCTION addRows()


// EXPORTS //

module.exports = addRows;
