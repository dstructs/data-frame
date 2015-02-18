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

describe( 'addRows', function tests() {

	var data, rows, df;

	beforeEach( function beforeEach() {
		data = [
			[1,2,3],
			[4,5,6]
		];
		rows = [
			[7,8,9],
			[10,11,12]
		];
		df = new DataFrame( data );
	});

	it( 'should provide a method to add rows to a data frame', function test() {
		expect( df.addRows ).to.be.a( 'function' );
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
				df.addRows( value );
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
				df.addRows( [ value ] );
			};
		}
	});

	it( 'should throw an error if a row length does equal the number of columns', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			var row = new Array( data[0].length+1 );
			df.addRows( [ row ] );
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
				df.addRows( rows, {'names': value} );
			};
		}
	});

	it( 'should throw an error if number of row names does not equal the number of rows', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			var names = new Array( rows.length+1 );
			df.addRows( rows, {'names': names} );
		}
	});

	it( 'should throw an error if indices are not provided as an array', function test() {
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
				df.addRows( rows, {'idx': value} );
			};
		}
	});

	it( 'should throw an error if number of indices does not equal the number of rows', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			var idx = new Array( rows.length+1 );
			df.addRows( rows, {'idx': idx} );
		}
	});

	it( 'should throw an error if an index is not a positive integer', function test() {
		var values = [
			'5',
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
				df.addRows( rows, {'idx': [0,value]} );
			};
		}
	});

	it( 'should throw an error if an index exceeds the number of possible rows', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			df.addRows( rows, {'idx': [0,999999]} );
		}
	});

	it( 'should throw an error if an index is duplicated', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			df.addRows( rows, {'idx': [0,0]} );
		}
	});

	it( 'should append rows if not provided indices', function test() {
		var expected, actual;

		expected = data.slice();
		for ( var i = 0; i < rows.length; i++ ) {
			expected.push( rows[ i ] );
		}
		df.addRows( rows );
		actual = df.data();

		assert.deepEqual( actual, expected );
	});

	it( 'should correctly insert rows if provided indices', function test() {
		var expected, actual;

		expected = [
			data[ 0 ],
			rows[ 0 ],
			data[ 1 ],
			rows[ 1 ]
		];
		df.addRows( rows, {'idx': [1,3] } );
		actual = df.data();

		assert.deepEqual( actual, expected );
	});

	it( 'should generate row names if none are provided', function test() {
		var expected, actual;

		expected = [ 0, 1, 2, 3 ];
		df.addRows( rows );
		actual = df.rownames();

		assert.deepEqual( actual, expected );
	});

	it( 'should correctly insert row names if provided indices', function test() {
		var expected, actual;

		expected = [ 0, 'boop', 1, 'beep' ];
		df.addRows( rows, {
			'idx': [3,1],
			'names': ['beep', 'boop']
		});
		actual = df.rownames();

		assert.deepEqual( actual, expected );
	});

	it( 'should allow duplicated names', function test() {
		var expected, actual;

		df.addRows( rows, {
			'names': ['boop', 'boop']
		});

		expected = [ 0, 1, 'boop', 'boop' ];
		actual = df.rownames();

		assert.deepEqual( actual, expected );
	});

	it( 'should allow duplicated names when provided indices', function test() {
		var expected, actual;

		df.addRows( rows, {
			'idx': [1,3],
			'names': ['boop', 'boop']
		});

		expected = [ 0, 'boop', 1, 'boop' ];
		actual = df.rownames();

		assert.deepEqual( actual, expected );
	});

	it( 'should deep copy' );

});
