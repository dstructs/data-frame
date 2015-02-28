/**
*
*	DATAFRAME: constructor
*
*
*	DESCRIPTION:
*		- Constructor.
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
	isArray = require( 'validate.io-array' ),
	isStringArray = require( 'validate.io-string-array' );


// DATA FRAME //

/**
* FUNCTION: DataFrame( arr[, opts] )
*	Data frame constructor.
*
* @constructor
* @param {Array[]} arr - array of arrays
* @param {Object} [opts] - data frame options
* @param {String[]} [opts.rownames] - data frame row names
* @param {String[]} [opts.colnames] - data frame column names
* @returns {DataFrame} DataFrame instance
*/
function DataFrame( arr, options ) {
	var args = arguments,
		nArgs = args.length,
		opts = {},
		names,
		name,
		data,
		nRows,
		nCols,
		row,
		i, j;

	if ( !nArgs ) {
		throw new Error( 'DataFrame()::insufficient input arguments. Must provide a data array.' );
	} else if ( nArgs === 2 ) {
		opts = options;
	}
	if ( !(this instanceof DataFrame) ) {
		return new DataFrame( arr, opts );
	}
	// [0] Must be an array...
	if ( !isArray( arr ) ) {
		throw new TypeError( 'DataFrame()::invalid input argument. Must provide a data array.' );
	}
	nRows = arr.length;
	// [1] Dirty check...
	if ( !isArray( arr[ 0 ] ) ) {
		throw new TypeError( 'DataFrame()::invalid input argument. Data must be an array of arrays.' );
	}
	// [2] All first-level arrays must be equal length...
	nCols = arr[ 0 ].length;
	if ( !isSize( arr, [ null, nCols ] ) ) {
		throw new Error( 'DataFrame()::invalid input argument. Input data array must contain equal length arrays.' );
	}

	// TODO: allow for dtype; e.g., Uint8Array, etc

	// [3] Copy the input data into a 1D array...
	data = new Array( nRows*nCols );
	for ( i = 0; i < nRows; i++ ) {
		row = arr[ i ];
		for ( j = 0; j < nCols; j++ ) {
			// TODO: deep copy. Need to acct for Boolean, Date, RegExp, Number, String, circular refs, etc.
			data[ i*nCols + j ] = row[ j ];
		}
	}
	// [4] Number of row names must equal number of rows...
	if ( !opts.hasOwnProperty( 'rownames' ) ) {
		this._rownames = new Array( nRows );
		for ( i = 0; i < nRows; i++ ) {
			this._rownames[ i ] = i.toString();
		}
	} else {
		names = opts.rownames;
		if ( !isStringArray( names ) ) {
			throw new TypeError( 'DataFrame()::invalid option. Row names must be an array of strings.' );
		}
		if ( names.length !== nRows ) {
			throw new Error( 'DataFrame()::invalid option. Number of row names must equal the number of rows.' );
		}
		this._rownames = names.slice();
	}
	// [5] Number of column names must equal number of columns...
	if ( !opts.hasOwnProperty( 'colnames' ) ) {
		this._colnames = new Array( nCols );
		for ( i = 0; i < nCols; i++ ) {
			this._colnames[ i ] = i.toString();
		}
	} else {
		names = opts.colnames;
		if ( !isStringArray( names ) ) {
			throw new TypeError( 'DataFrame()::invalid option. Column names must be an array.' );
		}
		if ( opts.colnames.length !== nCols ) {
			throw new Error( 'DataFrame()::invalid option. Number of column names does not equal the number of columns.' );
		}
		this._colnames = names.slice();
	}
	// [5] Create lookup tables for row and column names...
	this._rhash = {};
	names = this._rownames;
	for ( i = 0; i < nRows; i++ ) {
		name = names[ i ];
		if ( this._rhash.hasOwnProperty( name ) ) {
			this._rhash[ name ].push( i );
		} else {
			this._rhash[ name ] = [ i ];
		}
	}
	this._chash = {};
	names = this._colnames;
	for ( i = 0; i < nCols; i++ ) {
		name = names[ i ];
		if ( this._chash.hasOwnProperty( name ) ) {
			this._chash[ name ].push( i );
		} else {
			this._chash[ name ] = [ i ];
		}
	}
	this._data = data;
	this._nRows = nRows;
	this._nCols = nCols;
	this._rStride = nCols;
	this._cStride = 1;
	this._rid = nRows;
	this._cid = nCols;
	return this;
} // end FUNCTION DataFrame()


// EXPORTS //

module.exports = DataFrame;
