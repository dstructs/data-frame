/**
*
*	COMPUTE: data-frame
*
*
*	DESCRIPTION:
*		- Two-dimensional tabular data structure.
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

// DATA FRAME //

/**
* FUNCTION: DataFrame( arr[, opts] )
*	Data frame constructor.
*
* @constructor
* @param {Array} arr - array of arrays
* @param {Object} [opts] - data frame options
* @returns {DataFrame} DataFrame instance
*/
function DataFrame( arr, options ) {
	var args = arguments,
		nArgs = args.length,
		opts = {},
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
			this._rownames[ i ] = i;
		}
	} else {
		if ( !Array.isArray( opts.rownames ) ) {
			throw new TypeError( 'DataFrame()::invalid input argument. Row names must be an array.' );
		}
		if ( opts.rownames.length !== len ) {
			throw new Error( 'DataFrame()::invalid input argument. Number of row names does not equal the number of rows.' );
		}
		this._rownames = opts.rownames.slice();
	}
	// [4] Number of column names must equal number of columns...
	if ( !opts.hasOwnProperty( 'colnames' ) ) {
		this._colnames = new Array( N );
		for ( i = 0; i < N; i++ ) {
			this._colnames[ i ] = i;
		}
	} else {
		if ( !Array.isArray( opts.colnames ) ) {
			throw new TypeError( 'DataFrame()::invalid input argument. Column names must be an array.' );
		}
		if ( opts.colnames.length !== N ) {
			throw new Error( 'DataFrame()::invalid input argument. Number of column names does not equal the number of columns.' );
		}
		this._colnames = opts.colnames.slice();
	}
	this._data = data;
	this._nRows = len;
	this._nCols = N;
	return this;
} // end FUNCTION dataFrame()

/**
* METHOD: data()
*	Returns the data frame data.
*
* @returns {Array} data - data frame data
*/
DataFrame.prototype.data = function() {
	return this._data;
}; // end METHOD data()

/**
* METHOD: rownames( [names] )
*	Data frame row names setter and getter. If provided names, set the data frame row names. If not provided names, returns the data frame row names.
*
* @param {Array} [names] - row names
* @returns {DataFrame|Array} DataFrame instance or row names
*/
DataFrame.prototype.rownames = function( names ) {
	if ( !arguments.length ) {
		return this._rownames.slice();
	}
	if ( !Array.isArray( names ) ) {
		throw new TypeError( 'rownames()::invalid input argument. Must provide an array.' );
	}
	if ( names.length !== this._nRows ) {
		throw new Error( 'rownames()::invalid input argument. Number of names must equal the number of rows.' );
	}
	this._rownames = names.slice();
	return this;
}; // end METHOD rownames()

/**
* METHOD: colnames( [names] )
*	Data frame columns names setter and getter. If provided names, set the data frame column names. If not provided names, returns the data frame column names.
*
* @param {Array} [names] - column names
* @returns {DataFrame|Array} DataFrame instance or column names
*/
DataFrame.prototype.colnames = function( names ) {
	if ( !arguments.length ) {
		return this._colnames.slice();
	}
	if ( !Array.isArray( names ) ) {
		throw new TypeError( 'colnames()::invalid input argument. Must provide an array.' );
	}
	if ( names.length !== this._nCols ) {
		throw new Error( 'colnames()::invalid input argument. Number of names must equal the number of columns.' );
	}
	this._colnames = names.slice();
	return this;
}; // end METHOD colnames()

/**
* METHOD: size()
*	Returns the data frame size as a two-element array.
*
* @returns {Array} [nrows, ncols]
*/
DataFrame.prototype.size = function() {
	return [ this._nRows, this._nCols ];
}; // end METHOD size()


// EXPORTS //

module.exports = DataFrame;
