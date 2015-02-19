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

describe( 'rownames', function tests() {

	var data, df;

	beforeEach( function beforeEach() {
		data = [
			[1,2,3],
			[4,5,6]
		];
		df = new DataFrame( data );
	});

	it( 'should provide a method to set/get data frame row names', function test() {
		expect( df.rownames ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				df.rownames( value );
			};
		}
	});

	it( 'should throw an error if not provided an array of strings', function test() {
		var values = [
			[],
			5,
			null,
			undefined,
			NaN,
			true,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				df.rownames( ['',value] );
			};
		}
	});

	it( 'should throw an error if not number of row names does not equal number of rows', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			df.rownames( new Array( data.length+1 ) );
		}
	});

	it( 'should return an array', function test() {
		assert.isArray( df.rownames() );
	});

	it( 'should set the row names', function test() {
		var expected, actual;

		expected = [ 'beep', 'boop' ];
		df.rownames( expected );
		actual = df.rownames();

		assert.deepEqual( actual, expected );
	});

	it( 'should allow duplicate row names', function test() {
		var expected, actual;

		expected = [ 'beep', 'beep' ];
		df.rownames( expected );
		actual = df.rownames();

		assert.deepEqual( actual, expected );
	});

});
