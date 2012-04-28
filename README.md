Height Equaliser
================

Javascript for equalising heights of multiple containers.

[https://github.com/chriscollins/height-equaliser](https://github.com/chriscollins/height-equaliser)

Requires [jQuery](http://jquery.com) (tested with v1.7.2).

Usage
-----

`$('.some-container').heightEqualiser(config);`

`config` is an object of the format:

    {
      "targets": [
            {
                "measureSelector": '.jquery-selector-of-an-item-to-measure',
                "adjustSelector": '.jquery-selector-of-an-item-to-adjust',
                "adjustProperty": 'Javascript CSS property'
            },
            // More target specifications...
       ]
    }

* `measureSelector` `{string}` A jQuery selector.  The height of this container will be measured and compared to the other measureSelectors specified.

* `adjustSelector` `{string}` A jQuery selector.  This is the container that will have its CSS properties adjusted when heights are equalised.  It will most likely be a child of `measureSelector`, but this is not enforced.

* `adjustProperty` `{string}` A CSS property.  The CSS property that will be adjusted on `adjustSelector` to equalise heights.  Typically one of the following values: `height, marginTop, marginBottom, paddingTop, paddingBottom, borderTopWidth, borderBottomWidth`.

------------------------------------

Example
-------

The following example will attempt to make `#column1` and `#column2` the same height.  It will do this by adjusting the `paddingBottom` on `#column1 ul.items .last` or adjusting `marginBottom` on `#column2 .title`.  All of these containers need to live inside `#parent-container`.

__HTML:__

    <div id="parent-container">
        <div id="column1">
            <ul class="items">
                <li>Item 1</li>
                <li>Item 2</li>
                <li class="last">Item 3</li>
            </ul>
        </div>
        <div id="column2">
            <h1 class="title">Title</h1>
        </div>
    </div>

__JavaScript:__

    $('#parent-container').heightEqualiser({
        "targets": [
            {
                "measureSelector": '#column1',
                "adjustSelector": '#column1 ul.items .last',
                "adjustProperty": 'paddingBottom'
            },
            {
                "measureSelector": '#column2',
                "adjustSelector": '#column2 .title',
                "adjustProperty": 'marginBottom'
            }
        ]
    });

This plugin works for as many containers as you like, i.e. you are not restricted to equalising the height of only two containers: Just specify more elements in the `targets` array.
