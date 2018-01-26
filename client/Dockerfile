FROM node:8.9.3

WORKDIR /usr/app

COPY package*.json ./
RUN npm install -qy

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
