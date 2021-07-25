FROM node:14-alpine

WORKDIR /app

COPY package.json /app/

COPY yarn.lock /app/

RUN yarn install

## Dynamically run command
# ARG NODE_ENV
# RUN if [ "${NODE_ENV}" = "development" ]; \
#         then npm install; \
#         else npm install --only=production \
#         fi

COPY . /app/

ENV PORT=5000

ENV HOST=0.0.0.0

EXPOSE 5000

CMD [ "yarn", "dev" ]