FROM node:lts
MAINTAINER liaoliaojun
COPY . /app
WORKDIR /app
RUN yarn
RUN yarn build
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3001
EXPOSE 3001
ENTRYPOINT ["yarn", "run", "start"]
