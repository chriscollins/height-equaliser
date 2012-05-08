/**
 * QUnit tests for heightEqualiser.js
 */

/*global test, module, ok, $*/

(function () {

    'use strict';

    module('Main');
    test('Padding is applied to adjustSelector to equalise heights', function () {
        var column1 = $('#main .column1'),
            column2 = $('#main .column2'),
            column1Adjust = column1.find('ul.items .last'),
            column2Adjust = column2.find('.title'),
            initialPaddingAdjustColumn1 = column1Adjust.css('paddingBottom'),
            initialPaddingAdjustColumn2 = column2Adjust.css('paddingBottom'),
            wasColumn1Adjusted = false,
            wasColumn2Adjusted = false;

        ok(column1.css('height') !== column2.css('height')); // Ensure heights are initially different.

        $('#test-content').heightEqualiser({
            "targets": [
                {
                    "measureSelector": '#main .column1',
                    "adjustSelector": '#main .column1 ul.items .last',
                    "adjustProperty": 'paddingBottom'
                },
                {
                    "measureSelector": '#main .column2',
                    "adjustSelector": '#main .column2 .title',
                    "adjustProperty": 'paddingBottom'
                }
            ]
        });

        ok(column1.css('height') === column2.css('height')); // Heights should now match.

        wasColumn1Adjusted = column1Adjust.css('paddingBottom') !== initialPaddingAdjustColumn1;
        wasColumn2Adjusted = column2Adjust.css('paddingBottom') !== initialPaddingAdjustColumn2;

        ok((wasColumn1Adjusted && !wasColumn2Adjusted) || (!wasColumn1Adjusted && wasColumn2Adjusted)); // Padding was either applied to column1's adjustSelector, or column2's adjustSelector: Not both.
    });

    test('Initial values of padding are respected', function () {
        var column1 = $('#with-initial-padding .column1'),
            column2 = $('#with-initial-padding .column2'),
            column1Adjust = column1.find('ul.items .last'),
            column2Adjust = column2.find('.title'),
            initialPaddingAdjustColumn1 = column1Adjust.css('paddingBottom'),
            initialPaddingAdjustColumn2 = column2Adjust.css('paddingBottom'),
            wasColumn1Adjusted = false,
            wasColumn2Adjusted = false;

        ok(column1.css('height') !== column2.css('height')); // Ensure heights are initially different.

        $('#test-content').heightEqualiser({
            "targets": [
                {
                    "measureSelector": '#with-initial-padding .column1',
                    "adjustSelector": '#with-initial-padding .column1 ul.items .last',
                    "adjustProperty": 'paddingBottom'
                },
                {
                    "measureSelector": '#with-initial-padding .column2',
                    "adjustSelector": '#with-initial-padding .column2 .title',
                    "adjustProperty": 'paddingBottom'
                }
            ]
        });

        ok(column1.css('height') === column2.css('height')); // Heights should now match.

        wasColumn1Adjusted = column1Adjust.css('paddingBottom') !== initialPaddingAdjustColumn1;
        wasColumn2Adjusted = column2Adjust.css('paddingBottom') !== initialPaddingAdjustColumn2;

        ok((wasColumn1Adjusted && !wasColumn2Adjusted) || (!wasColumn1Adjusted && wasColumn2Adjusted)); // paddingBottom was either applied to column1's adjustSelector, or column2's adjustSelector: Not both.
    });

    test('Changing the adjust property changes the CSS property that is applied', function () {
        var column1 = $('#border-test .column1'),
            column2 = $('#border-test .column2'),
            column1Adjust = column1.find('ul.items .last'),
            column2Adjust = column2.find('.title'),
            initialPaddingAdjustColumn1 = column1Adjust.css('paddingBottom'),
            initialPaddingAdjustColumn2 = column2Adjust.css('paddingBottom'),
            initialBorderAdjustColumn1 = column1Adjust.css('borderBottomWidth'),
            initialBorderAdjustColumn2 = column2Adjust.css('borderBottomWidth'),
            wasColumn1Adjusted = false,
            wasColumn2Adjusted = false;

        ok(column1.css('height') !== column2.css('height')); // Ensure heights are initially different.

        $('#test-content').heightEqualiser({
            "targets": [
                {
                    "measureSelector": '#border-test .column1',
                    "adjustSelector": '#border-test .column1 ul.items .last',
                    "adjustProperty": 'borderBottomWidth'
                },
                {
                    "measureSelector": '#border-test .column2',
                    "adjustSelector": '#border-test .column2 .title',
                    "adjustProperty": 'borderBottomWidth'
                }
            ]
        });

        ok(column1.css('height') === column2.css('height')); // Heights should now match.

        // Padding should be unchanged.
        ok(column1Adjust.css('paddingBottom') === initialPaddingAdjustColumn1);
        ok(column2Adjust.css('paddingBottom') === initialPaddingAdjustColumn2);

        wasColumn1Adjusted = column1Adjust.css('borderBottomWidth') !== initialBorderAdjustColumn1;
        wasColumn2Adjusted = column2Adjust.css('borderBottomWidth') !== initialBorderAdjustColumn2;

        ok((wasColumn1Adjusted && !wasColumn2Adjusted) || (!wasColumn1Adjusted && wasColumn2Adjusted)); // borderBottomWidth was either applied to column1's adjustSelector, or column2's adjustSelector: Not both.
    });

    module('Error handling');
    test('Error is not thrown if a measureSelector does not exist', function () {
        $('#test-content').heightEqualiser({
            "targets": [
                {
                    "measureSelector": '#main .column1',
                    "adjustSelector": '#main .column1 ul.items .last',
                    "adjustProperty": 'paddingBottom'
                },
                {
                    "measureSelector": '#element-does-not-exist .column2',
                    "adjustSelector": '#main .column2 .title',
                    "adjustProperty": 'paddingBottom'
                }
            ]
        });

        ok(true); // If we get here, it didn't cause an error.
    });

    test('Error is not thrown if an adjustSelector does not exist', function () {
        $('#test-content').heightEqualiser({
            "targets": [
                {
                    "measureSelector": '#main .column1',
                    "adjustSelector": '#element-does-not-exist .column1 ul.items .last',
                    "adjustProperty": 'paddingBottom'
                },
                {
                    "measureSelector": '#main .column2',
                    "adjustSelector": '#element-does-not-exist .column2 .title',
                    "adjustProperty": 'paddingBottom'
                }
            ]
        });

        ok(true); // If we get here, it didn't cause an error.
    });

    test('defaultAdjustProperty is used if not specified', function () {
        var column1 = $('#default-adjust-property-test .column1'),
            column2 = $('#default-adjust-property-test .column2'),
            column1Adjust = column1.find('ul.items .last'),
            column2Adjust = column2.find('.title'),
            initialHeightAdjustColumn1 = column1Adjust.css('height'),
            initialHeightAdjustColumn2 = column2Adjust.css('height'),
            initialPaddingAdjustColumn1 = column1Adjust.css('paddingBottom'),
            initialPaddingAdjustColumn2 = column2Adjust.css('paddingBottom'),
            wasColumn1Adjusted = false,
            wasColumn2Adjusted = false;

        ok(column1.css('height') !== column2.css('height')); // Ensure heights are initially different.

        $('#test-content').heightEqualiser({
            "targets": [
                {
                    "measureSelector": '#default-adjust-property-test .column1',
                    "adjustSelector": '#default-adjust-property-test .column1 ul.items .last'
                },
                {
                    "measureSelector": '#default-adjust-property-test .column2',
                    "adjustSelector": '#default-adjust-property-test .column2 .title'
                }
            ]
        });

        ok(column1.css('height') === column2.css('height')); // Heights should now match.

        // Padding should be unchanged.
        ok(column1Adjust.css('paddingBottom') === initialPaddingAdjustColumn1);
        ok(column2Adjust.css('paddingBottom') === initialPaddingAdjustColumn2);

        wasColumn1Adjusted = column1Adjust.css('height') !== initialHeightAdjustColumn1;
        wasColumn2Adjusted = column2Adjust.css('height') !== initialHeightAdjustColumn2;

        ok((wasColumn1Adjusted && !wasColumn2Adjusted) || (!wasColumn1Adjusted && wasColumn2Adjusted)); // Padding was either applied to column1's adjustSelector, or column2's adjustSelector: Not both.
    });

}());