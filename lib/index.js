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

// MODULES //

// TODO: replace the ascii-table module with something better :)
var AsciiTable = require( 'ascii-table' );


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
	// TODO: do we want to return a copy or the raw source? If raw source, we allow mutation.
	return this._data;
}; // end METHOD data()

/**
* METHOD: rownames( [names] )
*	Row names setter and getter. If provided `names`, set the row names. If not provided `names`, returns the row names.
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
*	Column names setter and getter. If provided `names`, set the column names. If not provided `names`, returns the column names.
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

/**
* METHOD: head( [n] )
*	Prints the first `n` rows of the data frame. If not provided an input argument, n = 10 rows. If `n` is negative, prints all rows except the last `n` rows.
*
* @param {Number} [n] - number of rows to print (or, if negative, exclude)
*/
DataFrame.prototype.head = function( n ) {
	var N = 10,
		headers,
		table,
		d, i;

	if ( arguments.length ) {
		if ( typeof n !== 'number' || n !== n || n%1 !== 0 ) {
			throw new TypeError( 'head()::invalid input argument. Must provide an integer. Value: `' + n + '`.' );
		}
		N = n;
	}
	if ( N < 0 ) {
		N = this._nRows + N; // nRows - N
	}
	else if ( N > this._nRows ) {
		N = this._nRows;
	}
	table = new AsciiTable();

	// Table headers:
	headers = this._colnames.slice();
	headers.unshift( '' );
	table.setHeading( headers );

	// Create the table rows...
	for ( i = 0; i < N; i++ ) {
		d = this._data[ i ].slice();
		d.unshift( this._rownames[ i ] );
		table.addRow( d );
	}
	// Print the table:
	console.log( table.toString() );
}; // end METHOD head()

/**
* METHOD: tail( [n] )
*	Prints the last `n` rows of the data frame. If not provided an input argument, n = 10 rows. If `n` is negative, prints all rows except the first `n` rows.
*
* @param {Number} [n] - number of rows to print (or, if negative, exclude)
*/
DataFrame.prototype.tail = function( n ) {
	var N = 10,
		headers,
		table,
		d, i;

	if ( arguments.length ) {
		if ( typeof n !== 'number' || n !== n || n%1 !== 0 ) {
			throw new TypeError( 'tail()::invalid input argument. Must provide an integer. Value: `' + n + '`.' );
		}
		N = n;
	}
	if ( N < 0 ) {
		N = -N;
	}
	else if ( N > this._nRows ) {
		N = 0;
	}
	else {
		N = this._nRows - N;
	}
	table = new AsciiTable();

	// Table headers:
	headers = this._colnames.slice();
	headers.unshift( '' );
	table.setHeading( headers );

	// Create the table rows...
	for ( i = N; i < this._nRows; i++ ) {
		d = this._data[ i ].slice();
		d.unshift( this._rownames[ i ] );
		table.addRow( d );
	}
	// Print the table:
	console.log( table.toString() );
}; // end METHOD tail()


// EXPORTS //

module.exports = DataFrame;
