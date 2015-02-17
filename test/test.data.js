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

describe( 'data', function tests() {

	var df;

	beforeEach( function beforeEach() {
		var data = [
			[1,2,3],
			[4,5,6]
		];
		df = new DataFrame( data );
	});

	it( 'should provide a method to get the data frame data', function test() {
		expect( df.data ).to.be.a( 'function' );
	});

	it( 'should return the data frame data', function test() {
		var expected, actual;

		expected = [
			[1,2,3],
			[4,5,6]
		];
		actual = df.data();

		assert.deepEqual( actual, expected );
	});

});
