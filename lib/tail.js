/**
*
*	DATAFRAME: tail
*
*
*	DESCRIPTION:
*		- Prints the last `n` rows of a data frame.
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


// TAIL //

/**
* FUNCTION: tail( [n] )
*	Prints the last `n` rows of a data frame. If not provided an input argument, n = 10 rows. If `n` is negative, prints all rows except the first `n` rows.
*
* @param {Number} [n] - number of rows to print (or, if negative, exclude)
* @returns {DataFrame} DataFrame instance
*/
function tail( n ) {
	/* jshint validthis:true */
	var N = 10,
		headers,
		table,
		d, i;

	if ( arguments.length ) {
		if ( !isInteger( n ) ) {
			throw new TypeError( 'tail()::invalid input argument. Must provide an integer. Value: `' + n + '`.' );
		}
		N = n;
	}
	if ( N < 0 ) {
		N = -N;
	}
	else if ( N > this._nRows ) {
		N = 0;
	}
	else {
		N = this._nRows - N;
	}
	table = new AsciiTable();

	// Table headers:
	headers = this._colnames.slice();
	headers.unshift( '' );
	table.setHeading( headers );

	// Create the table rows...
	for ( i = N; i < this._nRows; i++ ) {
		d = this._data[ i ].slice();
		d.unshift( this._rownames[ i ] );
		table.addRow( d );
	}
	// Print the table:
	console.log( table.toString() );

	return this;
} // end FUNCTION tail()


// EXPORTS //

module.exports = tail;
