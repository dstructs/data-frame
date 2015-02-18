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

describe( 'head', function tests() {

	var df, data;

	beforeEach( function beforeEach() {
		data = [
			[1,2,3],
			[4,5,6]
		];
		df = new DataFrame( data );
	});

	it( 'should provide a method to print the first `n` lines of a data frame', function test() {
		expect( df.head ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-integer', function test() {
		var values = [
			'5',
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
				df.head( value );
			};
		}
	});

	it( 'should provide default behavior', function test() {
		expect( foo ).to.not.throw( Error );
		function foo() {
			df.head();
		}
	});

	it( 'should accept a value less than 0', function test() {
		expect( foo ).to.not.throw( Error );
		function foo() {
			df.head( -1 );
		}
	});

	it( 'should accept a value exceeding the maximum row index', function test() {
		expect( foo ).to.not.throw( Error );
		function foo() {
			df.head( data.length );
			df.head( data.length+1 );
		}
	});

	it( 'should display...' );

});
