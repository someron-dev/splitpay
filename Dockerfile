FROM --platform=$BUILDPLATFORM node:lts-alpine AS builder

USER node
WORKDIR /home/node
COPY --chown=node frontend /home/node

RUN npm i

RUN npm run build


FROM elestio/pocketbase:latest
LABEL org.opencontainers.image.source=https://github.com/someron-dev/splitpay

COPY pb_migrations /pb_migrations
COPY --from=builder /home/node/build /pb_public

EXPOSE 8090/tcp

ENTRYPOINT [ "/usr/local/bin/pocketbase",  "serve", "--http=0.0.0.0:8090", "--dir=/pb_data", "--publicDir=/pb_public" ]
