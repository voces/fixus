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
  - `fixus.w3x`: The base map. Contains map settings, objects, and other data, but not any code. **This should be the map opened in the World Editor**.
- `src`: All the custom source code used in the map.
- `scripts`: Contains scripts to simplify development.

In order to build `dist/fixus.w3x`, run `npm run build`. If you want to test sandbox (as Red), you can also run `npm start`.

## Contributing
Anyone is welcome to contribute; just open a pull request and I'll review it. I strongly recommend joining the Discord, though, and discussing ideas first before doing any work! Please make sure tests are passing by running `npm test`.
