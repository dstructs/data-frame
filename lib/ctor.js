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

/**
* FUNCTION: DataFrame( arr[, opts] )
*	Data frame constructor.
*
* @constructor
* @param {Array} arr - array of arrays
* @param {Object} [opts] - data frame options
* @param {Array} [opts.rownames] - data frame row names
* @param {Array} [opts.colnames] - data frame column names
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
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'DataFrame()::invalid input argument. Must provide a data array.' );
	}
	len = arr.length;

	// TODO: deep copy; this is a shallow copy. Need to acct for Boolean, Date, RegExp, Number, circular references, etc.
	data = new Array( len );

	// [1] Check that input array contains only arrays...
	for ( i = 0; i < len; i++ ) {
		if ( !Array.isArray( arr[i] ) ) {
			throw new TypeError( 'DataFrame()::invalid input argument. Data array must be an array of arrays.' );
		}
		data[ i ] = arr[ i ].slice();
	}
	// [2] All nested arrays must be equal length...
	N = arr[ 0 ].length;
	for ( i = 1; i < len; i++ ) {
		if ( arr[ i ].length !== N ) {
			throw new Error( 'DataFrame()::invalid input argument. Data array must contain equal length arrays.' );
		}
	}
	// [3] Number of row names must equal number of rows...
	if ( !opts.hasOwnProperty( 'rownames' ) ) {
		this._rownames = new Array( len );
		for ( i = 0; i < len; i++ ) {
			this._rownames[ i ] = i.toString();
		}
	} else {
		if ( !Array.isArray( opts.rownames ) ) {
			throw new TypeError( 'DataFrame()::invalid option. Row names must be an array.' );
		}
		if ( opts.rownames.length !== len ) {
			throw new Error( 'DataFrame()::invalid option. Number of row names does not equal the number of rows.' );
		}
		names = opts.rownames.slice();
		for ( i = 0; i < len; i++ ) {
			if ( typeof names[i] !== 'string' ) {
				throw new TypeError( 'DataFrame()::invalid option. Row names must be strings.' );
			}
		}
		this._rownames = names;
	}
	// [4] Number of column names must equal number of columns...
	if ( !opts.hasOwnProperty( 'colnames' ) ) {
		this._colnames = new Array( N );
		for ( i = 0; i < N; i++ ) {
			this._colnames[ i ] = i.toString();
		}
	} else {
		if ( !Array.isArray( opts.colnames ) ) {
			throw new TypeError( 'DataFrame()::invalid option. Column names must be an array.' );
		}
		if ( opts.colnames.length !== N ) {
			throw new Error( 'DataFrame()::invalid option. Number of column names does not equal the number of columns.' );
		}
		names = opts.colnames.slice();
		for ( i = 0; i < N; i++ ) {
			if ( typeof names[i] !== 'string' ) {
				throw new TypeError( 'DataFrame()::invalid option. Column names must be strings.' );
			}
		}
		this._colnames = names;
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
