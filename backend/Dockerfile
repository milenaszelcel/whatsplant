# syntax=docker/dockerfile:1.4

FROM oven/bun:latest AS base

# Create app directory
WORKDIR /usr/src/app

COPY ./backend/package.json /usr/src/app/package.json
COPY ./backend/bun.lock /usr/src/app/bun.lock
COPY ../contract /usr/src/contract

RUN bun install --frozen-lockfile

COPY ./backend /usr/src/app

EXPOSE 3001

CMD [ "bun", "run", "dev" ]

FROM base as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF


RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "bun", "run", "dev" ]

