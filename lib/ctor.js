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
		len,
		N,
		i;
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
	len = arr.length;
	// [1] Dirty check...
	if ( !isArray( arr[ 0 ] ) ) {
		throw new TypeError( 'DataFrame()::invalid input argument. Data must be an array of arrays.' );
	}
	// [2] All first-level arrays must be equal length...
	N = arr[ 0 ].length;
	if ( !isSize( arr, [ null, N ] ) ) {
		throw new Error( 'DataFrame()::invalid input argument. Input data array must contain equal length arrays.' );
	}

	// TODO: deep copy; this is a shallow copy. Need to acct for Boolean, Date, RegExp, Number, circular references, etc.
	data = new Array( len );

	// [3] Copy the input data...
	for ( i = 0; i < len; i++ ) {
		data[ i ] = arr[ i ].slice();
	}
	// [4] Number of row names must equal number of rows...
	if ( !opts.hasOwnProperty( 'rownames' ) ) {
		this._rownames = new Array( len );
		for ( i = 0; i < len; i++ ) {
			this._rownames[ i ] = i.toString();
		}
	} else {
		names = opts.rownames;
		if ( !isStringArray( names ) ) {
			throw new TypeError( 'DataFrame()::invalid option. Row names must be an array of strings.' );
		}
		if ( names.length !== len ) {
			throw new Error( 'DataFrame()::invalid option. Number of row names must equal the number of rows.' );
		}
		this._rownames = names.slice();
	}
	// [5] Number of column names must equal number of columns...
	if ( !opts.hasOwnProperty( 'colnames' ) ) {
		this._colnames = new Array( N );
		for ( i = 0; i < N; i++ ) {
			this._colnames[ i ] = i.toString();
		}
	} else {
		names = opts.colnames;
		if ( !isStringArray( names ) ) {
			throw new TypeError( 'DataFrame()::invalid option. Column names must be an array.' );
		}
		if ( opts.colnames.length !== N ) {
			throw new Error( 'DataFrame()::invalid option. Number of column names does not equal the number of columns.' );
		}
		this._colnames = names.slice();
	}
	// [5] Create lookup tables for row and column names...
	this._rhash = {};
	names = this._rownames;
	for ( i = 0; i < names.length; i++ ) {
		name = names[ i ];
		if ( this._rhash.hasOwnProperty( name ) ) {
			this._rhash[ name ].push( i );
		} else {
			this._rhash[ name ] = [ i ];
		}
	}
	this._chash = {};
	names = this._colnames;
	for ( i = 0; i < names.length; i++ ) {
		name = names[ i ];
		if ( this._chash.hasOwnProperty( name ) ) {
			this._chash[ name ].push( i );
		} else {
			this._chash[ name ] = [ i ];
		}
	}
	this._data = data;
	this._nRows = len;
	this._nCols = N;
	this._rid = len;
	this._cid = N;
	return this;
} // end FUNCTION DataFrame()


// EXPORTS //

module.exports = DataFrame;
