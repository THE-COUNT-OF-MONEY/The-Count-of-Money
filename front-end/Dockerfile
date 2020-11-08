FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g create-react-app@4.0.0

# If you are building your code for production
# RUN npm ci --only=production


# Bundle app source
COPY . .


#EXPOSE 8080

EXPOSE 3000

CMD ["npm", "start"]
