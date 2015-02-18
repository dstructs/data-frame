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

describe( 'colnames', function tests() {

	var data, df;

	beforeEach( function beforeEach() {
		data = [
			[1,2,3],
			[4,5,6]
		];
		df = new DataFrame( data );
	});

	it( 'should provide a method to set/get data frame column names', function test() {
		expect( df.colnames ).to.be.a( 'function' );
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
				df.colnames( value );
			};
		}
	});

	it( 'should throw an error if not number of column names does not equal number of columns', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			df.colnames( new Array( data[0].length+1 ) );
		}
	});

	it( 'should return an array', function test() {
		assert.isArray( df.colnames() );
	});

	it( 'should set the column names', function test() {
		var expected, actual;

		expected = [ 'beep', 'boop', 'foo' ];
		df.colnames( expected );
		actual = df.colnames();

		assert.deepEqual( actual, expected );
	});

	it( 'should allow duplicate column names', function test() {
		var expected, actual;

		expected = [ 'beep', 'foo', 'beep' ];
		df.colnames( expected );
		actual = df.colnames();

		assert.deepEqual( actual, expected );
	});

});
