# Ultimate Sheep Tag Fixus

The classic Warcraft 3 map.

[![tests](https://github.com/voces/fixus/workflows/test/badge.svg)](https://github.com/voces/fixus/actions?query=workflow%3Atest)
[![Discord](https://img.shields.io/discord/232301193718661121)](https://discord.gg/Y4dHvwX)

[Change log](CHANGELOG.md)

## Development
This is a TypeScript map. This means that while object editing, terraining, and most other parts of editing the map still occurs in the World Editor, the custom code is written in TypeScript and transpiled to Lua. The relevant directories are:
- `dist`
  - `fixus.w3x`: The built map. Contains all required information (map settings, objects, Lua code).
- `maps`
  - `fixus.w3x`: The base map. Contains map settings, objects, and other data, but not any code. This should be the map opened in the World Edtior.
- `src`: All the custom source code used in the map.
  - `war3map.d.ts`: A file generated by `war3map.d.ts`. This would only need to be run if regions are modified. This is done by running `npm run dev`.

In order to build `dist/fixus.w3x`, run `npm run build`. If you want to test sandbox (as Red), you can also run `npm run start`.

To distribute the map, you must build an actual `.w3x` file. I typically do this by opening `dist/fixus.w3x` in the World Editor (via dragging the folder over it) and Saving as. This will generate a file without source code, though, so you must re-import `dist/fixus.w3x/war3map.lua` by using an [MPQ Editor](http://www.zezula.net/en/mpq/download.html).

## Contributing
Anyone is welcome to contribute; just open a pull request and I'll review it. I strongly recommend joining the Discord, though, and discussing ideas first before doing any work! Please make sure tests are passing by running `npm run jest`.
