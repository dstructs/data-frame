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
* @param {Number|String} key - row identifier (either the row index or the row name)
* @param {String} name - new row name
* @returns {DataFrame} DataFrame instance
*/
function rowrename( key, name ) {
	/* jshint validthis:true */
	var names = this._rownames,
		hash = this._rhash,
		type = typeof key,
		idx,
		i;

	if ( type !== 'string' ) {
		if ( type !== 'number' || key !== key || key%1 !== 0 ) {
			throw new TypeError( 'rowrename()::invalid input argument. Row identifier must be either a string or a positive integer. Value: `' + key + '`.' );
		}
		if ( key > names.length-1 ) {
			throw new RangeError( 'rowrename()::invalid input argument. Row index exceeds number of rows. Value: `' + key + '`.' );
		}
	}
	if ( !hash.hasOwnProperty( key ) ) {
		throw new Error( 'rowrename()::invalid input argument. Unrecognized row identifier. Value: `' + key + '`.' );
	}
	if ( typeof name !== 'string' ) {
		throw new TypeError( 'rowrename()::invalid input argument. Row name must be a string. Value: `' + name + '`.' );
	}
	// Get the row indices and update their associated row name...
	idx = hash[ key ];
	for ( i = 0; i < idx.length; i++ ) {
		names[ idx[i] ] = name;
	}
	// Delete the old name from the row hash table and reassign the indices to the new name...
	delete hash[ key ];
	if ( hash.hasOwnProperty( key ) ) {
		// The name already exists; add the indices to the existing name...
		for ( i = 0; i < idx.length; i++ ) {
			hash[ key ].push( idx[ i ] );
		}
	} else {
		hash[ name ] = idx;
	}
	return this;
} // end FUNCTION rowrename()


// EXPORTS //

module.exports = rowrename;
