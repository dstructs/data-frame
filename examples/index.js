'use strict';

var DataFrame = require( './../lib' ),
	data = require( './data.json' );

// Create a new data frame:
var df = new DataFrame( data );

// Print the first 5 lines:
df.head( 5 );

// Print the last 3 lines:
df.tail( 3 );

// Print the data frame as a JSON blob:
var blob = df.toJSON();
console.log( JSON.stringify( blob ) );

// Print the data frame as CSV:
var CSV = df.toCSV();
console.log( CSV );

// Print the data frame as TSV:
var TSV = df.toTSV();
console.log( TSV );
