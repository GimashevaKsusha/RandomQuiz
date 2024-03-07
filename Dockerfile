FROM node:19-alpine

WORKDIR /random-quiz-app

COPY package*.json /random-quiz-app

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]