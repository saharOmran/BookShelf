FROM node:18.18.2
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY ./package.json ./
# COPY ./yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 8000
ENV TZ=Asia/Tehran
RUN yarn build
CMD [ "yarn", "run", "preview" , "--port", "8000", "--host"]