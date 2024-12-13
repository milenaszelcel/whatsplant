# syntax=docker/dockerfile:1.4

FROM node:lts-buster-slim AS development

# Create app directory
WORKDIR /usr/src/app

COPY ./backend/package.json /usr/src/app/package.json
COPY ./backend/yarn.lock /usr/src/app/yarn.lock
COPY ../contract /usr/src/contract

RUN yarn install --frozen-lockfile

COPY ./backend /usr/src/app

EXPOSE 3001

CMD [ "yarn", "run", "dev" ]

FROM development as dev-envs
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
CMD [ "yarn", "run", "dev" ]

