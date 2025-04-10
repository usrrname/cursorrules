# cursorrules

[![NPM Publish](https://github.com/usrrname/cursorrules/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/usrrname/cursorrules/actions/workflows/npm-publish.yml)

A standard lib of rules for Cursor inspired by [@ghuntley](https://github.com/ghuntley)'s ["You are using Cursor AI incorrectly..."](https://ghuntley.com/stdlib/)

## Install

```bash
npx @usrrname/cursorrules
```
By default, the package will save files to `output/` in your current directory.

### Options
- `-h, --help`: Help instructions
- `-f, --flat`: Install without parent directory
- `-o, --output`: Set output directory # Default: ./output
- `-v, --version`: Show package version


## Running and testing locally

1. Install Verdaccio
```bash
npm install -g verdaccio
```

2. Run Verdaccio
```bash
verdaccio # --config config/verdaccio.yml to use the one in this repo
```

3. Set registry to local Verdaccio
```bash
npm config set registry http://localhost:4873/
npm set registry http://localhost:4873/
```

4. Build and publish
```bash
npm publish --registry http://localhost:4873/
```

5. Run
```bash
npx @usrrname/cursorrules
```

6. Remove test versions
```bash
npm unpublish --registry http://localhost:4873/ cursorrules
```
