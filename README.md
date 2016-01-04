psd-reader
==========

Read and display Adobe&reg; Photoshop&reg; PSD files directly in the web browser.

- Use PSD files as an image source for canvas or your app in general
- Convert PSD to PNG or JPEG directly in the browser ([convert to TIFF](https://github.com/epistemex/canvas-to-tiff), [convert to BMP](https://github.com/epistemex/canvas-to-bmp))

[![demo snapshot](http://i.imgur.com/yQ4Irq2.png)](https://epistemex.github.io/psd-reader/psddrop.html)


Features
--------

- Fast and lightweight
- Asynchronous and segment-based decoding (no UI-blocking)
- Reads all supported formats (Greyscale, Bitmap, Indexed, RGB, CMYK, DuoTone, TriTone, QuadTone, Multi-channel and Lab)
- Reads all color depths (1/8/16/32 bits)
- Handles alpha channel, and transparency for indexed mode
- De-matte (matte removal) processing of images with alpha-channel (eliminates "halo" problems)
- Supports RLE compressed and uncompressed image data
- By default, converts all formats to RGBA so it can be used directly with canvas
- Canvas helper method with optional scaling and high-quality down-sampling
- Optional gamma correction
- By default, auto-corrects display gamma for 32-bit color mode
- Access to the original channel bitmaps (decompressed if needed)
- Access to raw meta and header data
- Access to resource chunks (incl. ID locator method)
- Passive load mode allowing parsing to be invoked manually later
- Validates and performs error checks
- Works in all major browsers (Firefox, Chrome, IE, Opera, Safari).
- For client-side use
- An original parser implementation built from scratch.
- No dependencies


Documentation
-------------

The project is documented and is available as html in the `docs` folder

Tutorials and general information is included in the HTML docs.


Usage
-----

Create a new instance, pass in an URL (or an array buffer), and a callback:

    var psd = new PsdReader({url: "path/to/file.psd", onLoad: myCallback});

In your callback you can access the RGBA data:

    function myCallback(e) {
        var bitmap = this.rgba;
    }

To get a canvas version of the data:

    function myCallback(e) {
        var canvas = this.toCanvas();
        ...
    }

An already existing ArrayBuffer can be used instead of an URL:

    var psd = new PsdReader({buffer: psdArrayBuffer, onLoad: myCallback});

There is additional access to the original channel bitmap data in it's native
format (8-bit, 16-bit etc.). The header information can be accessed
through the info object:

    var width     = psd.info.width;
    var height    = psd.info.height;
    var depth     = psd.info.depth;
    var layers    = psd.info.chunks[3];		// the layers area
    
    var channel0  = psd.bitmaps[0];	        // in native format (but uncompressed)
    ...

A method to locate resources is included:

    var icc = psd.findResource(1039);       // find resource with resource ID
    

Requirements
------------

A browser with support for HTML5 Canvas and typed arrays.

There are no dependencies.


Compatibility
-------------

These are generally non-problematic, but something to have in mind:

- Does not intend to parse individual layers
- PSD files must be saved in (the default) compatibility mode (see html docs for details)
- ICC profiles are not parsed/applied (see docs for details)


License
-------

- Free to use for personal and non-commercial projects
- Purchased license required for any commercial use or relation (contact us).

*&copy; 2015-2016 Epistemex*

![Epistemex](http://i.imgur.com/wZSsyt8.png)
