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

describe( 'toTSV', function tests() {

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

	it( 'should provide a method to convert the data frame to TSV', function test() {
		expect( df.toTSV ).to.be.a( 'function' );
	});

	it( 'should return a TSV formatted string', function test() {
		var expected, actual;

		expected = '\ta\tb\tc\nbeep\t1\t2\t3\nboop\t4\t5\t6\n';
		actual = df.toTSV();

		assert.strictEqual( actual, expected );
	});

});
