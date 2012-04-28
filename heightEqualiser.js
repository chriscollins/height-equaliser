/**
 * Javascript for equalising heights of containers.
 *
 * Requires jQuery (tested with v1.7.2).
 *
 * Documentation and usage available at https://github.com/chriscollins/height-equaliser
 */

/*global jQuery, console*/

// Closure.
(function ($) {

    'use strict';

    $.fn.heightEqualiser = function (passedOptions) {
        return this.each(function () {
            var $this = $(this),
                options = $.extend({}, $.fn.heightEqualiser.defaults, passedOptions);


            /**
             * Get an integer value from a CSS property e.g. '11px' would return 11.
             *
             * @param {string} value The value of the property.
             *
             * @return int The integer value.
             */
            function getIntegerValueFromCssProperty(value) {
                return parseInt(value.match(/\d+/), 10);
            }

            /**
             * Get the container with the maximal height.
             *
             * @return int The maximal height.
             */
            function getMaxHeight() {
                var maxHeight = 0,
                    measureHeight = 0,
                    measureContainer = null;

                $.each(options.targets, function (index, target) {
                    measureContainer = $this.find(target.measureSelector);
                    if (measureContainer.length > 0) {
                        measureContainer.each(function () {
                            measureHeight = getIntegerValueFromCssProperty($(this).css('height'));
                            maxHeight = Math.max(measureHeight, maxHeight);
                        });
                    }
                });
                //console.log('Maximum height is "' + maxHeight + 'px.');

                return maxHeight;
            }

            /**
             * Get the name of the CSS property to adjust for the target passed in.  Falls back to options.defaultAdjustProperty if not specified.
             *
             * @param  {Object} target The target to get the adjustProperty for.
             *
             * @return {string} The name of the CSS property to adjust for the target passed in.
             */
            function getAdjustProperty(target) {
                var adjustProperty = options.defaultAdjustProperty;

                if (target.adjustProperty !== undefined) {
                    adjustProperty = target.adjustProperty;
                }

                return adjustProperty;
            }

            /**
             * Initialisation.
             */
            function init() {
                var maxHeight = getMaxHeight(),
                    measureContainer = null,
                    measureHeight = 0,
                    difference = 0,
                    adjustContainer = null,
                    currentAdjustPropertyValue = 0,
                    newValue = 0,
                    adjustProperty = '';

                $.each(options.targets, function (index, target) {
                    measureContainer = $this.find(target.measureSelector);
                    if (measureContainer.length > 0) {
                        measureContainer.each(function () {
                            measureHeight = getIntegerValueFromCssProperty($(this).css('height'));
                            difference = maxHeight - measureHeight;

                            if (difference > 0) {
                                adjustContainer = $this.find(target.adjustSelector);
                                adjustProperty = getAdjustProperty(target);
                                currentAdjustPropertyValue = getIntegerValueFromCssProperty(adjustContainer.css(adjustProperty));
                                newValue = (currentAdjustPropertyValue + difference) + 'px';
                                adjustContainer.css(adjustProperty, newValue);
                                //console.log('Added "' + difference + 'px" of "' + adjustProperty + '" to "' + target.adjustSelector + '" (new value "' + newValue + '").');
                            }
                        });
                    }
                });
            }

            init();
        });
    };

    // Plugin defaults.
    $.fn.heightEqualiser.defaults = {
        "defaultAdjustProperty": 'height' // The CSS property to adjust by default.
    };

// End closure.
}(jQuery));
