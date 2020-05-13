FROM node:lts
MAINTAINER liaoliaojun
COPY . /app
WORKDIR /app
RUN yarn
RUN yarn build
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000
EXPOSE 3000
ENTRYPOINT ["yarn", "run", "start"]
