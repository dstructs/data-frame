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

describe( 'delRows', function tests() {

	var df, data;

	beforeEach( function beforeEach() {
		data = [
			[1,2,3],
			[4,5,6],
			[7,8,9]
		];
		df = new DataFrame( data, {
			'rownames': [ 'a', 'b', 'c' ]
		});
	});

	it( 'should provide a method to delete rows from a data frame', function test() {
		expect( df.delRows ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				df.delRows( value );
			};
		}
	});

	it( 'should throw an error if provided a key with neither a string or positive integer', function test() {
		var values = [
			-5,
			3.14,
			null,
			undefined,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				df.delRows( [ value ] );
			};
		}
	});

	it( 'should throw an error if provided a key which exceeds the number of rows', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			df.delRows( [ 999999 ] );
		}
	});

	it( 'should throw an error if provided an unknown key', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			df.delRows( [ 0, 'djfkajflak' ] );
		}
	});

	it( 'should delete data frame rows', function test() {
		var expected, actual;

		expected = [[4,5,6]];

		df.delRows( [ 'a', 2 ] );
		actual = df.data();

		assert.deepEqual( actual, expected );
	});

	it( 'should delete data frame row names', function test() {
		var expected, actual;

		expected = ['b'];

		df.delRows( [ 'a', 2 ] );
		actual = df.rownames();

		assert.deepEqual( actual, expected );
	});

	it( 'should update the data frame size', function test() {
		assert.deepEqual( df.size(), [3,3] );
		df.delRows( [ 'a', 2 ] );
		assert.deepEqual( df.size(), [1,3] );
	});

	it( 'should not throw an error if provided duplicate keys', function test() {
		var expected, actual;

		expected = [
			[4,5,6],
			[7,8,9]
		];

		df.delRows( [ 'a', 0, 'a' ] );
		actual = df.data();

		assert.deepEqual( actual, expected );
	});

	it( 'should remove all rows with the same name', function test() {
		var df, expected, actual;

		df = new DataFrame( data, {
			'rownames': [ 'a', 'a', 'a' ]
		});

		expected = [];

		df.delRows( [2,'a'] );
		actual = df.data();

		assert.deepEqual( actual, expected );
	});

});
