/**
*
*	DATAFRAME: rownames
*
*
*	DESCRIPTION:
*		- Data frame row names setter and getter.
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

var isStringArray = require( 'validate.io-string-array' );


// ROW NAMES //

/**
* FUNCTION: rownames( [names] )
*	Row names setter and getter. If provided `names`, set the row names. If not provided `names`, returns the row names.
*
* @param {String[]} [names] - row names
* @returns {DataFrame|String[]} DataFrame instance or row names
*/
function rownames( names ) {
	/* jshint validthis:true */
	var hash,
		name,
		len,
		i;

	if ( !arguments.length ) {
		return this._rownames.slice();
	}
	if ( !isStringArray( names ) ) {
		throw new TypeError( 'rownames()::invalid input argument. Must provide an array of strings.' );
	}
	len = names.length;
	if ( len !== this._nRows ) {
		throw new Error( 'rownames()::invalid input argument. Number of names must equal the number of rows.' );
	}
	names = names.slice();
	this._rownames = names;

	// Create a hash for easy lookup...
	hash = this._rhash;
	for ( i = 0; i < len; i++ ) {
		name = names[ i ];
		if ( hash.hasOwnProperty( name ) ) {
			hash[ name ].push( i );
		} else {
			hash[ name ] = [ i ];
		}
	}
	return this;
} // end FUNCTION rownames()


// EXPORTS //

module.exports = rownames;
