/**
*
*	DATAFRAME: get
*
*
*	DESCRIPTION:
*		- Returns data from a data frame.
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

var incrspace = require( 'compute-incrspace' ),
	isString = require( 'validate.io-string' ),
	isBoolean = require( 'validate.io-boolean' ),
	isObject = require( 'validate.io-object' ),
	isArray = require( 'validate.io-array' ),
	isRegEx = require( 'validate.io-regexp' ),
	isStringArray = require( 'validate.io-string-array' ),
	isBooleanArray = require( 'validate.io-boolean-array' ),
	isLogicalArray = require( 'validate.io-logical-array' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' ),
	isNonNegativeIntegerArray = require( 'validate.io-nonnegative-integer-array' );


// VARIABLES //

var re = /^\[\d*:\d*\]$|^\[\d*:\d*:-?\d+\]$/;
/**
* Cases:
*	-	[:]
*		-	e.g., [:]
*	-	[\d+:]
*		-	e.g., [4:]
*	-	[:\d+]
*		-	e.g., [:4]
*	-	[::-?\d+]
*		-	e.g., [::-1]
*	-	[\d+::-?\d+]
*		-	e.g., [3::-1]
*	-	[:\d+:-?\d+]
*		-	e.g., [:10:2]
*	-	[\d+:\d+:-?\d+]
*		-	e.g., [1:9:-3]
*/


// FUNCTIONS //

/**
* FUNCTION: ascending( a, b )
*	Comparator function to sort numeric values in ascending order.
*
* @private
* @param {Number} a
* @param {Number} b
* @returns {Number} difference between `a` and `b`
*/
function ascending( a, b ) {
	return a - b;
} // end FUNCTION ascending()

/**
* FUNCTION: unique( arr )
*	Deduplicates an array, retaining only unique array elements. NOTE: input array is mutated.
*
* @param {Array} arr - input array
* @returns {Array} input array reduced to unique elements
*/
function unique( arr ) {
	var len = arr.length,
		hash = {},
		i = 0,
		val;

	while ( i < len ) {
		val = arr[ i ];
		if ( hash.hasOwnProperty( val ) ) {
			arr.splice( i, 1 );
			len--;
		} else {
			hash[ val ] = true;
			i++;
		}
	}
	return arr;
} // end FUNCTION unique()

/**
* FUNCTION: arraySelect( hash, max, select )
*	Returns a list of indices.
*
* @private
* @param {Object} hash - index hash
* @param {Number} max - maximum allowed index
* @param {String[]|Number[]|Boolean[]|Array} select - selector
* @returns {Number[]} array of indices
*/
function arraySelect( hash, max, select ) {
	var idx,
		name,
		arr,
		val,
		i, j;

	// Use the first array element to sniff the array type...
	val = select[ 0 ];

	// Case 1: array of row/column names
	if ( isString( val ) ) {
		if ( isStringArray( select ) ) {
			unique( select );
			idx = [];
			for ( i = 0; i < select.length; i++ ) {
				name = select[ i ];
				if ( hash.hasOwnProperty( name ) ) {
					arr = hash[ name ];
					arr.sort( ascending );
					for ( j = 0; j < arr.length; j++ ) {
						idx.push( arr[ j ] );
					}
				}
			}
		}
	}
	// Case 2/3: a logical array or an index array
	else if ( isNonNegativeInteger( val ) ) {
		if ( select.length === max+1 && (val === 1 || val === 0) && isLogicalArray( select ) ) {
			idx = [];
			for ( i = 0; i < max+1; i++ ) {
				if ( select[ i ] ) {
					idx.push( i );
				}
			}
		}
		else if ( isNonNegativeIntegerArray( select ) ) {
			idx = unique( select );
			for ( i = 0; i < idx.length; i++ ) {
				if ( idx[ i ] > max ) {
					idx.splice( i, 1 );
				}
			}
		}
	}
	// Case 4: boolean array
	else if ( isBoolean( val ) ) {
		if ( select.length === max+1 && isBooleanArray( select ) ) {
			idx = [];
			for ( i = 0; i < max+1; i++ ) {
				if ( select[ i ] ) {
					idx.push( i );
				}
			}
		}
	}
	if ( idx ) {
		return idx;
	}
	// Case 5: invalid selector
	throw new TypeError( 'get()::invalid input argument. Invalid selector. Please consult the documentation.' );
} // end METHOD arraySelect()

/**
* FUNCTION: nonArraySelect( hash, max, select )
*	Returns a list of indices.
*
* @private
* @param {Object} hash - index hash
* @param {Number} max - maximum allowed index
* @param {String|Number|RegExp} select - selector
* @returns {Number[]} array of indices
*/
function nonArraySelect( hash, max, select ) {
	var idx,
		sign,
		names,
		name,
		arr,
		n, i, j;

	// Case 1: string
	if ( isString( select ) ) {
		// Case 1a: range query
		if ( re.test( select ) ) {
			select = select.split( ':' );
			n = select.length;
			for ( i = 0; i < n; i++ ) {
				select[ i ] = parseInt( select[ i ], 10 );
			}
			i = select[ 0 ];
			j = select[ 1 ];
			if ( n === 2 ) {
				select.push( 1 );
			} else {
				if ( select[ 2 ] < 0 ) {
					sign = true;
				}
			}
			if ( sign ) {
				if ( i !== i ) {
					i = max;
				}
				if ( j !== j ) {
					j = -1;
				} else {
					j -= 1;
				}
			} else {
				if ( i !== i ) {
					i = 0;
				}
				if ( j !== j ) {
					j = max + 1;
				} else {
					j += 1;
				}
			}
			return incrspace( i, j, select[ 2 ] );
		}
		// Case 1b: row/column name
		if ( hash.hasOwnProperty( select ) ) {
			idx = hash[ select ];
			return idx.sort( ascending );
		}
		// Case 1c: nada (assume non-existent row/column name)
		return [];
	}
	// Case 2: index
	if ( isNonNegativeInteger( select ) ) {
		if ( select > max ) {
			return [];
		}
		return [ select ];
	}
	// Case 3: regular expression
	if ( isRegEx( select ) ) {
		names = Object.keys( hash );
		idx = [];
		for ( i = 0; i < names.length; i++ ) {
			name = names[ i ];
			if ( select.test( name ) ) {
				arr = hash[ name ];
				for ( j = 0; j < arr.length; j++ ) {
					idx.push( arr[ j ] );
				}
			}
		}
		return idx.sort( ascending );
	}
	// Case 4: invalid selector
	throw new TypeError( 'get()::invalid input argument. Invalid selector. Please consult the documentation.' );
} // end FUNCTION nonArraySelect()


// GET //

/**
* FUNCTION: get( rows, cols[, options] )
*	Returns data from a data frame.
*
* @param {String|Number|String[]|Number[]|RegExp} rows - row selection
* @param {String|Number|String[]|Number[]|RegExp} cols - column selection
* @param {Object} [options] - function options
* @param {Boolean} [options.view=false] - boolean flag indicating whether to return a View instance rather a new DataFrame
* @returns {DataFrame} new DataFrame instance
*/
function get( rows, cols, options ) {
	/* jshint validthis:true */
	var opts = {},
		rownames = this._rownames,
		colnames = this._colnames,
		nRows = this._nRows,
		nCols = this._nCols,
		getIndices,
		rnames,
		cnames,
		rIdx,
		cIdx,
		arr,
		tmp,
		row,
		i, j;

	// [0] Validate options...
	if ( arguments.length > 2 ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'get()::invalid input argument. Options must be an object. Value: `' + options + '`.' );
		}
		opts = options;
	}
	if ( opts.hasOwnProperty( 'view' ) ) {
		if ( !isBoolean( opts.view ) ) {
			throw new TypeError( 'get()::invalid option. View flag must be a boolean. Option: `' + opts.view + '`.' );
		}
		// TODO: View currently not supported. Remove this if, and when, Views are supported.
		opts.view = false;
	} else {
		opts.view = false;
	}
	// [1] Row indices...
	getIndices = ( isArray(rows) ) ? arraySelect : nonArraySelect;
	rIdx = getIndices( this._rhash, nRows-1, rows );
	if ( !rIdx.length ) {
		return null;
	}
	// [2] Column indices...
	getIndices = ( isArray(cols) ) ? arraySelect : nonArraySelect;
	cIdx = getIndices( this._chash, nCols-1, cols );
	if ( !cIdx.length ) {
		return null;
	}
	// [-] Determine if a new View should be returned...
	if ( opts.view ) {
		// NOTE: not implemented!
		return /* new View() */;
	}
	// [3] Copy the data...
	nRows = rIdx.length;
	nCols = cIdx.length;
	arr = new Array( nRows );
	for ( i = 0; i < nRows; i++ ) {
		tmp = new Array( nCols );
		row = this._data[ rIdx[ i ] ];
		for ( j = 0; j < nCols; j++ ) {
			// TODO: deep copy!!!
			tmp[ j ] = row[ cIdx[ j ] ];
		}
		arr[ i ] = tmp;
	}
	rnames = new Array( nRows );
	for ( i = 0; i < nRows; i++ ) {
		rnames[ i ] = rownames[ rIdx[ i ] ];
	}
	cnames = new Array( nCols );
	for ( i = 0; i < nCols; i++ ) {
		cnames[ i ] = colnames[ cIdx[ i ] ];
	}
	// [4] Return a new DataFrame...
	return new this.constructor( arr, {
		'rownames': rnames,
		'colnames': cnames
	});
} // end METHOD get()


// EXPORTS //

module.exports = get;
