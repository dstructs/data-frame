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

var isString = require( 'validate.io-string' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' ),
	isStringArray = require( 'validate.io-string-array' ),
	isNonNegativeIntegerArray = require( 'validate.io-nonnegative-integer-array' ),
	isRegEx = require( 'validate.io-regexp' ),
	incrspace = require( 'compute-incrspace' );


// VARIABLES //

var re = /^\[\d*:\d*\]$|^\[\d*:\d*:-?\d+\]$/;
/**
* Cases:
*	-	[:]
*		-	e.g, [:]
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
* FUNCTION: getIndices( hash, max, select )
*	Returns a list of indices.
*
* @private
* @param {Object} hash - index hash
* @param {Number} max - maximum allowed index
* @param {String|Number|String[]|Number[]|RegExp} select - selector
* @returns {Number[]|null} array of indices or null if no rows/columns match the selection criteria
*/
function getIndices( hash, max, select ) {
	var idx,
		sign,
		names,
		name,
		arr,
		n, i, j;

	if ( isNonNegativeInteger( select ) ) {
		if ( select > max ) {
			// Exceeds dimensions...
			return null;
		}
		idx = [ i ];
	}
	else if ( isString( select ) ) {
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
			idx = incrspace( i, j, select[ 2 ] );
		} else {
			if ( !hash.hasOwnProperty( select ) ) {
				return null;
			}
			idx = hash[ select ];
		}
	}
	else if ( isNonNegativeIntegerArray( select ) ) {
		// NOTE: should we ensure that the array is unique? or at least unique it here? (numerical unique)
		idx = select;
		for ( i = 0; i < idx.length; i++ ) {
			if ( idx[ i ] > max ) {
				idx.splice( i, 1 );
			}
		}
	}
	else if ( isStringArray( select ) ) {
		// NOTE: should we ensure that the array is unique? or at least unique it here? (nanunique; see validate.io-unique)
		idx = [];
		for ( i = 0; i < select.length; i++ ) {
			name = select[ i ];
			if ( hash.hasOwnProperty( name ) ) {
				arr = hash[ name ];
				for ( j = 0; j < arr.length; j++ ) {
					idx.push( arr[ j ] );
				}
			}
		}
	}
	else if ( isRegEx( select ) ) {
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
	}
	else {
		throw new TypeError( 'get()::invalid input argument. Invalid selection syntax. Please consult the documentation.' );
	}
	// TODO: sort the indices
	return ( idx.length ) ? idx : null;
} // end FUNCTION getIndices()



// GET //

/**
* FUNCTION: get( rows, cols[, options] )
*	Returns data from a data frame.
*
* @param {String|Number|String[]|Number[]|RegExp} rows - row selection
* @param {String|Number|String[]|Number[]|RegExp} cols - column selection
* @param {Object} options - function options
* @returns {}
*/
function get( rows, cols, options ) {
	/* jshint validthis:true */
	var opts = {},
		rIdx,
		cIdx;

	// [0] Row indices...
	rIdx = getIndices( this._rhash, this._nRows-1, rows );
	if ( rIdx === null ) {
		return null;
	}
	// [1] Column indices...
	cIdx = getIndices( this._chash, this._nCols-1, cols );
	if ( cIdx === null ) {
		return null;
	}
	if ( arguments.length > 2 ) {
		opts = options;
	}

	// TODO: validate options

	// TODO: get data --> for each row, get the columns and build a new array of arrays

	// TODO: return View
	return [ rIdx, cIdx ];
} // end METHOD get()


// EXPORTS //

module.exports = get;
