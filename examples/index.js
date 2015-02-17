'use strict';

var DataFrame = require( './../lib' );

// Data:
var data = require( './data.json' );

// Variables:
var rows,
	cols,
	df,
	blob;

// ------------------------
// Creating a data frame

// Create a new data frame:
df = new DataFrame( data );

// Print the size:
console.log( df.size() );

// Print the first 5 lines:
df.head( 5 );

// Print the last 3 lines:
df.tail( 3 );


// ------------------------
// Printing a data frame

// Print the data frame as a JSON blob:
blob = df.toJSON();
console.log( JSON.stringify( blob ) );

// Print the data frame as CSV:
blob = df.toCSV();
console.log( blob );

// Print the data frame as TSV:
blob = df.toTSV();
console.log( blob );


// ------------------------
// Updating a data frame

data = [
	[1,2,3],
	[4,5,6]
];

df = new DataFrame( data );
df.head();

console.log( df.size() );

// Adding rows:
rows = [
	[7,8,9],
	[10,11,12]
];

df.addRows( rows, {
	'names': ['foo', 'bar'],
	'idx': [2,0]
});
df.head();
console.log( df.size() );

// Adding columns:
cols = [
	[13,14,15,16],
	[17,18,19,20]
];

df.addCols( cols, {
	'names': ['beep', 'boop'],
	'idx': [3,1]
});
df.head();
console.log( df.size() );

// Removing rows:
df.delRows( ['bar',0] );
df.head();
console.log( df.size() );

// Removing columns:
df.delCols( ['1','boop'] );
df.head();
console.log( df.size() );

console.log( df.rownames() );
console.log( df.colnames() );
