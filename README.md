# ![Guide4You](https://github.com/KlausBenndorf/guide4you/raw/master/images/g4u-logo.png) guide4you

[![Greenkeeper badge](https://badges.greenkeeper.io/KlausBenndorf/guide4you.svg)](https://greenkeeper.io/)

[![NPM](https://nodei.co/npm/guide4you.png?mini=true)](https://npmjs.org/package/guide4you)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Continuous Integration](https://travis-ci.org/KlausBenndorf/guide4you.svg?branch=master)](https://travis-ci.org/KlausBenndorf/guide4you)
[![Documentation Coverage](http://klausbenndorf.github.io/guide4you/badge.svg)](http://klausbenndorf.github.io/guide4you/index.html)

**GUIDE4YOU** is a JavaScript Web client application built on [OpenLayers](http://openlayers.org)
that supports both desktop and mobile web browsers and features a responsive design.

![Screenshot of desktop view, 736x467 pixel](https://github.com/KlausBenndorf/guide4you/raw/master/images/screenshots/desktop-736-467.png "Screenshot of desktop view, 736x467 pixel")

For a screenshot of the mobile view [see below](#mobile-screenshot).

## What can GUIDE4YOU do for you?

With the basic system **GUIDE4YOU** can:

* Display maps like [Openstreetmap](https://openstreetmap.org), [OpenTopoMap](https://opentopomap.org), or [OpenCycleMap](http://www.thunderforest.com/maps/opencyclemap/)
* Use OSM, WMS, WFS, KML, GPX (others follow)
* Measure areas and distances
* Display your location
* Print the current view on a single page
* Overlay a base map with points of interest and the like
* Configure a set of base maps and overlays to choose from
* Allow for different languages
* &hellip;

With additional modules it can also:

* [URLAPI module](https://github.com/KlausBenndorf/guide4you-module-urlapi): Generate links so you can share a certain view of a map. That view can include a location marker and a description of the location in question.
* [Search module](https://github.com/KlausBenndorf/guide4you-module-search): Search for locations using [Nominatim](https://nominatim.openstreetmap.org/). Alternatively you can customize this module to use other engines.
* Edit GPX data (coming soon)
* &hellip;

## Why use GUIDE4YOU?

Compared to alternative software **GUIDE4YOU** provides a couple of interesting features:

* Highly customizable
* Support for new languages can easily be added. English, german, polish and arabic are supported out of the box.
* Icons are vector graphics (SVG) so they can be scaled to whatever size seems suitable
* No separate mobile and desktop versions
* Easily extensible

## Which browsers are supported?

All modern browsers including
* Firefox
* Chrome
* Edge and Internet Explorer 10+
* Safari

## How to setup?

Install guide4you from npm or clone the repository

```
npm install guide4you
```
or
```
git clone https://github.com/KlausBenndorf/guide4you.git
```

To find out what is needed to include GUIDE4YOU intoe a webpage check out the index.html in the dist folder. It contains everything that is needed to get you started.

The crucial part is:
```
  g4u.createMap('#g4u-map')
```
This method creates the map in the given DOM-Element. It accepts a selector or a reference to a DOM-Element. As a second and third argument it accepts a [map configuration](https://klausbenndorf.github.io/guide4you/typedef/index.html#static-typedef-MapConfig) and a [layer configuration](https://klausbenndorf.github.io/guide4you/typedef/index.html#static-typedef-LayerConfig). Both can be provided as paths to JSON-files or as actual JavaScript objects.

## How to build a customized version of GUIDE4YOU?

Switch into the `guide4you` directory and install all dependecies using

```
npm install
```

Then build with a configuration (simple, full) of your choice

```
npm run prod:simple
```
or

```
npm run debug:simple
```
or with a local webserver watching file changes on port 8080

```
npm run dev:simple
```

## Documentation

An API-documentation can be found here: [https://klausbenndorf.github.io/guide4you/index.html](https://klausbenndorf.github.io/guide4you/index.html).

Part of the API-documentation is a documentation of the [map configuration](https://klausbenndorf.github.io/guide4you/typedef/index.html#static-typedef-MapConfig)
and [layer configuration](https://klausbenndorf.github.io/guide4you/typedef/index.html#static-typedef-LayerConfig) JSON-objects.

(A german not up-to-date documentation can be found here: [GUIDE4YOU Benutzerhandbuch](https://github.com/KlausBenndorf/guide4you/wiki/GUIDE4YOU-Benutzerhandbuch))

## Support

Please feel free to ask any question on [Stackoverflow](https://stackoverflow.com) with the guide4you tag and file any bugs in the [issue tracker](https://github.com/KlausBenndorf/guide4you/issues).

## <a name="mobile-screenshot"></a>Mobile Screenshot

![Screenshot of mobile view, 360x640 pixel](https://github.com/KlausBenndorf/guide4you/raw/master/images/screenshots/mobile-360-640.png "Screenshot of mobile view, 360x640 pixel")
