# @nasumilu/parcel-locator

This is a very simple project which used [Parcel][1], [Yarn][2], [Sass][3], [OpenLayers][4], 
[Stimulus][5], and [Bootstrap][6] to present a webmap and an input control intended to geocodes
an address and locate the intersecting parcel within Alachua County.

Project uses [TypeScript][7]!

## Install

```sh
$ git clone git@github.com:nasumilu/parcel-locator.git
$ cd parcel-locator
$ yarn install
$ yarn parcel
Server running at http://localhost:1234
✨ Built in 6.40s
```
Next open a browser and point it to [http://localhost:1234](http://localhost:1234)


or just build the project

```sh
$ git clone git@github.com:nasumilu/parcel-locator.git
$ cd parcel-locator
$ yarn install
$ yarn build
✨ Built in 539ms

dist/index.html              1.07 KB    774ms
dist/index.0985d9f0.css    159.96 KB    225ms
dist/index.617871e8.js     391.97 KB    5.84s
dist/index.532dc626.js     367.92 KB    4.97s
```

## More

[Web Feature Service (WFS) used in this project](./docs/wfs.md)


[1]: https://parceljs.org/
[2]: https://yarnpkg.com/
[3]: https://sass-lang.com/
[4]: https://openlayers.org/
[5]: https://stimulus.hotwired.dev/
[6]: https://getbootstrap.com/
[7]: https://www.typescriptlang.org/