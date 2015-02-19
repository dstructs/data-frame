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

describe( 'rename', function tests() {

	var data, df;

	beforeEach( function beforeEach() {
		data = [
			[1,2,3],
			[4,5,6],
			[7,8,9]
		];
		df = new DataFrame( data, {
			'rownames': ['beep', 'boop', 'beep' ],
			'colnames': ['a', 'b', 'a']
		});
	});

	it( 'should provide a method to rename a data frame row or column', function test() {
		expect( df.rename ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is not either `rows` or `cols`', function test() {
		var values = [
			'beep',
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
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				df.rename( value, '' );
			};
		}
	});

	it( 'should throw an error if not provided either a string or a positive integer for the row/column identifier', function test() {
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
				df.rename( 'rows', value, '' );
			};
		}
	});

	it( 'should throw a range error if the row/column identifier exceeds the maximum row/column index', function test() {
		expect( badValue1 ).to.throw( RangeError );
		expect( badValue2 ).to.throw( RangeError );
		function badValue1() {
			df.rename( 'rows', data.length, '' );
		}
		function badValue2() {
			df.rename( 'cols', data[0].length, '' );
		}
	});

	it( 'should throw an error if provided an unknown row/column name', function test() {
		expect( badValue1 ).to.throw( Error );
		expect( badValue2 ).to.throw( Error );
		function badValue1() {
			df.rename( 'rows', 'ajfadjfladsj', '' );
		}
		function badValue2() {
			df.rename( 'cols', 'ajfadjfladsj', '' );
		}
	});

	it( 'should throw an error if new row/column name is not a string', function test() {
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
				df.rename( 'cols', 'a', value );
			};
		}
	});

	it( 'should rename all rows/columns matching a row/column name', function test() {
		var expected, actual;

		expected = [ 'foo', 'boop', 'foo' ];
		df.rename( 'rows', 'beep', 'foo' );
		actual = df.rownames();

		assert.deepEqual( actual, expected );

		expected = [ 'foo', 'b', 'foo' ];
		df.rename( 'cols', 'a', 'foo' );
		actual = df.colnames();

		assert.deepEqual( actual, expected );
	});

	it( 'should allow renaming rows/columns to an existing name', function test() {
		var expected, actual;

		expected = [ 'beep', 'beep', 'beep' ];
		df.rename( 'rows', 'boop', 'beep' );
		actual = df.rownames();

		assert.deepEqual( actual, expected );

		expected = [ 'a', 'a', 'a' ];
		df.rename( 'cols', 'b', 'a' );
		actual = df.colnames();

		assert.deepEqual( actual, expected );
	});

	it( 'should rename an individual row/columns located at a specific index', function test() {
		var expected, actual;

		expected = [ 'beep', 'foo', 'beep' ];
		df.rename( 'rows', 1, 'foo' );
		actual = df.rownames();

		assert.deepEqual( actual, expected );

		expected = [ 'a', 'foo', 'a' ];
		df.rename( 'cols', 1, 'foo' );
		actual = df.colnames();

		assert.deepEqual( actual, expected );
	});

	it( 'should allow renaming a row/column located at a specific index to an existing name', function test() {
		var expected, actual;

		expected = [ 'beep', 'boop', 'boop' ];
		df.rename( 'rows', 2, 'boop' );
		actual = df.rownames();

		assert.deepEqual( actual, expected );

		expected = [ 'a', 'b', 'boop' ];
		df.rename( 'cols', 2, 'boop' );
		actual = df.colnames();

		assert.deepEqual( actual, expected );
	});

});
