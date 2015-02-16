'use strict';

var DataFrame = require( './../lib' ),
	data = require( './data.json' );

// Create a new data frame:
var df = new DataFrame( data );

df.head( -18 );
