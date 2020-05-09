FROM node:lts
MAINTAINER liaoliaojun
ENV NODE_ENV=production
COPY . /app
WORKDIR /app
RUN yarn
RUN yarn run build
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 80
EXPOSE 80
ENTRYPOINT ["yarn", "run", "start"]
