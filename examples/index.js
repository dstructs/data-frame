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

var data1, newRows, newCols;

data1 = [
	[1,2,3],
	[4,5,6]
];

newRows = [
	[7,8,9],
	[10,11,12]
];

df = new DataFrame( data1 );
df.head();

df.addRows( newRows, {
	'names': ['foo', 'bar'],
	'idx': [2,0]
});
df.head();

newCols = [
	[13,14,15,16],
	[17,18,19,20]
];

df.addCols( newCols, {
	'names': ['beep', 'boop'],
	'idx': [3,1]
});
df.head();


