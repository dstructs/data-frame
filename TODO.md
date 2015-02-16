TODO
====

1. see R/python
2. enforce type (?)
	- 	data type; e.g., string, integers, float32, etc; see ndarray
	-	dtype
		- 	infer
		- 	assume numeric
		-	if non-numeric, certain methods should be off-limits; e.g., stats
3. method should accept `arrays` and other data frames
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
	- 	JSON blob with `rownames`, `colnames`, and `data` properties
7. add/remove row (+rowname)
	-	if can specify index, then have `insert`; see below
	-	if no name, then use index
8. add/remove column (+colname)
	-	if no name, then use index
9. update row/colname
10. 
11. a data frame view (akin to go slice)	-	method which returns a new `View` instance
	-	`new View( [i,j], [i,j] )`
12. copy (?)
	-	similar to toString and view, but a full duplication.
13. transpose
	-	rows and columns
14. abs
15. add
	-	if df, ensure matching dims
	-	scalar
16. subtract
	-	if df, ensure matching dims
	- 	scalar
17. mult
18. div
19. all (option to specify 'axis')
20. any (opt to specify 'axis')
21. apply/map (opt to specify 'axis')
22. find (opt to specify 'axis')
	-	ability to threshold values
23. filter
	-	rows/cols matching criteria
24. corr
	-	if arg, another DF (ensure matching dims)
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
36. tail
37. get
	-	mult rows, mult cols
38. set
	-	mult rows, mult cols (?)
39. groupby (?)
40. hist (?)
41. insert col/row
42. is{Type} per element
43. skew
44. kurt
45. median
46. mean
47. sum
48. min
49. max
50. mad
51. stdev
52. var
53. mod
54. mode
55. neq
56. sort
	- 	via axis
57. freq ('axis')
	-	frequency table
	-	useful if df contains categorical data
58. swap rows or cols
59. toCSV
60. toTSV
61. round (?)
62. floor (?)
63. ceil (?)
64. 