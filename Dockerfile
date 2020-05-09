FROM node:lts
MAINTAINER liaoliaojun
COPY . /app
WORKDIR /app
RUN yarn
RUN yarn build
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 80
EXPOSE 80
ENTRYPOINT ["yarn", "run", "start"]
