# Ultimate Sheep Tag Fixus

The classic Warcraft 3 map.

[![tests](https://github.com/voces/fixus/workflows/test/badge.svg)](https://github.com/voces/fixus/actions?query=workflow%3Atest)
[![Discord](https://img.shields.io/discord/232301193718661121)](https://discord.gg/Y4dHvwX)

[Change log](docs/CHANGELOG.md)

## Development

This is a TypeScript map. Object editing, terraining, and other World Editor data still live in the `.w3x`; the custom
code is written in TypeScript and transpiled to Lua via [typescript-to-lua](https://typescripttolua.github.io/). Layout:

- `map.w3x` — base map opened in the World Editor (settings, objects, terrain — no custom code).
- `src` — TypeScript source for the map's custom logic.
- `scripts` — Deno scripts that drive the build.
- `temp` — build outputs (`out.lua`, `combined.lua`, `release.w3x`, `<map name>.w3x`).

### Requirements

- [Deno](https://deno.land/) 2.x.

### Build

```sh
deno task build
```

Compiles `src/**/*.ts` to a single `temp/out.lua`, concatenates it with `map.w3x/war3map.lua`, and packs the result into
`temp/release.w3x` (and `temp/<map name>.w3x`).

### Test

```sh
deno task test
```

### Lint / format

```sh
deno task lint
deno task fmt
```

## Contributing

Anyone is welcome to contribute; just open a pull request and I'll review it. I strongly recommend joining the Discord
and discussing ideas first before doing any work. Please make sure tests pass with `deno task test`.
