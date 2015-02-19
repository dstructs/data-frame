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

describe( 'rowrename', function tests() {

	var data, df;

	beforeEach( function beforeEach() {
		data = [
			[1,2,3],
			[4,5,6],
			[7,8,9]
		];
		df = new DataFrame( data, {
			'rownames': ['beep', 'boop', 'beep' ]
		});
	});

	it( 'should provide a method to rename a data frame row', function test() {
		expect( df.rowrename ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided either a string or a positive integer for the row identifier', function test() {
		var values = [
			-1,
			5.45,
			null,
			undefined,
			NaN,
			true,
			function(){},
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				df.rowrename( value, '' );
			};
		}
	});

	it( 'should throw a range error if the row identifier exceeds the maximum row index', function test() {
		expect( badValue ).to.throw( RangeError );
		function badValue() {
			df.rowrename( data.length, '' );
		}
	});

	it( 'should throw an error if provided an unknown row name', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			df.rowrename( 'ajfadjfladsj', '' );
		}
	});

	it( 'should throw an error if new row name is not a string', function test() {
		var values = [
			5,
			null,
			undefined,
			NaN,
			true,
			function(){},
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				df.rowrename( 'beep', value );
			};
		}
	});

	it( 'should rename all rows matching a row name', function test() {
		var expected, actual;

		expected = [ 'foo', 'boop', 'foo' ];
		df.rowrename( 'beep', 'foo' );
		actual = df.rownames();

		assert.deepEqual( actual, expected );
	});

	it( 'should allow renaming rows to an existing name', function test() {
		var expected, actual;

		expected = [ 'beep', 'beep', 'beep' ];
		df.rowrename( 'boop', 'beep' );
		actual = df.rownames();

		assert.deepEqual( actual, expected );
	});

	it( 'should rename an individual row located at a specific row index', function test() {
		var expected, actual;

		expected = [ 'beep', 'foo', 'beep' ];
		df.rowrename( 1, 'foo' );
		actual = df.rownames();

		assert.deepEqual( actual, expected );
	});

	it( 'should allow renaming a row located at a specific row index to an existing name', function test() {
		var expected, actual;

		expected = [ 'beep', 'boop', 'boop' ];
		df.rowrename( 2, 'boop' );
		actual = df.rownames();

		assert.deepEqual( actual, expected );
	});

});
