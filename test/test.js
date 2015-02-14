'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	df = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-data-frame', function tests() {

	it( 'should export a function', function test() {
		expect( df ).to.be.a( 'function' );
	});

	it( 'should do something' );

});
