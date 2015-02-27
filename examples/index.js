'use strict';

var DataFrame = require( './../lib' );

// Data:
var data = require( './data.json' );

// Variables:
var rows,
	cols,
	df,
	df2,
	blob,
	rownames,
	colnames;

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


// ------------------------
// Tranpose

data = [
	[1,2,3],
	[4,5,6],
	[7,8,9]
];

df = new DataFrame( data );
df.head();

console.log( df.size() );

// Take the tranpose:
df.transpose();
df.head();
console.log( df.size() );


// ------------------------
// Get

data = [
	[1,2,3],
	[4,5,6],
	[7,8,9],
	[10,11,12],
	[13,14,15],
	[16,17,18],
	[19,20,21],
	[22,23,24],
	[25,26,27],
	[28,29,30]
];

rownames = [
	'beep',
	'boop',
	'bap',
	'baz',
	'foo',
	'bar',
	'beep',
	'boop',
	'whoa',
	'beep'
];

colnames = ['a','b','c'];

df = new DataFrame( data, {
	'rownames': rownames,
	'colnames': colnames
});

df2 = df.get( '[::-1]', '[:]' );
df2.head();

df2 = df.get( 'beep', ['a','b','c'] );
df2.head();

df2 = df.get( 'boop', 'a' );
df2.head();

df2 = df.get( 'unknown', 'b' );
console.log( df2 );

df2 = df.get( 'boop', /.*/ );
df2.head();

df2 = df.get( 'whoa', 20 );
console.log( df2 );

df2 = df.get( [0,6,9], [2,0,1] );
df2.head();

df2 = df.get( [0,6,6,9,9], [2,0,0,1,2,0] );
df2.head();

df2 = df.get( [ 'beep', 'boop' ], '[0:2]' );
df2.head();

df2 = df.get( /^b.{2}p$/, '[2:0:-1]' );
df2.head();

df2 = df.get( /^b.{2}p$/, [true, false, true] );
df2.head();

df2 = df.get( /^b.{2}p$/, [0,1,0] );
df2.head();
