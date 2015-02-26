/**
*
*	DATAFRAME: colnames
*
*
*	DESCRIPTION:
*		- Data frame column names setter and getter.
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


// COLUMN NAMES //

/**
* FUNCTION: colnames( [names] )
*	Column names setter and getter. If provided `names`, set the column names. If not provided `names`, returns the column names.
*
* @param {String[]} [names] - column names
* @returns {DataFrame|String[]} DataFrame instance or column names
*/
function colnames( names ) {
	/* jshint validthis:true */
	var hash,
		name,
		len,
		i;

	if ( !arguments.length ) {
		return this._colnames.slice();
	}
	if ( !isStringArray( names ) ) {
		throw new TypeError( 'colnames()::invalid input argument. Must provide an array of strings.' );
	}
	len = names.length;
	if ( len !== this._nCols ) {
		throw new Error( 'colnames()::invalid input argument. Number of names must equal the number of columns.' );
	}
	names = names.slice();
	this._colnames = names;

	// Create a hash for easy lookup...
	hash = this._chash;
	for ( i = 0; i < len; i++ ) {
		name = names[ i ];
		if ( hash.hasOwnProperty( name ) ) {
			hash[ name ].push( i );
		} else {
			hash[ name ] = [ i ];
		}
	}
	return this;
} // end FUNCTION colnames()


// EXPORTS //

module.exports = colnames;
