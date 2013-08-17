jquery.tableSortFilter
======================

jQuery tableSortFilter is a minimal plugin to make your html tables sortable and filterable.

It uses no styling, so it will apply these features to your own formats and styles. 

The Filter or Search will search the displayed text of every cell in the table and filter the rows as you type.

Installation
------------

Just include this script after jQuery

``` html
<script src='jquery.js'></script>
<script src='jquery.tableSortFilter.js'></script>
```

The Table
---------
There are a few requirements of the table:

* The Header Row **must** be in a `<thead>` tag
* Each Column Header **must** be in a `<th>` tag
* The All content rows **must** be in a `<tbody>` tag
* There **must** be equal number of `<td>` tags in each row as there are `<th>` rows in the header
* Table has to have `id=` defined. 

Initialization
--------------
To set a search field and table to be dynamicaly filterable and sortable, call `$.tableSortFilter()` at the bottom:

``` html
<script>
    $.tableSortFilter({
      table_selector:"#table_id",
      search_selector:"search_input_id",
      non_sort_class: "css_class_for_neutral_icon",
      ascending_sort_class: "css_class_for_ascending_icon",
      descending_sort_class: "css_class_for_descending_icon"
    });
</script>
```

Options
-------

<table>
  <tr><th>Option</th><th>Description</th><th>Example using Bootstrap3</th></tr>
  <tr><td>table_selector</td><td>The jQuery Selector for the table to be sorted</td><td>"#table"</td></tr>
  <tr><td>search_selector</td><td>The jQuery Selector for the input to filter by</td><td>"#search"</td></tr>
  <tr><td>non_sort_class</td><td>The css class to be used on non sorted columns</td><td>"glyphicon glyphicon-resize-vertical"</td></tr>
  <tr><td>ascending_sort_class</td><td>The css class to be used the column when sorted ascending</td><td>"glyphicon glyphicon-arrow-up"</td></tr>
  <tr><td>ascending_sort_class</td><td>The css class to be used the column when sorted descending</td><td>"glyphicon glyphicon-arrow-down"</td></tr>
</table>

Demo Using Bootstrap3
---------------------
[Demo] (http://mc706.github.io/jquery.tableSortFilter/index.html
