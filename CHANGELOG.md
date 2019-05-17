CURRENT
-------

* entry.js: `createMapInternal` signature has changed to
`createMapInternal(target, args, defaults)` where args are the user
provided arguments and defaults is a default value object for the config
files `client`, `layer`, `translations`, `styleMap` (styleMap is optional)
* BBOX Strategy: Parameters `{bboxleft}`, `{bboxbottom}` `{bboxright}`,
`{bboxtop}` are replaced by `{minx}`, `{miny}`, `{maxx}`, `{maxy}`
* Layer Config: New Syntax is printed in Developer Console each time old
syntax is used
* API: new APIs accessible at map.api.*
* G4UMap: the configs are passed in as an object now. `createMap(target,
{ client: 'path/to/conf.json', layer: 'path/to/other.json' }, options)`  
        You can use an empty object if you want to pass only options.
* G4UMap: the options now need to be an object. An array of modules can
be passed in via an options object like this: `{ modules: modulesArray }`
* L10N: the languageFile option in the client config is removed. Either
remove the option if you want to use the default values or pass it via
the configs object to createMap (`createMap(target,
{ translations: 'path/to/l10n.json' })`). 