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

/**
* FUNCTION: colnames( [names] )
*	Column names setter and getter. If provided `names`, set the column names. If not provided `names`, returns the column names.
*
* @param {Array} [names] - column names
* @returns {DataFrame|Array} DataFrame instance or column names
*/
function colnames( names ) {
	/* jshint validthis:true */
	var hash, name;
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
	hash = this._chash;
	for ( var i = 0; i < names.length; i++ ) {
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
