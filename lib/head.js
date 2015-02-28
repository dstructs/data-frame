/**
*
*	DATAFRAME: head
*
*
*	DESCRIPTION:
*		- Prints the first `n` rows of a data frame.
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

var AsciiTable = require( 'ascii-table' ),
	isInteger = require( 'validate.io-integer' );


// HEAD //

/**
* FUNCTION: head( [n] )
*	Prints the first `n` rows of a data frame. If not provided an input argument, n = 10 rows. If `n` is negative, prints all rows except the last `n` rows.
*
* @param {Number} [n] - number of rows to print (or, if negative, exclude)
* @returns {DataFrame} DataFrame instance
*/
function head( n ) {
	/* jshint validthis:true */
	var data = this._data,
		nCols = this._nCols,
		rs = this._rStride,
		cs = this._cStride,
		row,
		headers,
		table,
		i, j;

	if ( arguments.length ) {
		if ( !isInteger( n ) ) {
			throw new TypeError( 'head()::invalid input argument. Must provide an integer. Value: `' + n + '`.' );
		}
	} else {
		n = 10;
	}
	if ( n < 0 ) {
		n = this._nRows + n; // nRows - n
	}
	else if ( n > this._nRows ) {
		n = this._nRows;
	}
	table = new AsciiTable();

	// Table headers:
	headers = this._colnames.slice();
	headers.unshift( '' );
	table.setHeading( headers );

	// Create the table rows...
	for ( i = 0; i < n; i++ ) {
		row = [ this._rownames[ i ] ];
		for ( j = 0; j < nCols; j++ ) {
			// TODO: based on dtype, will we need to convert non-primitive datum to human readable values?
			row.push( data[ i*rs + j*cs ] );
		}
		table.addRow( row );
	}
	// Print the table:
	console.log( table.toString() );

	return this;
} // end FUNCTION head()


// EXPORTS //

module.exports = head;
