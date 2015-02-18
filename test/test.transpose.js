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

describe( 'transpose', function tests() {

	var df, data, rownames, colnames;

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

	it( 'should provide a method to transpose a data frame', function test() {
		expect( df.transpose ).to.be.a( 'function' );
	});

	it( 'should transpose a data frame', function test() {
		var expected, actual;

		expected = [
			[1,4],
			[2,5],
			[3,6]
		];

		df.transpose();
		actual = df.data();

		assert.deepEqual( actual, expected );
	});

	it( 'should update the data frame size', function test() {
		assert.deepEqual( df.size(), [data.length, data[0].length] );

		df.transpose();

		assert.deepEqual( df.size(), [data[0].length, data.length] );
	});

	it( 'should update the row names', function test() {
		df.transpose();
		assert.deepEqual( df.rownames(), colnames );
	});

	it( 'should update the column names', function test() {
		df.transpose();
		assert.deepEqual( df.colnames(), rownames );
	});

});
