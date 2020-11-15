FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install mysql
# If you are building your code for production
# RUN npm ci --only=production


# Bundle app source
COPY . .


EXPOSE 4000

CMD [ "npm", "run", "start:dev" ]
