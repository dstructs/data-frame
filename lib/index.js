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
	this._rid = len;
	this._cid = N;
	return this;
} // end FUNCTION dataFrame()

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
* METHOD: data()
*	Returns the data frame data.
*
* @returns {Array} data - data frame data
*/
DataFrame.prototype.data = function() {
	// TODO: do we want to return a (deep) copy or the raw source? If raw source, we allow mutation.
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
* METHOD: addRows( arr[, options] )
*	Add rows to a data frame.
*
* @param {Array} arr - an array of rows to add
* @param {Object} [options] - method options
* @param {Array} [options.names] - row names; if not provided, names are assigned according to row number
* @param {Array} [options.idx] - row indices at which to insert the rows
* @returns {DataFrame} DataFrame instance
*/
DataFrame.prototype.addRows = function( arr, options ) {
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
}; // end METHOD addRows()

/**
* METHOD: addCols( arr[, options] )
*	Add columns to a data frame.
*
* @param {Array} arr - an array of columns to add
* @param {Object} [options] - method options
* @param {Array} [options.names] - column names; if not provided, names are assigned according to column number
* @param {Array} [options.idx] - column indices at which to insert the column
* @returns {DataFrame} DataFrame instance
*/
DataFrame.prototype.addCols = function( arr, options ) {
	var nRows = this._nRows,
		opts = {},
		cache,
		names,
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
				n[ j ] = names[ i ];
				// TODO: deep copy
				col = arr[ i ];
				for ( i = 0; i < nRows; i++ ) {
					d[ i ][ j ] = col[ i ];
				}
			} else {
				for ( i = 0; i < nRows; i++ ) {
					d[ i ][ j ] = this._data[ i ][ k ];
				}
				n[ j ] = this._colnames[ k ];
				k++;
			}
		}
		this._data = d;
		this._colnames = n;
	} else {
		for ( i = 0; i < len; i++ ) {
			// TODO: deep copy
			col = arr[ i ];
			for ( j = 0; j < nRows; j++ ) {
				this._data[ j ].push( col[ j ] );
			}
			this._colnames.push( names[ i ] );
		}
	}
	return this;
}; // end METHOD addCols()

/**
* METHOD: delRows( keys )
*	Deletes rows from a data frame.
*
* @param {Array} keys - row keys (indices or names)
* @returns {DataFrame} DataFrame instance
*/
DataFrame.prototype.delRows = function( keys ) {
	var names = this._rownames,
		nRows = this._nRows,
		type,
		len,
		key,
		idx,
		i, j;

	if ( !Array.isArray( keys ) ) {
		throw new TypeError( 'delRows()::invalid input argument. Must provide an array. Value: `' + keys + '`.' );
	}
	len = keys.length;

	// Validate that keys are either strings or positive integers and, if numeric, within bounds...
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		type = typeof key;
		if ( type !== 'string' ) {
			if ( type !== 'number' || key !== key || key%1 !== 0 || key < 0 ) {
				throw new TypeError( 'delRows()::invalid input argument. Row key must be either a string or a positive integer. Key: `' + key + '`.' );
			}
			if ( key > nRows-1 ) {
				throw new Error( 'delRows()::invalid input argument. Key exceeds maximum row index. Key: `' + key + '`.' );
			}
		}
	}
	// Validate that all keys are known...
	idx = new Array( len );
	for ( i = 0; i < len; i++ ) {
		idx[ i ] = -1;
		key = keys[ i ];
		if ( typeof key === 'number' ) {
			idx[ i ] = key;
		} else {
			// Search for the key's index in the row names...
			for ( j = 0; j < nRows; j++ ) {
				// NOTE: loose type checking; allows '0' to equal 0...
				/* jshint eqeqeq:false */
				if ( names[ j ] == key ) {
					idx[ i ] = j;
					break;
				}
				/* jshint eqeqeq:true */
			}
		}
		if ( idx[ i ] === -1 ) {
			throw new Error( 'delRows()::invalid input argument. Unknown key. Key: `' + key + '`.' );
		}
	}
	// NOTE: addresses the possible existence of duplicated keys such that they have no effect...
	for ( i = 0; i < len; i++ ) {
		this._data[ idx[ i ] ] = null;
	}
	i = 0;
	while ( i < nRows ) {
		if ( this._data[ i ] === null ) {
			this._data.splice( i, 1 );
			this._rownames.splice( i, 1 );
			nRows -= 1;
		} else {
			i++;
		}
	}
	this._nRows = nRows;
	return this;
}; // end METHOD delRows()

/**
* METHOD: delCols( keys )
*	Deletes columns from a data frame.
*
* @param {Array} keys - column keys (indices or names)
* @returns {DataFrame} DataFrame instance
*/
DataFrame.prototype.delCols = function( keys ) {
	var names = this._colnames,
		nCols = this._nCols,
		FLG = '__DeLeTE_Me!?!@__',
		type,
		len,
		key,
		idx,
		row,
		i, j;

	if ( !Array.isArray( keys ) ) {
		throw new TypeError( 'delCols()::invalid input argument. Must provide an array. Value: `' + keys + '`.' );
	}
	len = keys.length;

	// Validate that keys are either strings or positive integers and, if numeric, within bounds...
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		type = typeof key;
		if ( type !== 'string' ) {
			if ( type !== 'number' || key !== key || key%1 !== 0 || key < 0 ) {
				throw new TypeError( 'delCols()::invalid input argument. Column key must be either a string or a positive integer. Key: `' + key + '`.' );
			}
			if ( key > nCols-1 ) {
				throw new Error( 'delCols()::invalid input argument. Key exceeds maximum column index. Key: `' + key + '`.' );
			}
		}
	}
	// Validate that all keys are known...
	idx = new Array( len );
	for ( i = 0; i < len; i++ ) {
		idx[ i ] = -1;
		key = keys[ i ];
		if ( typeof key === 'number' ) {
			idx[ i ] = key;
		} else {
			// Search for the key's index in the column names...
			for ( j = 0; j < nCols; j++ ) {
				// NOTE: loose type checking; allows '0' to equal 0...
				/* jshint eqeqeq:false */
				if ( names[ j ] == key ) {
					idx[ i ] = j;
					break;
				}
				/* jshint eqeqeq:true */
			}
		}
		if ( idx[ i ] === -1 ) {
			throw new Error( 'delCols()::invalid input argument. Unknown key. Key: `' + key + '`.' );
		}
	}
	// NOTE: addresses the possible existence of duplicated keys such that they have no effect...
	for ( i = 0; i < this._nRows; i++ ) {
		row = this._data[ i ];
		for ( j = 0; j < len; j++ ) {
			row[ idx[j] ] = FLG;
		}
	}
	for ( j = 0; j < len; j++ ) {
		this._colnames.splice( idx[ j ], 1 );
	}
	for ( i = 0; i < this._nRows; i++ ) {
		row = this._data[ i ];
		nCols = this._nCols;
		j = 0;
		while ( j < nCols ) {
			if ( row[ j ] === FLG ) {
				row.splice( j, 1 );
				nCols -= 1;
			} else {
				j++;
			}
		}
	}
	this._nCols = nCols;
	return this;
}; // end METHOD delCols()

/**
* METHOD: transpose()
*	Transposes the data array, such that rows become columns and columns become rows.
*
* @returns {DataFrame} DataFrame instance
*/
DataFrame.prototype.transpose = function() {
	var nRows = this._nCols,
		nCols = this._nRows,
		data,
		tmp,
		row,
		i, j;

	// NOTE: this is a rather expensive operation, as we are allocating an entirely new array of arrays. Because we are using nested arrays, we are unable to use standard in-place transpose algorithms. Not sure how often transposes will be used. If infrequently, not convinced worth the effort to optimize. Could linearize the array (ala ndarray), but then have increased complexity in terms of adding and removing rows/columns, as well as other algorithms.
	data = new Array( nRows );

	for ( i = 0; i < nRows; i++ ) {
		row = new Array( nCols );
		for ( j = 0; j < nCols; j++ ) {
			row[ j ] = this._data[ j ][ i ];
		}
		data[ i ] = row;
	}
	this._data = data;

	tmp = this._rownames;
	this._rownames = this._colnames;
	this._colnames = tmp;

	tmp = this._nRows;
	this._nRows = this._nCols;
	this._nCols = tmp;

	return this;
}; // end METHOD transpose()

/**
* METHOD: head( [n] )
*	Prints the first `n` rows of the data frame. If not provided an input argument, n = 10 rows. If `n` is negative, prints all rows except the last `n` rows.
*
* @param {Number} [n] - number of rows to print (or, if negative, exclude)
* @returns {DataFrame} DataFrame instance
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

	return this;
}; // end METHOD head()

/**
* METHOD: tail( [n] )
*	Prints the last `n` rows of the data frame. If not provided an input argument, n = 10 rows. If `n` is negative, prints all rows except the first `n` rows.
*
* @param {Number} [n] - number of rows to print (or, if negative, exclude)
* @returns {DataFrame} DataFrame instance
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

	return this;
}; // end METHOD tail()

/**
* METHOD: toJSON()
*	Returns a JSON representation of the data frame.
*
* @return {Object} JSON blob
*/
DataFrame.prototype.toJSON = function() {
	var blob = {};

	blob.rownames = this._rownames.slice();
	blob.colnames = this._colnames.slice();

	// TODO: deep copy. Since JSON, should we be faithful to RegExp, Date, etc objects? Thinking no. The output of this should be used, e.g., when saving to file.
	blob.data = JSON.parse( JSON.stringify( this._data ) );

	return blob;
}; // end METHOD toJSON()

/**
* METHOD: toCSV()
*	Returns a CSV representation of the data frame.
*
* @return {String} data frame in CSV format
*/
DataFrame.prototype.toCSV = function() {
	var body = '';

	// Column names:
	body += ',' + this._colnames.join( ',' );
	body += '\n';

	// Rows...
	for ( var i = 0; i < this._nRows; i++ ) {
		body += this._rownames[ i ];
		body += ',';
		body += this._data[ i ].join( ',' );
		body += '\n';
	}
	return body;
}; // end METHOD toCSV()

/**
* METHOD: toTSV()
*	Returns a TSV representation of the data frame.
*
* @return {String} data frame in TSV format
*/
DataFrame.prototype.toTSV = function() {
	var body = '';

	// Column names:
	body += '\t' + this._colnames.join( '\t' );
	body += '\n';

	// Rows...
	for ( var i = 0; i < this._nRows; i++ ) {
		body += this._rownames[ i ];
		body += '\t';
		body += this._data[ i ].join( '\t' );
		body += '\n';
	}
	return body;
}; // end METHOD toTSV()


// EXPORTS //

module.exports = DataFrame;
