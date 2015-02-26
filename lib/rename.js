/**
*
*	DATAFRAME: rename
*
*
*	DESCRIPTION:
*		- Method to rename rows and columns.
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
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// RENAME //

/**
* FUNCTION: rename( axis, key, name )
*	Renames rows or columns.
*
* @param {String} axis - either 'rows' or 'cols'
* @param {Number|String} key - column identifier (either the column index or a column name)
* @param {String} name - new column name
* @returns {DataFrame} DataFrame instance
*/
function rename( axis, key, name ) {
	/* jshint validthis:true */
	var isStr = isString( key ),
		names,
		hash,
		idx,
		n, i;

	if ( axis !== 'rows' && axis !== 'cols' ) {
		throw new Error( 'rename()::invalid input argument. Axis must be either `rows` or `cols`.' );
	}
	if ( axis === 'rows' ) {
		names = this._rownames;
		hash = this._rhash;
	} else {
		names = this._colnames;
		hash = this._chash;
	}
	if ( !isStr ) {
		if ( !isNonNegativeInteger( key ) ) {
			throw new TypeError( 'rename()::invalid input argument. Identifier must be either a string or a nonnegative integer. Value: `' + key + '`.' );
		}
		if ( key >= names.length ) {
			throw new RangeError( 'rename()::invalid input argument. Index exceeds maximum value. Value: `' + key + '`.' );
		}
	} else {
		if ( !hash.hasOwnProperty( key ) ) {
			throw new Error( 'rename()::invalid input argument. Unrecognized identifier. Value: `' + key + '`.' );
		}
	}
	if ( !isString( name ) ) {
		throw new TypeError( 'rename()::invalid input argument. Name must be a string. Value: `' + name + '`.' );
	}
	if ( isStr ) {
		// Get the indices and update their associated name...
		idx = hash[ key ];
		for ( i = 0; i < idx.length; i++ ) {
			names[ idx[i] ] = name;
		}
		// Delete the old name from the hash table and reassign the indices to the new name...
		delete hash[ key ];
		if ( hash.hasOwnProperty( name ) ) {
			// The name already exists; add the indices to the existing name...
			for ( i = 0; i < idx.length; i++ ) {
				hash[ name ].push( idx[ i ] );
			}
		} else {
			hash[ name ] = idx;
		}
	} else {
		// Get the name associated with the index and replace the name in the name array...
		n = names[ key ];
		names[ key ] = name;

		// Remove the index from the hash entry...
		idx = hash[ n ];
		for ( i = 0; i < idx.length; i++ ) {
			if ( idx[ i ] === key ) {
				break;
			}
		}
		idx.splice( i, 1 );

		// Check if any other indices are still associated with this name...
		if ( !idx.length ) {
			delete hash[ n ];
		}
		// Update the hash for name lookups...
		if ( hash.hasOwnProperty( n ) ) {
			hash[ n ].push( key );
		} else {
			hash[ n ] = [ key ];
		}
	}
	return this;
} // end FUNCTION rename()


// EXPORTS //

module.exports = rename;
