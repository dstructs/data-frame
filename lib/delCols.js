/**
*
*	DATAFRAME: delCols
*
*
*	DESCRIPTION:
*		- Deletes columns from a data frame.
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
* FUNCTION: delCols( keys )
*	Deletes columns from a data frame.
*
* @param {Array} keys - column keys (indices or names)
* @returns {DataFrame} DataFrame instance
*/
function delCols( keys ) {
	/* jshint validthis:true */
	var names = this._colnames,
		chash = this._chash,
		nCols = this._nCols,
		FLG = '__DeLeTE_Me!?!@__',
		type,
		len,
		key,
		idx,
		row,
		arr,
		i, j, k;

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
	idx = [];
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		if ( typeof key === 'number' ) {
			idx.push( key );
		} else {
			if ( chash.hasOwnProperty( key ) ) {
				arr = chash[ key ];
				for ( j = 0; j < arr.length; j++ ) {
					idx.push( arr[ j ] );
				}
			} else {
				throw new Error( 'delCols()::invalid input argument. Unknown key. Key: `' + key + '`.' );
			}
		}
	}
	// NOTE: addresses the possible existence of duplicated keys such that they have no effect...
	len = idx.length;

	// Mark row elements for deletion...
	for ( i = 0; i < this._nRows; i++ ) {
		row = this._data[ i ];
		for ( j = 0; j < len; j++ ) {
			row[ idx[j] ] = FLG;
		}
	}
	// Mark column names for deletion...
	for ( i = 0; i < len; i++ ) {
		j = idx[ i ];
		key = names[ j ];
		arr = chash[ key ];

		names[ idx[i] ] = null;

		// Update the column hash...
		if ( arr ) {
			for ( k = 0; k < arr.length; k++ ) {
				if ( arr[ k ] === j ) {
					break;
				}
			}
			arr.splice( k, 1 );
			if ( !arr.length ) {
				delete chash[ key ];
			}
		}
	}
	// Remove the column names...
	j = 0;
	nCols = this._nCols;
	while ( j < nCols ) {
		if ( names[ j ] === null ) {
			names.splice( j, 1 );
			nCols -= 1;
		} else {
			j++;
		}
	}
	// Remove the columns from each row...
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
} // end FUNCTION delCols()


// EXPORTS //

module.exports = delCols;
