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

/**
* FUNCTION: addCols( arr[, options] )
*	Add columns to a data frame.
*
* @param {Array} arr - an array of columns to add
* @param {Object} [options] - method options
* @param {Array} [options.names] - column names; if not provided, names are assigned according to column number
* @param {Array} [options.idx] - column indices at which to insert the column
* @returns {DataFrame} DataFrame instance
*/
function addCols( arr, options ) {
	/* jshint validthis:true */
	var nRows = this._nRows,
		chash = this._chash,
		opts = {},
		cache,
		hash,
		names,
		name,
		idx,
		col,
		len,
		flg,
		N, d, n, i, j, k;

	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'addCols()::invalid input argument. First argument must be an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 ) {
		opts = options;
	}
	len = arr.length;
	// Validate each column...
	for ( i = 0; i < len; i++ ) {
		col = arr[ i ];
		if ( !Array.isArray( col ) ) {
			throw new TypeError( 'addCols()::invalid input argument. Each column must be an array. Column: `' + col + '`.' );
		}
		if ( col.length !== nRows ) {
			throw new Error( 'addCols()::invalid input argument. Column length must equal the number of rows. Column index: ' + i + '.' );
		}
		// TODO: data type validation!!!
	}
	// Validate column names...
	if ( opts.hasOwnProperty( 'names' ) ) {
		if ( !Array.isArray( opts.names ) ) {
			throw new TypeError( 'addCols()::invalid option. Column names must be provided as an array. Option: `' + opts.names + '`.' );
		}
		if ( opts.names.length !== len ) {
			throw new Error( 'addCols()::invalid option. Number of column names must equal the number of added columns.' );
		}
		names = opts.names;
	} else {
		names = new Array( len );
		for ( i = 0; i < len; i++ ) {
			names[ i ] = this._cid;
			this._cid++;
		}
	}
	// Validate column indices...
	if ( opts.hasOwnProperty( 'idx' ) ) {
		idx = opts.idx;
		if ( !Array.isArray( idx ) ) {
			throw new TypeError( 'addCols()::invalid option. Column indices must be provided as an array. Option: `' + idx + '`.' );
		}
		if ( idx.length !== len ) {
			throw new Error( 'addCols()::invalid option. Number of column indices must equal the number of added columns.' );
		}
		N = this._nCols + len - 1;
		cache = {};
		for ( i = 0; i < len; i++ ) {
			j = idx[ i ];
			if ( typeof j !== 'number' || j !== j || j%1 !== 0 || j < 0 ) {
				throw new TypeError( 'addCols()::invalid option. All indices must be positive integers. Index: `' + j + '`.' );
			}
			if ( j > N ) {
				throw new Error( 'addCols()::invalid option. Index cannot exceed the total number of columns. Index: `' + j + '`.' );
			}
			if ( cache[ j ] ) {
				throw new Error( 'addCols()::invalid option. Indices must be unique. Duplicated index: `' + j + '`.' );
			}
			cache[ j ] = true;
		}
	}
	// Add the columns to the data array...
	this._nCols += len;
	if ( idx ) {
		N = this._nCols;
		d = new Array( nRows );
		for ( i = 0; i < nRows; i++ ) {
			d[ i ] = new Array( N );
		}
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
				// TODO: deep copy
				col = arr[ i ];
				for ( i = 0; i < nRows; i++ ) {
					d[ i ][ j ] = col[ i ];
				}
			} else {
				for ( i = 0; i < nRows; i++ ) {
					d[ i ][ j ] = this._data[ i ][ k ];
				}
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
		this._data = d;
		this._colnames = n;
		this._chash = hash;
	} else {
		for ( i = 0; i < len; i++ ) {
			name = names[ i ];

			// TODO: deep copy
			col = arr[ i ];
			for ( j = 0; j < nRows; j++ ) {
				this._data[ j ].push( col[ j ] );
			}

			this._colnames.push( name );
			if ( chash.hasOwnProperty( name ) ) {
				chash[ name ].push( i );
			} else {
				chash[ name ] = [ i ];
			}
		}
	}
	return this;
} // end FUNCTION addCols()


// EXPORTS //

module.exports = addCols;
