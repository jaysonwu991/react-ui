# Bundle Size & Optimization

`@jayson991/react-ui` ships a single-entry ESM/CJS build. This guide covers what is emitted and how to keep your application bundle small.

## Build Output

From `pnpm build`:

| File              | Raw      | Gzipped | Notes                       |
| ----------------- | -------- | ------- | --------------------------- |
| `index.js` (ESM)  | 35.2 kB  | 10.5 kB | Main entry                  |
| `index.cjs` (CJS) | 31.4 kB  | 10.2 kB | Main entry                  |
| `react-ui.css`    | 52.4 kB  | 18.1 kB | All component styles        |
| `iconfont-*.js`   | ~18.1 kB | ~7.2 kB | Lazy SVG symbol chunk       |
| `index.d.ts`      | 225 B    | —       | Rolled-up type declarations |

React and React DOM are external and are never bundled.

## Importing Components

Import from the package root:

```tsx
import { Button, Calendar } from '@jayson991/react-ui';
```

Because the build is ESM, bundlers can drop unused component code. The package also declares its CSS as side effects, so a component's styles are retained only when that component is imported.

### Subpath Imports

The package exposes only two entry points: the package root and `./styles`. Import components from the root:

```tsx
import { Button, Calendar } from '@jayson991/react-ui';
```

Or load the compiled stylesheet directly if you manage CSS yourself:

```tsx
import '@jayson991/react-ui/styles';
```

## Icons

Icon assets are not part of the main entry. Load them once when needed:

```tsx
import { loadIconFont, loadIconSvg, loadAllIcons } from '@jayson991/react-ui';

loadIconFont(); // icon font CSS (for type="font")
loadIconSvg(); // SVG symbol definitions (for type="svg")
loadAllIcons(); // both
```

The loaders are idempotent. The SVG symbols are emitted as a separate lazy chunk; the icon font CSS is included in `react-ui.css`.

## `sideEffects`

The package declares its side effects so bundlers do not drop required styles:

```json
{
	"sideEffects": [
		"*.scss",
		"*.css",
		"./src/assets/icons/iconfont.js",
		"./lib/**/*.css"
	]
}
```

## Analyzing Your Bundle

To confirm tree-shaking in your own app, add a bundle visualizer for your bundler:

```bash
# Vite / Rollup
pnpm add -D rollup-plugin-visualizer

# Webpack
pnpm add -D webpack-bundle-analyzer
```

## Tips

1. Import components from the package root and let your bundler tree-shake.
2. Lazy-load heavy components (for example, Calendar) with `React.lazy`.
3. Load icon assets only when an `Icon` is actually used.
4. Minify and gzip/brotli your production build.

## See Also

- [Webpack tree shaking](https://webpack.js.org/guides/tree-shaking/)
- [Vite code splitting](https://vitejs.dev/guide/features.html#code-splitting)
