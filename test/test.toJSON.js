/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	DataFrame = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'toJSON', function tests() {

	var data, rownames, colnames, df;

	beforeEach( function beforeEach() {
		data = [
			[1,2,3],
			[4,5,6]
		];
		rownames = [ 'beep', 'boop' ];
		colnames = [ 'a', 'b', 'c' ];
		df = new DataFrame( data, {
			'rownames': rownames,
			'colnames': colnames
		});
	});

	it( 'should provide a method to convert the data frame to JSON', function test() {
		expect( df.toJSON ).to.be.a( 'function' );
	});

	it( 'should return a JSON blob', function test() {
		var expected, actual;

		expected = {
			'rownames': rownames,
			'colnames': colnames,
			'data': data
		};
		actual = df.toJSON();

		assert.deepEqual( actual, expected );
	});

});
