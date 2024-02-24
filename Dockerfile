FROM node:14-alpine AS base
RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node && chmod -R 770 /home/node
WORKDIR /home/node/app

ARG PORT_NUMBER

ENV PORT ${PORT_NUMBER}

USER node
COPY --chown=node:node --from=builder-client /home/node/app/build ./build/
COPY --chown=node:node --from=builder-server /home/node/app/node_modules ./node_modules
COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./package-lock.json ./package-lock.json
COPY --chown=node:node ./public ./public
EXPOSE ${PORT_NUMBER}
CMD ["npm", "run", "server"]