FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# for production 
# Run npm ci --only=production

COPY . .

EXPOSE 5000

CMD [ "NODE", "index.js" ]