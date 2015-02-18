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

describe( 'delCols', function tests() {

	var df, data;

	beforeEach( function beforeEach() {
		data = [
			[1,2,3],
			[4,5,6],
			[7,8,9]
		];
		df = new DataFrame( data, {
			'colnames': [ 'a', 'b', 'c' ]
		});
	});

	it( 'should provide a method to delete columns from a data frame', function test() {
		expect( df.delCols ).to.be.a( 'function' );
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
				df.delCols( value );
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
				df.delCols( [ value ] );
			};
		}
	});

	it( 'should throw an error if provided a key which exceeds the number of columns', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			df.delCols( [ 999999 ] );
		}
	});

	it( 'should throw an error if provided an unknown key', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			df.delCols( [ 0, 'djfkajflak' ] );
		}
	});

	it( 'should delete data frame columns', function test() {
		var expected, actual;

		expected = [
			[2],
			[5],
			[8]
		];

		df.delCols( [ 'a', 2 ] );
		actual = df.data();

		assert.deepEqual( actual, expected );
	});

	it( 'should delete data frame column names', function test() {
		var expected, actual;

		expected = ['b'];

		df.delCols( [ 'a', 2 ] );
		actual = df.colnames();

		assert.deepEqual( actual, expected );
	});

	it( 'should update the data frame size', function test() {
		assert.deepEqual( df.size(), [3,3] );
		df.delCols( [ 'a', 2 ] );
		assert.deepEqual( df.size(), [3,1] );
	});

	it( 'should not throw an error if provided duplicate keys', function test() {
		var expected, actual;

		expected = [
			[2,3],
			[5,6],
			[8,9]
		];

		df.delCols( [ 'a', 0, 'a' ] );
		actual = df.data();

		assert.deepEqual( actual, expected );
	});

	it( 'should remove all columns with the same name', function test() {
		var df, expected, actual;

		df = new DataFrame( data, {
			'colnames': [ 'a', 'a', 'a' ]
		});

		expected = [[],[],[]];

		df.delCols( [2,'a'] );
		actual = df.data();

		assert.deepEqual( actual, expected );
	});

});
