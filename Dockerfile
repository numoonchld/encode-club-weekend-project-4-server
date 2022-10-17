FROM node:16.15.1-bullseye-slim

RUN mkdir -p /home/app/ && chown -R node:node /home/app
WORKDIR /home/app
COPY --chown=node:node . /home/app

USER node

RUN npm run install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
