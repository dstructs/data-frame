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

describe( 'compute-data-frame', function tests() {

	var data;

	beforeEach( function beforeEach() {
		data = [
			[1,2,3],
			[4,5,6]
		];
	});

	it( 'should export a function', function test() {
		expect( DataFrame ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided any arguments', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			var df = new DataFrame();
		}
	});

	it( 'should return a DataFrame instance', function test() {
		var df = new DataFrame( data );
		assert.ok( df instanceof DataFrame );
	});

	it( 'should not require the `new` operator', function test() {
		var df = DataFrame( data );
		assert.ok( df instanceof DataFrame );
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
				var df = new DataFrame( value );
			};
		}
	});

	it( 'should throw an error if not provided an array of arrays', function test() {
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
				var df = new DataFrame( [ value ] );
			};
		}
	});

	it( 'should throw an error if nested arrays are not of equal length', function test() {
		var data = [
			[1,2,3],
			[1,2]
		];

		expect( badValue ).to.throw( Error );

		function badValue() {
			var df = new DataFrame( data );
		}
	});

	it( 'should throw an error if row names are not provided as an array', function test() {
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
				var df = new DataFrame( data, { 'rownames': value } );
			};
		}
	});

	it( 'should throw an error if number of row names does not equal number of rows', function test() {
		var names = new Array( data.length+1 );

		expect( badValue ).to.throw( Error );

		function badValue() {
			var df = new DataFrame( data, {'rownames': names} );
		}
	});

	it( 'should set the rownames to index values if not provided any row names', function test() {
		var df, expected, actual;

		expected = [ 0, 1 ];
		df = new DataFrame( data );
		actual = df.rownames();

		assert.deepEqual( actual, expected );
	});

	it( 'should set the rownames', function test() {
		var df, expected, actual;

		expected = [ 'foo', 'bar' ];
		df = new DataFrame( data, {'rownames': expected} );
		actual = df.rownames();

		assert.deepEqual( actual, expected );
	});

	it( 'should throw an error if column names are not provided as an array', function test() {
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
				var df = new DataFrame( data, { 'colnames': value } );
			};
		}
	});

	it( 'should throw an error if number of column names does not equal number of columns', function test() {
		var names = new Array( data[0].length+1 );

		expect( badValue ).to.throw( Error );

		function badValue() {
			var df = new DataFrame( data, {'colnames': names} );
		}
	});

	it( 'should set the colnames to index values if not provided any column names', function test() {
		var df, expected, actual;

		expected = [ 0, 1, 2 ];
		df = new DataFrame( data );
		actual = df.colnames();

		assert.deepEqual( actual, expected );
	});

	it( 'should set the colnames', function test() {
		var df, expected, actual;

		expected = [ 'beep', 'boop', 'bap' ];
		df = new DataFrame( data, {'colnames': expected} );
		actual = df.colnames();

		assert.deepEqual( actual, expected );
	});

	it( 'should allow duplicate row names', function test() {
		var df, expected, actual;

		expected = [ 'boop', 'boop' ];
		df = new DataFrame( data, {'rownames': expected} );
		actual = df.rownames();

		assert.deepEqual( actual, expected );
	});

	it( 'should allow duplicate column names', function test() {
		var df, expected, actual;

		expected = [ 'beep', 'boop', 'beep' ];
		df = new DataFrame( data, {'colnames': expected} );
		actual = df.colnames();

		assert.deepEqual( actual, expected );
	});

	it( 'should deep copy' );

});
