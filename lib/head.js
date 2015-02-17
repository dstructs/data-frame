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

var AsciiTable = require( 'ascii-table' );


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
	var N = 10,
		headers,
		table,
		d, i;

	if ( arguments.length ) {
		if ( typeof n !== 'number' || n !== n || n%1 !== 0 ) {
			throw new TypeError( 'head()::invalid input argument. Must provide an integer. Value: `' + n + '`.' );
		}
		N = n;
	}
	if ( N < 0 ) {
		N = this._nRows + N; // nRows - N
	}
	else if ( N > this._nRows ) {
		N = this._nRows;
	}
	table = new AsciiTable();

	// Table headers:
	headers = this._colnames.slice();
	headers.unshift( '' );
	table.setHeading( headers );

	// Create the table rows...
	for ( i = 0; i < N; i++ ) {
		d = this._data[ i ].slice();
		d.unshift( this._rownames[ i ] );
		table.addRow( d );
	}
	// Print the table:
	console.log( table.toString() );

	return this;
} // end FUNCTION head()


// EXPORTS //

module.exports = head;
