
# Setup and build the client

# Build the client on the host's native platform (e.g. arm64 on Apple Silicon);
# its output is static files, so only the server stage needs the target platform.
FROM --platform=$BUILDPLATFORM node:26 AS client

WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build


# Setup the server

FROM node:26-alpine

WORKDIR /usr/app/
COPY --from=client /usr/app/client/build/ ./client/build/

WORKDIR /usr/app/server/
COPY server/package*.json ./
RUN npm ci
COPY server/ ./

ENV PORT=8000

EXPOSE 8000

CMD ["npm", "start"]
