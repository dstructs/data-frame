data-frame
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Two-dimensional tabular data structure.


## Installation

``` bash
$ npm install compute-data-frame
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var DataFrame = require( 'compute-data-frame' );
```

#### DataFrame( arr[, opts] )

Data frame constructor. To create a new `DataFrame`, provide an `array` of `arrays`

``` javascript
var data = [
	[1,2,3],
	[4,5,6]
];

var df = new DataFrame( data );
```

The constructor also accepts the following `options`:
- 	`rownames`: `array` of row names. If not provided, each row name defaults to the row index.
- 	`colnames`: `array` of column names. If not provided, each column name defaults to the column index.

To specify `options` at instantiation,

``` javascript
var data = [
	[1,2,3],
	[4,5,6]
];

var rownames = [ 'beep', 'boop' ],
	colnames = [ 'a', 'b', 'c' ];

var df = new DataFrame( data, {
	'rownames': rownames,
	'colnames': colnames	
});
```


## Examples

``` javascript
var DataFrame = require( 'compute-data-frame' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-data-frame.svg
[npm-url]: https://npmjs.org/package/compute-data-frame

[travis-image]: http://img.shields.io/travis/compute-io/data-frame/master.svg
[travis-url]: https://travis-ci.org/compute-io/data-frame

[coveralls-image]: https://img.shields.io/coveralls/compute-io/data-frame/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/data-frame?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/data-frame.svg
[dependencies-url]: https://david-dm.org/compute-io/data-frame

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/data-frame.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/data-frame

[github-issues-image]: http://img.shields.io/github/issues/compute-io/data-frame.svg
[github-issues-url]: https://github.com/compute-io/data-frame/issues
