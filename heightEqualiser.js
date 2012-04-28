/**
 * Javascript for equalising heights of containers.
 *
 * (c) 2012 Chris Collins.
 *
 * Requires jQuery (tested with v1.7.2).
 *
 * Documentation and usage available at https://github.com/chriscollins/height-equaliser
 */

/*global jQuery*/

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
                    var measureContainer = $this.find(target.measureSelector);
                    if (measureContainer) {
                        measureHeight = getIntegerValueFromCssProperty(measureContainer.css('height'));
                        maxHeight = Math.max(measureHeight, maxHeight);
                    }
                });

                return maxHeight;
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
                    newValue = 0;

                $.each(options.targets, function (index, target) {
                    measureContainer = $this.find(target.measureSelector);
                    measureHeight = getIntegerValueFromCssProperty(measureContainer.css('height'));
                    difference = maxHeight - measureHeight;

                    if (difference > 0) {
                        adjustContainer = $this.find(target.adjustSelector);
                        currentAdjustPropertyValue = getIntegerValueFromCssProperty(adjustContainer.css(target.adjustProperty));
                        newValue = (currentAdjustPropertyValue + difference) + 'px';
                        adjustContainer.css(target.adjustProperty, newValue);
                        //console.log('Added "' + difference + 'px" of "' + target.adjustProperty + '" to "' + target.adjustSelector + '" (new value "' + newValue + '").');
                    }
                });
            }

            init();
        });
    };

    // Plugin defaults.
    $.fn.heightEqualiser.defaults = {
    };

// End closure.
}(jQuery));
