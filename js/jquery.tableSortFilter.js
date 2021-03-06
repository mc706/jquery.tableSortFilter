/*
tableSortFilter is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
created by: Ryan McDevitt http://mc706.com
*/
/*
Table must have thead and tbody elements, and an equal amount of th elemnts in thead as td elements in body
 */
/**
 * table_selector               - jquery selector for the table you wish to sort (ie "#table1")
 * search_selector              - jquery selector for the search field you wish to filter with (ie "#search")
 * filter_icon_element          - name of tag to be used for the icon (ie "span", "i"))
 * non_sort_class               - classname for icon for columns not being sorted by
 *                                                                      (ie bootstrap 2: "icon icon-resize-vertical")
 * ascending_sort_class:        - classname for icon for column being sorted ascendning by:
 *                                                                      (ie bootstrap 2: "icon icon-arrow-up")
 * descending_sort_class:       - classname for icon for column being sorted ascendning by:
 *                                                                      (ie bootstrap 2: "icon icon-arrow-up")
 * debug                        - dumps all variables to console.log()
 */
(function ($, undefined) {
    $.tableSortFilter = function (opt) {

        var options = $.extend({
            table_selector: null,
            search_selector: null,
            filter_icon_element: null,
            non_sort_class: null,
            ascending_sort_class: null,
            descending_sort_class: null,
            debug: false
        }, opt);
        var local = {
            columns: [],
            table: {},
            sortkey: "",
            html_table: {}
        };

        function setupSortFilter() {
            $(options.table_selector + ' thead th').each(function () {
                local.columns.push($(this).text());
                $(this).append("<"+options.filter_icon_element+" class='sorter " + options.non_sort_class + "' style='float:right;'></i>");
            });
            if (options.debug){console.log(local.columns);}
            $(options.table_selector + ' tbody tr').each(function (index, element) {
                local.table[index] = {};
                local.html_table[index] = $(this).clone();
                $(this).children('td').each(function (i, element) {
                    local.table[index][local.columns[i]] = $(this).text();
                });
            });
            if (options.debug){console.log(local.table);}
            if (options.debug){console.log(local.html_table);}
            $(options.search_selector).keyup(function () {
                search();
            });
            $('.sorter').click(function () {
                $('.sorter').attr('class', 'sorter ' + options.non_sort_class); //resents all icons
                var new_sort = $(this).parent().text();
                if (local.sortkey == new_sort) {
                    local.sortkey = "-" + local.sortkey;
                    $(this).removeClass(options.non_sort_class).addClass(options.descending_sort_class);
                } else {
                    local.sortkey = new_sort;
                    $(this).removeClass(options.non_sort_class).addClass(options.ascending_sort_class);
                }
                search();
            });
        }

        function search() {
            var keyword = $(options.search_selector).val().toLowerCase();
            var output = {};
            $.each(local.table, function (row) {
                $.each(local.columns, function (i, key) {
                    if (local.table[row][key].toLowerCase().indexOf(keyword) !== -1) {
                        output[row] = local.table[row];
                    }
                });
            });
            if (keyword === "") {
                output = local.table;
            }
            if (options.debug){console.log(output);}
            sort(output);
        }

        function sort(table) {
            var reverse = false;
            var sorted = [];
            var order = [];
            if (local.sortkey == ""){
                local.sortkey = local.columns[0];
            }
            var keyword = local.sortkey;
            if (options.debug){console.log(keyword);}
            if (local.sortkey.indexOf("-") !== -1) {
                keyword = local.sortkey.replace('-', '');
                reverse = true;
            }
            $.each(table, function (row) {
                sorted.push({
                    'row': row,
                    'value': table[row][keyword].toLowerCase()
                });
            });
            sorted.sort(function (a, b) {
                if (a.value < b.value) {
                    return -1;
                }
                if (a.value > b.value) {
                    return 1;
                }
                return 0;
            });
            if (reverse) {
                sorted.reverse();
            }
            $.each(sorted, function (key, value) {
                order.push(value.row);
            });
            redraw(table, order);
        }

        function redraw(table, order) {
            $(options.table_selector + ' tbody').empty();
            $.each(order, function (n, row) {
                local.html_table[row].appendTo(options.table_selector + ' tbody');
            });

        }

        setupSortFilter();
    };
})(jQuery);
