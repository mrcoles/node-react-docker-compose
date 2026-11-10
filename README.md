# Node + Vite React App + Docker Compose

A project that runs a Node (Express) server and a Vite React app via two separate containers, using Docker Compose.

## What changed in v0.3.0

This repo was originally built on create-react-app and Node 12. It has since been modernized:

- **Vite instead of create-react-app.** `react-scripts` is gone. The dev server, `/api` proxy, and build output live in `client/vite.config.js`, and `index.html` moved from `client/public/` to `client/` (Vite's entry point). `client/public/` still holds files copied as-is into the build (favicon, manifest).
- **React 19.** Rendering uses `createRoot` from `react-dom/client`.
- **`.jsx` extensions.** Files containing JSX must end in `.jsx` (Vite won't parse JSX in `.js`).
- **No service worker or CRA test stub.** `registerServiceWorker.js` and `App.test.js` were removed.
- **Sass is compiled by Vite.** Import `.scss` files directly from components; no separate watch step or restart is needed for new files.
- **Express 5.** The catch-all route that returns the React app uses Express 5 path syntax (`'{/*splat}'`); a bare `'*'` no longer works.
- **Node 26** in every image (was Node 12 for the dev containers and Node 9 for the production build). Dockerfiles use `npm ci`.
- **No file polling by default.** Native file-change events now cross Docker bind mounts on macOS, so `CHOKIDAR_USEPOLLING` was removed (see [File watching](#file-watching) if reloads don't fire).
- **Docker Compose v2.** Commands are `docker compose` (not `docker-compose`), and the obsolete `version:` key is gone from the compose files.

## Development

```bash
docker compose up
```

For development, the `server/` and `client/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The client (Vite dev server) is spun up at `localhost:3000` and proxies `/api` to the server using the linked name `server:8080` (see `client/vite.config.js`). The server runs under nodemon and restarts on changes.

The local directories are mounted into the containers, so changes will reflect immediately. However, changes to `package.json` need a rebuild:

```bash
docker compose down && docker compose build && docker compose up
```

The `down` matters: `node_modules` lives in an anonymous volume, so without it (or `docker compose up --renew-anon-volumes`) the container keeps the old packages.

### File watching

Vite and nodemon rely on native file-change events, which reach the containers on Linux and on current Docker Desktop for Mac (VirtioFS file sharing). If edits don't trigger reloads, for example on Windows with the repo on the Windows filesystem (`/mnt/c/...` under WSL2) or an old Docker Desktop using osxfs, turn on polling:

- **Client:** in `client/vite.config.js`, add `watch: { usePolling: true }` under `server`.
- **Server:** in `docker-compose.yml`, add `CHOKIDAR_USEPOLLING=true` to the server's `environment` (or add `--legacy-watch` to the nodemon command).

Better still on Windows, keep the repo inside the WSL filesystem, where native events work.

### Environment variables

To load environment variables from `server/.env`, uncomment the `env_file` line in `docker-compose.yml` (and `docker-compose.prod.yml`). `server/.env` is gitignored.

### Installing npm dependencies

All changes to `node_modules` should happen _inside_ the containers, so the installed packages match the container's Node version and platform. You can do this via `docker compose run`, but it’s easier to just update a running container and avoid having to rebuild everything:

```bash
docker compose exec client sh
```

Then inside:

```bash
npm install --save <new_dependency>
```

This updates `package.json` and `package-lock.json` on your machine through the mount.

## Production

```bash
docker compose -f docker-compose.prod.yml up --build
```

For production, this uses the Dockerfile at the root of the repo. It creates a static build of the client React app (`vite build` into `client/build/`) and runs Express inside server, which handles both the API and serving of React files. The app is served on port 80.

As a result, different code is executing to serve the React files, but all of the API calls should remain the same. The difference between development and production isn’t ideal, but it does offer the simplicity of having the entire app run in one server on one machine.

The client build stage is pinned to `$BUILDPLATFORM`, so when cross-building (e.g. `docker buildx build --platform linux/amd64 --load .` on an Apple Silicon Mac) the React build runs natively and only the server stage is emulated.

This is one of multiple ways a Node + React app could be setup, as suggested [here](https://daveceddia.com/create-react-app-express-production/):

- **Keep them together** - have Express serve both the API and React files
- **Split them apart** - have Express API on one machine and the React files on another (e.g., on S3 and use CORS to access the API)
- **Put the API behind a proxy** - use something like NGINX to proxy the Express API server and React static files separately

This project uses the “keep them together” approach. For better performance, you can set up a proxy (like Cloudflare) in between your server and the Internet to cache the static files. Or with some extra work you can fashion it to do either of the other two options.

## Notes

### Using docker compose

I have `comp` aliased to `docker compose` on my computer.

Start via:

```bash
comp up

# or detached
comp up -d
```

Run a container of the server image via:

```bash
comp run --rm server /bin/sh
```

Check status:

```bash
comp ps
```

Stop:

```bash
comp down
```

Run the production image:

```bash
comp -f docker-compose.prod.yml up --build
```

### Setup references

References for setting up a Node project with Docker and Docker Compose:

- https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
- https://docs.docker.com/compose/
- https://vite.dev/guide/

Express + React:

- https://daveceddia.com/create-react-app-express-production/
- https://expressjs.com/en/guide/migrating-5.html
