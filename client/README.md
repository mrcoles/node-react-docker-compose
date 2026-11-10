# Client

A React 19 app built with [Vite](https://vite.dev/). (It was originally bootstrapped with create-react-app; see the root README for what changed.)

- `index.html` is the entry point and loads `src/index.jsx`.
- `public/` holds files copied as-is into the build and served from `/`.
- `vite.config.js` configures the dev server (port 3000, `/api` proxied to the `server` container) and the build output (`build/`).

In dev, the `client` container runs the Vite dev server (`npm start`). In production, the root `Dockerfile` runs `npm run build` and the server container serves the static output from `client/build/`.
