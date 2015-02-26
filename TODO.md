TODO
====

1. see R/python
2. enforce type (?)
	- 	data type; e.g., string, integers, float32, etc; see ndarray
	-	dtype
		- 	infer
		- 	assume numeric
		-	if non-numeric, certain methods should be off-limits; e.g., stats
3. accept
	-	`arrays`
	-	other df
	-	dicts
4. tests
5. observers (?)
	-	prevent side effects (e.g., col names length no longer corresponding to number of columns, data being externally mutated)
	- 	maybe copy to immutable arrays?
		- 	or just do a deep copy and store internally
	-	event emitter when does mutate (?)
	-	`copy` as an option
		-	if `true`, copy to new DF
	-	(1) deep copy input `array`; (2) wrap copied `array` in closure; (3) return a data frame which only references the enclosed `array`; (4) force updates via the API.
6. `toJSON()`
	- 	deep copy data; mindful of objects. See source.
7. summary/describe/stats
8. ToC
9. 
10. 
11. a data frame view (akin to go slice)	-	method which returns a new `View` instance
	-	`new View( [i,j], [i,j] )`
		-	provide the DF?
		-	may be good to have that ability as could reuse the view over multiple DFs (just swapping underlying data)
		-	option to copy???
			-	this effectively just becomes a new df, not a view!
	-	want it to be referring to same data structure as parent DataFrame
	-	see #37
	-	inherit from DF; modify such that include i,j offsets and limits
		-	no! methods such as adding and removing rows should be off limits
	-	may need to be its own module
12. copy (?)
	-	similar to toString and view, but a full duplication.
	-	deep!
13. transpose
	-	algorithm optimization --> currently, allocate new array of arrays.
14. abs
15. add
	-	if df, ensure matching dims
	-	scalar
	- 	accessor!
16. subtract
	-	if df, ensure matching dims
	- 	scalar
	-	accessor
17. mult
18. div
19. all (option to specify 'axis')
20. any (opt to specify 'axis')
21. apply/map (opt to specify 'axis')
22. find (opt to specify 'axis')
	-	ability to threshold values
23. filter
	-	rows/cols matching criteria
	-	return View
24. corr
	-	if arg, another DF (ensure matching dims)
	-	matrix
25. cov
26. cmax ('axis' opt)
27. cmin ('axis')
28. csum ('axis')
29. cprod ('axis')
30. eq
	-	dfs
	-	scalar
31. lt
32. gt
33. leq
34. geq
35. head
	-	replace ascii-table
	- 	see how R does it
	-	opt for display width (wrapping rows)
36. tail
	-	replace ascii-table
	-	opt for display width (wrapping rows)
37. get
	-	mult rows, mult cols
	-	range query
		-	[link](http://pandas.pydata.org/pandas-docs/dev/indexing.html#slicing-ranges)
	-	input types
		-	boolean indexing (e.g., d<3)
			-	how diff than filter?
			-	could use code generation to avoid fcn calls
	-	need to gracefully handle out of range/empty selections --> empty array? null?
		-	currently, return `null`
	- 	return a View!!!
		-	with head method, etc. See [link](http://pandas.pydata.org/pandas-docs/dev/comparison_with_sql.html#select)
	- 	option to return new (df/series)
	-	compute module --> toInteger( arr[, base] )
		-	dido for toFloat( arr )
38. set
	-	mult rows, mult cols (?)
39. groupby (?)
40. hist (?)
41. rank
42. is{Type} per element
43. skew
44. kurt
45. median
46. mean
	-	direction: columns
	-	opt for across rows (e.g., for timeseries)
	-	opt for accessor!
	-	range! --> see #37
		-	or workflow is to create a view and then compute the mean over that view
47. sum/nansum
48. min/nanmin
49. max/nanmax
50. mad
51. stdev
52. var
53. mod
54. mode
55. neq
56. sort
	- 	via axis
	-	rows/cols
57. freq ('axis')
	-	frequency table
	-	useful if df contains categorical data
	-	accessor!
	- 	how to distinguish between 1 and '1'? --> will resolve to same key!
58. swap rows or cols
59. toCSV
	-	should it end with a newline character?
	-	toCSV as a stream!
	-	need to acct for objects
60. toTSV
	-	should it end with a newline character?
	-	toTSV as a stream!
	-	need to acct for objects (toString, valueOf, isoString, stringify)
61. round (?)
62. floor (?)
63. ceil (?)
64. fromCSV/fromTSV/fromJSON helpers (?)
	-	would leave these to examples
	-	in the general case, hard to make these methods exact, as data may be stored with data ancillary to data frame data
65. merge
	-	from one data frame into another
66. fliplr
67. flipud
68. qtiles (?)
69. method to return row/col name indices
	-	{'beep': 5, 'boop': 1,...}
	-	useful for adding rows and columns, as may not know row/col order
	-	use hashes
70. dot
71. reorderRows
	-	names | indices (either all ints or all strings)
	- 	update rowname hash
72. reorderCols
	-	names | indices
	-	update colname hash
73. in README, note that DF is row-major
	-	underlying data structure assumes rows are most frequent query
74. circshift( n[, dim])
	-	rows/cols
	-	dim=1, rows (default)
	-	dim=2, cols
	-	update hash
75. issorted
76. joins (?)
	- 	see mat table
77. dedupe/unique (?)
78. df over indexeddb
79. custom builds
80. fillna (?)
81. reindex (?)
	-	what is this but addRows()/rownames(names) + reorderRows(order)?
82. Series
83. pop( name|index )
	-	return a series
84. memory of df
85. info
	-	column names
	-	column data type
	-	size
	-	dtypes
	-	
86. print
	-	condensed/truncated form for large dfs [link](http://pandas.pydata.org/pandas-docs/dev/dsintro.html#console-display)
	-	akin to head and tail
	-	ability to print selected rows/cols/names
	-	piggy back on `get`
87. delrows/delcols
	-	apply a unique to the `idx` `array` before marking rows/cols for deletion
	-	will have to set the "needs to be sorted" option
	-	is it worth the trouble?
		-	only in the case of many duplications
	-	see [compute-unique](https://github.com/compute-io/unique)
88. 




## Tests

1. head/tail output
2. 


## Notes

1. R vs Python
	-	R: fcns which operate on dfs
	-	Python: objs w methods
	- 	adv of R is modularity and only include what you need; e.g., if need to transpose, just use `dftranspose`; no need for other methods to be bound to the `df`
	-	adv of Python is well-defined interface
	-	adv of Python is that, because df is a well-defined entity, can take shortcuts and make assumptions abt data structure when writing algorithms (e.g., no need for always determining df size, as these values are bound to `this` context). No need to follow public API; can access internals as method is part of df, not something external to it.
2. 
