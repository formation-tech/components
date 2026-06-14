# @formation.tech/components

[![npm version](https://img.shields.io/npm/v/@formation-tech/components.svg)](https://www.npmjs.com/package/@formation-tech/components)
[![CI](https://github.com/formation-tech/components/actions/workflows/ci.yml/badge.svg)](https://github.com/formation-tech/components/actions/workflows/ci.yml)

[formation.tech](https://formation.tech) web components built with [Lit](https://lit.dev). Each component can be used as a native HTML element or via a React wrapper.

## Installation

```bash
npm install @formation.tech/components lit
```

For the React entry point:

```bash
npm install @lit/react react
```

## Components

### `<ft-owl-logo>`

Animated owl logo: blinking eyes, mouse tracking, spinning eyes while loading.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `number` | `38` | Width in pixels |
| `height` | `number` | auto | Height in pixels (computed from aspect ratio if omitted) |
| `label` | `string` | `formation.tech` | Accessible label (`aria-label`) |
| `loading` | `boolean` | `false` | Loops eye rotation animation |

## Usage

### Web component (HTML, Astro, etc.)

```html
<script type="module">
  import '@formation-tech/components/ft-owl-logo'
</script>

<ft-owl-logo width="38"></ft-owl-logo>
<ft-owl-logo width="120" loading></ft-owl-logo>
```

### Astro

```astro
---
import '@formation-tech/components/ft-owl-logo'
---

<ft-owl-logo width={38} />
```

With SSR, the component hydrates on the client. Mouse tracking starts when the element connects to the DOM.

### React

```tsx
import { FtOwlLogo } from '@formation-tech/components/react'

export function Header() {
  return (
    <>
      <FtOwlLogo width={38} />
      <FtOwlLogo width={120} loading />
    </>
  )
}
```

## Entry points

| Import | Description |
|--------|-------------|
| `@formation-tech/components` | Barrel (exports Lit classes) |
| `@formation-tech/components/ft-owl-logo` | Web component only |
| `@formation-tech/components/react` | React wrappers |
| `@formation-tech/components/react/ft-owl-logo` | React wrapper for the logo |

## Development

```bash
npm install
npm run dev        # local demo (demo/)
npm run build      # build the library into dist/
npm run typecheck
```

## Publishing

### Manual

```bash
npm run build
npm pack --dry-run   # inspect tarball contents
npm publish --access public
```

### GitHub Actions

Pushing a `v*` tag (e.g. `v1.0.0`) triggers an automatic publish.

Prerequisite: add an `NPM_TOKEN` secret in the GitHub repo settings (npm token with publish access).

## License

[MIT](./LICENSE)
