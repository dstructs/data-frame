/**
*
*	DATAFRAME: rowrename
*
*
*	DESCRIPTION:
*		- Method to rename a row.
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
* FUNCTION: rowrename( key, name )
*	Renames a row.
*
* @param {Number|String} key - row identifier (either the row index or a row name)
* @param {String} name - new row name
* @returns {DataFrame} DataFrame instance
*/
function rowrename( key, name ) {
	/* jshint validthis:true */
	var names = this._rownames,
		hash = this._rhash,
		type = typeof key,
		idx,
		n, i;

	if ( type !== 'string' ) {
		if ( type !== 'number' || key !== key || key%1 !== 0 || key < 0 ) {
			throw new TypeError( 'rowrename()::invalid input argument. Row identifier must be either a string or a positive integer. Value: `' + key + '`.' );
		}
		if ( key >= names.length ) {
			throw new RangeError( 'rowrename()::invalid input argument. Row index exceeds number of rows. Value: `' + key + '`.' );
		}
	} else {
		if ( !hash.hasOwnProperty( key ) ) {
			throw new Error( 'rowrename()::invalid input argument. Unrecognized row identifier. Value: `' + key + '`.' );
		}
	}
	if ( typeof name !== 'string' ) {
		throw new TypeError( 'rowrename()::invalid input argument. Row name must be a string. Value: `' + name + '`.' );
	}
	if ( type === 'string' ) {
		// Get the row indices and update their associated row name...
		idx = hash[ key ];
		for ( i = 0; i < idx.length; i++ ) {
			names[ idx[i] ] = name;
		}
		// Delete the old name from the row hash table and reassign the indices to the new name...
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
		// Get the name associated with the index and replace the name in the row name array...
		n = names[ key ];
		names[ key ] = name;

		// Remove the index from the row hash entry...
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
		// Update the hash for row name lookups...
		if ( hash.hasOwnProperty( n ) ) {
			hash[ n ].push( key );
		} else {
			hash[ n ] = [ key ];
		}
	}
	return this;
} // end FUNCTION rowrename()


// EXPORTS //

module.exports = rowrename;
