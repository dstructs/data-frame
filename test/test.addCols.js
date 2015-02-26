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

describe( 'addCols', function tests() {

	var data, cols, df;

	beforeEach( function beforeEach() {
		data = [
			[1,2,3],
			[4,5,6]
		];
		cols = [
			[7,8],
			[10,11]
		];
		df = new DataFrame( data );
	});

	it( 'should provide a method to add columns to a data frame', function test() {
		expect( df.addCols ).to.be.a( 'function' );
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
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				df.addCols( value );
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
			true,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				df.addCols( [ value ] );
			};
		}
	});

	it( 'should throw an error if a column length does equal the number of rows', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			var col = new Array( data.length+1 );
			df.addCols( [ col ] );
		}
	});

	it( 'should throw an error if column names are not provided as an array', function test() {
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
				df.addCols( cols, {'names': value} );
			};
		}
	});

	it( 'should throw an error if column names are not strings', function test() {
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
				df.addCols( cols, {'names': ['',value]} );
			};
		}
	});

	it( 'should throw an error if number of column names does not equal the number of columns', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			var names = [''];
			df.addCols( cols, {'names': names} );
		}
	});

	it( 'should throw an error if indices are not provided as an array', function test() {
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
				df.addCols( cols, {'idx': value} );
			};
		}
	});

	it( 'should throw an error if number of indices does not equal the number of columns', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			df.addCols( cols, {'idx': [ 0 ]} );
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
			true,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				df.addCols( cols, {'idx': [0,value]} );
			};
		}
	});

	it( 'should throw an error if an index exceeds the number of possible columns', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			df.addCols( cols, {'idx': [0,999999]} );
		}
	});

	it( 'should throw an error if an index is duplicated', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			df.addCols( cols, {'idx': [0,0]} );
		}
	});

	it( 'should append columns if not provided indices', function test() {
		var expected, actual, i, j;

		expected = data.slice();
		for ( i = 0; i < data.length; i++ ) {
			for ( j = 0; j < cols.length; j++ ) {
				expected[ i ].push( cols[j][i] );
			}
		}
		df.addCols( cols );
		actual = df.data();

		assert.deepEqual( actual, expected );
	});

	it( 'should correctly insert columns if provided indices', function test() {
		var expected, actual;

		expected = [
			[
				data[0][0],
				cols[0][0],
				data[0][1],
				cols[1][0],
				data[0][2]
			],
			[
				data[1][0],
				cols[0][1],
				data[1][1],
				cols[1][1],
				data[1][2]
			]
		];
		df.addCols( cols, {'idx': [1,3] } );
		actual = df.data();

		assert.deepEqual( actual, expected );
	});

	it( 'should generate column names if none are provided', function test() {
		var expected, actual;

		expected = [ '0', '1', '2', '3', '4' ];
		df.addCols( cols );
		actual = df.colnames();

		assert.deepEqual( actual, expected );
	});

	it( 'should correctly insert column names if provided indices', function test() {
		var expected, actual;

		expected = [ '0', 'boop', '1', 'beep', '2' ];
		df.addCols( cols, {
			'idx': [3,1],
			'names': ['beep', 'boop']
		});
		actual = df.colnames();

		assert.deepEqual( actual, expected );
	});

	it( 'should allow duplicated names', function test() {
		var expected, actual;

		df.addCols( cols, {
			'names': ['boop', 'boop']
		});

		expected = [ '0', '1', '2', 'boop', 'boop' ];
		actual = df.colnames();

		assert.deepEqual( actual, expected );
	});

	it( 'should allow duplicated names when provided indices', function test() {
		var expected, actual;

		df.addCols( cols, {
			'idx': [1,3],
			'names': ['boop', 'boop']
		});

		expected = [ '0', 'boop', '1', 'boop', '2' ];
		actual = df.colnames();

		assert.deepEqual( actual, expected );
	});

	it( 'should deep copy' );

});
